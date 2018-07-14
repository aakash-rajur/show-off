import firebase from 'firebase/app';
import 'firebase/storage';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import {FIREBASE_APP_KEY, FIREBASE_STORAGE_BUCKET} from "./utils/config";

async function main() {
	await firebase.initializeApp({
		apiKey: FIREBASE_APP_KEY,
		storageBucket: FIREBASE_STORAGE_BUCKET
	});
	await new Promise(resolve =>
		ReactDOM.render(
			<App/>,
			document.getElementById('root'),
			resolve)
	);
	await registerServiceWorker();
	return 'DONE_RENDERING';
}

main().then(console.log).catch(console.error);
