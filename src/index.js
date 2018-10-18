import firebase from 'firebase/app';
import 'firebase/storage';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import AsyncComponent from "./utils/AsyncComponent";
import {CMS_URL, FIREBASE_APP_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_STORAGE_BUCKET, APP_URL} from "./utils/config";

async function main() {
	await firebase.initializeApp({
		apiKey: FIREBASE_APP_KEY,
		storageBucket: FIREBASE_STORAGE_BUCKET,
		authDomain: FIREBASE_AUTH_DOMAIN,
	});
	await new Promise(resolve =>
		ReactDOM.render(
			<BrowserRouter>
				<Switch>
					<Route exact path={CMS_URL} component={() =>
						<AsyncComponent getComponent={() => import('./components/CMS/CMS')}/>}/>
					<Route path={APP_URL} component={App}/>
					<Route path='*' component={() => <Redirect to={APP_URL}/>}/>
				</Switch>
			</BrowserRouter>
			,
			document.getElementById('root'),
			resolve)
	);
	await registerServiceWorker();
	return 'DONE_RENDERING';
}

main().then(console.log).catch(console.error);
