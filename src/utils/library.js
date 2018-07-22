import firebase from 'firebase/app';
import 'firebase/storage';
import {Component} from 'react';
import FACEBOOK_ICON from '../assets/facebook.svg';
import GMAIL_ICON from '../assets/gmail.svg';
import INSTAGRAM_ICON from '../assets/instagram.svg';
import {FACEBOOK_ID, PORTFOLIO_REF} from "./config";

export const MIN_TILE_SIZE = 20;

/**
 * filters out args if not string and joins
 * them appropriately
 * @param classNames: all classes to join in the dom
 * @return {string}: all classes concatenated with space in between
 */
export function joinClassName(...classNames) {
	let styles = classNames || [];
	return styles.filter(style => (typeof style === 'string') && style).join(' ');
}

/**
 * @param context: any react class context
 * @return {function(*=): Promise<any>}: a function
 * that behaves exactly like setState but can be awaited
 */
export function promiseSetState(context) {
	if (!(context instanceof Component))
		throw new Error('not a react class context');
	/**
	 * @param newState: new partial state of the Component
	 * @return {Promise<any>} a promise that resolves after
	 * the state has been successfully mutated
	 */
	return function (newState) {
		return new Promise(resolve =>
			context.setState(newState, resolve));
	}
}

/**
 * a timeout that is a promise
 * @param cb: any callback, can be a promise as well
 * @param timeout: timeout or delay after which to execute the cb
 * @param args: any arguments that needs to passed to the cb
 * @return {Promise<any>} a promise that will resolve after timeout with
 * value returned from the cb
 */
export function promiseSetTimeout(cb, timeout, ...args) {
	return new Promise(resolve =>
		setTimeout(async () =>
				resolve(await cb(...args)),
			timeout)
	);
}

/**
 * convenience function to set an image
 * file as source
 * @param file: any file object
 * @return {Promise<any>} return blob that can
 * be set as source on any img element
 */
export function getThumbnailFromFile(file) {
	return new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.onload = ({target: {result}}) => resolve(result);
		reader.onerror = error => reject(error);
		reader.readAsDataURL(file);
	});
}

/**
 * SHA256 of string, picked up from MDN
 * @param message, any string
 * @return {Promise<string>} returns SHA256 of the provided string
 */
async function sha256(message) {
	
	// encode as UTF-8
	const msgBuffer = new TextEncoder("UTF-8").encode(message);
	
	// hash the message
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
	
	// convert ArrayBuffer to Array
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	
	// convert bytes to hex string
	return hashArray.reduce((str, b) => str + b.toString(16).padStart(2, '0'), '');
}

export function bytesToSize(bytes) {
	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if (bytes === 0) return 'N/A';
	// noinspection JSCheckFunctionSignatures
	const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
	if (!i) return `${bytes} ${sizes[i]}`;
	return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`;
}

export function getFacebookProfile() {
	return `http://graph.facebook.com/${FACEBOOK_ID}/picture?type=large&width=512&height=512&redirect=true`
}

export async function getUserData() {
	let portfolioRef = await firebase.storage()
		.ref(PORTFOLIO_REF).getDownloadURL();
	return await (await fetch(portfolioRef)).json();
}

export async function processSubmit(data) {
	let extracted = [], {portfolio} = data;
	for (let i = 0, iL = portfolio.length; i < iL; i++) {
		let {
			name, description,
			video, coverFile,
			files
		} = portfolio[i];
		portfolio[i] = {name, description, video};
		if (files) {
			let hash = await sha256(files.coverFile.name);
			extracted.push({
				ref: portfolio[i].coverFile = `/images/${hash.substring(0, 10)}.${files.coverFile.name.split('.').pop()}`,
				file: files.coverFile
			});
		} else portfolio[i].coverFile = coverFile;
	}
	return {
		files: extracted,
		data
	};
}

export function uploadUserData(onUpdate, data, ...files) {
	return new Promise(async resolve => {
		
		let {length: total} = files, failed = 0, succeeded = 0,
			totalBytes = 0, uploadedBytes = 0,
			bucket = firebase.storage().ref(),
			{portfolio} = data,
			
			uploadImage = index => {
				return new Promise(async resolve => {
					let {ref, file} = files[index];
					
					totalBytes += file.size;
					onUpdate && onUpdate({uploadedBytes, totalBytes, succeeded, failed, total});
					
					let uploader = bucket.child(ref).put(file);
					
					uploader.on('state_changed', null, error => {
						console.error(error);
						++failed;
						onUpdate && onUpdate({uploadedBytes, totalBytes, succeeded, failed, total});
						resolve();
					}, async () => {
						uploadedBytes += file.size;
						++succeeded;
						onUpdate && onUpdate({uploadedBytes, totalBytes, succeeded, failed, total});
						let project = portfolio.find(({coverFile}) => coverFile === ref);
						if (project) project.coverFile = await uploader.snapshot.ref.getDownloadURL();
						resolve();
					});
				})
			};
		total += 1;
		
		for (let i = 0, iL = files.length; i < iL; i++) await uploadImage(i);
		
		let meta = JSON.stringify(data);
		totalBytes += meta.length;
		onUpdate && onUpdate({uploadedBytes, totalBytes, succeeded, failed, total});
		
		try {
			await bucket.child(PORTFOLIO_REF)
				.putString(meta, 'raw', {
					contentType: 'application/json'
				});
			succeeded += 1;
			uploadedBytes += meta.length;
		} catch (e) {
			console.error(e);
			failed += 1;
		}
		resolve({uploadedBytes, totalBytes, succeeded, failed, total});
	});
}

export const SHARE_TEMPLATE = [{
	href: 'mailto:sharmadhiraj21@gmail.com?subject=Enquiry',
	icon: GMAIL_ICON,
	alt: 'Mail'
}, {
	href: 'https://www.facebook.com/sharmadhiraj21',
	icon: FACEBOOK_ICON,
	alt: 'Facebook'
}, {
	href: 'https://www.instagram.com/idhirajsharma/',
	icon: INSTAGRAM_ICON,
	alt: 'Instagram'
}];