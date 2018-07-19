import firebase from 'firebase/app';
import 'firebase/auth';
import React, {Component, Fragment} from 'react';
import injectSheet from 'react-jss';
import {joinClassName, promiseSetState} from "../../utils/library";
import Login from "../Login/Login";
import style from './style';

class CMS extends Component {
	state = {
		user: null,
		submitting: false,
		error: null,
		renderComponent: null
	};
	
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}
	
	componentDidMount() {
		this.setState({
			renderComponent: () => {
				let {
					submitting,
					error
				} = this.state;
				return <Login onSubmit={this.submit} error={error} disabled={submitting}/>
			}
		});
	}
	
	render() {
		let {
			classes
		} = this.props, {
			renderComponent, user
		} = this.state;
		return (
			<Fragment>
				<img src="https://picsum.photos/1920/1080/?random" alt="background"
				     className={joinClassName(classes.background, user && classes.backgroundSuccess)}/>
				{renderComponent && renderComponent()}
			</Fragment>
		);
	}
	
	async submit(e) {
		e.preventDefault();
		let {target} = e,
			email = target[0].value,
			password = target[1].value,
			setState = promiseSetState(this);
		await setState({submitting: true, error: null});
		try {
			let user = await firebase.auth()
				.signInWithEmailAndPassword(email, password);
			await setState({user});
		} catch (e) {
			let {message: error} = e;
			await setState({error});
		}
		await setState({submitting: false});
	}
}

export default injectSheet(style)(CMS);