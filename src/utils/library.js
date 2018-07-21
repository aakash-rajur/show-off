import firebase from 'firebase/app';
import {Component} from 'react';
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

export function getFacebookProfile() {
	return `http://graph.facebook.com/${FACEBOOK_ID}/picture?type=large&width=512&height=512&redirect=true`
}

async function getThumbnailURL(ref) {
	return await firebase.storage()
		.ref(ref).getDownloadURL();
}

export async function getUserData() {
	let portfolioRef = await firebase.storage()
		.ref(PORTFOLIO_REF).getDownloadURL();
	let data = await (await fetch(portfolioRef)).json();
	data.portfolio = (data.portfolio || []).map(project => {
		let enhanced = {
			...project,
			isRef: true,
		};
		enhanced.getThumbnail = (async function () {
			if (this.isRef) {
				this.isRef = false;
				return this.coverFile = await getThumbnailURL(this.coverFile);
			}
			return this.coverFile;
		}).bind(enhanced);
		return enhanced;
	});
	return data;
}

export function getThumbnailFromFile(file) {
	return new Promise((resolve, reject) => {
		let reader = new FileReader();
		reader.onload = ({target: {result}}) => resolve(result);
		reader.onerror = error => reject(error);
		reader.readAsDataURL(file);
	});
}