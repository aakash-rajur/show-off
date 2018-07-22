import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import React, {Component, Fragment} from 'react';
import injectSheet from 'react-jss';
import {
	bytesToSize,
	getUserData,
	joinClassName,
	processSubmit,
	promiseSetState,
	uploadUserData
} from "../../utils/library";
import Dialog from "../Dialog/Dialog";
import Edit from "../Edit/Edit";
import Image from "../Image/Image";
import Loading from "../Loading/Loading";
import Login from "../Login/Login";
import Progress from "../Progress/Progress";
import style from './style';

/**
 * CMS screen
 */
class CMS extends Component {
	state = {
		user: null,
		submitting: false,
		error: null,
		renderComponent: null,
		loading: false,
		data: null,
		renderModal: null,
		upload: null
	};
	
	constructor(props) {
		super(props);
		this.loginSubmit = this.loginSubmit.bind(this);
		this.editSubmit = this.editSubmit.bind(this);
		this.onUploadComplete = this.onUploadComplete.bind(this);
	}
	
	async componentDidMount() {
		//load the login screen
		this.setState({
			renderComponent: () => {
				let {
					submitting,
					error
				} = this.state;
				return <Login onSubmit={this.loginSubmit} error={error} disabled={submitting}/>
			}
		});
	}
	
	render() {
		let {
			classes
		} = this.props, {
			loading,
			renderComponent, user,
			renderModal, upload
		} = this.state;
		return (
			<Fragment>
				<Image containerClassName={classes.backgroundPosition}
				       className={joinClassName(user && classes.backgroundSuccess)}
				       cloakClassName={classes.backgroundCloak}
				       src="https://picsum.photos/1920/1080/?random" alt="background"/>
				{renderComponent && renderComponent()}
				<Dialog open={Boolean(renderModal)}
				        duration='0.3s' className={classes.modal}>
					{renderModal && renderModal(upload)}
				</Dialog>
				<Loading visible={loading}/>
			</Fragment>
		);
	}
	
	async loginSubmit(e) {
		e.preventDefault();
		let {submitting} = this.state;
		if (submitting) return;
		let {target} = e,
			email = target[0].value,
			password = target[1].value,
			setState = promiseSetState(this);
		await setState({submitting: true, error: null});
		try {
			//attempt sign in
			let user = await firebase.auth()
				.signInWithEmailAndPassword(email, password);
			await setState({user, loading: true});
			//sign in successful, load user data
			await setState({
				data: await getUserData(),
				loading: false
			});
			//allow the user to edit the data
			await setState({
				renderComponent: () => {
					let {
						data
					} = this.state;
					return <Edit data={data} onSubmit={this.editSubmit}/>
				}
			})
		} catch (e) {
			//show the error message to the user
			let {message: error} = e;
			await setState({error});
		}
		await setState({submitting: false});
	}
	
	/**
	 * callback when user wants to save his/her edit. We show an upload dialog
	 * @param raw: edited data provided by Edit component
	 * @return {Promise<void>}: resolves when upload is complete
	 */
	async editSubmit(raw) {
		let setState = promiseSetState(this),
			{files, data} = await processSubmit(raw);
		
		
		await setState({
			upload: await uploadUserData(progress => {
				let {upload} = this.state;
				/**
				 * if no modal has been show tracking the upload status,
				 * we show that modal, otherwise we simply update the
				 * state with latest stats.
				 */
				this.setState(!upload ? {
					upload: progress,
					renderModal: upload => {
						let {classes} = this.props,
							{uploadedBytes, totalBytes, succeeded, failed, total} = upload;
						return (
							<div className={classes.dialog}>
								<h2 className={classes.title}>Uploading</h2>
								<pre className={classes.info}>
									<div>
										<span className="success">{bytesToSize(uploadedBytes)}</span>/
										<span className="total">{bytesToSize(totalBytes)}</span>
									</div>
									<div>
										<span className="success">{succeeded} ✓</span>/
										<span className="fail">{failed} ✘</span> out of
										<span className="total"> {total} Files</span>
									</div>
								</pre>
								<Progress className={classes.progress} color='#28a745'
								          progress={(succeeded + failed) / total}/>
								<button className={classes.ok}
								        disabled={(succeeded + failed) !== total}
								        onClick={this.onUploadComplete}>
									OK
								</button>
							</div>
						);
					}
				} : {upload: progress});
			}, data, ...files)
		});
	}
	
	/**
	 * callback when upload process has been completed and
	 * the user clicks the OK button
	 * @return {Promise<void>}
	 */
	async onUploadComplete() {
		let setState = promiseSetState(this);
		//hide the modal, clear the upload stats and start user data refresh
		await setState({renderModal: null, upload: null, loading: true});
		await setState({
			data: await getUserData(),
			loading: false
		});
	}
}

export default injectSheet(style)(CMS);