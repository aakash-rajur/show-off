import firebase from 'firebase/app';
import 'firebase/auth';
import React, {Component, Fragment} from 'react';
import injectSheet from 'react-jss';
import {getUserData, joinClassName, promiseSetState} from "../../utils/library";
import Edit from "../Edit/Edit";
import Image from "../Image/Image";
import Loading from "../Loading/Loading";
import Login from "../Login/Login";
import style from './style';

class CMS extends Component {
	state = {
		user: null,
		submitting: false,
		error: null,
		renderComponent: null,
		loading: false,
		data: null
	};
	
	constructor(props) {
		super(props);
		this.loginSubmit = this.loginSubmit.bind(this);
		this.editSubmit = this.editSubmit.bind(this);
	}
	
	componentDidMount() {
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
			renderComponent, user,
			loading
		} = this.state;
		return (
			<Fragment>
				<Image containerClassName={classes.backgroundPosition}
				       className={joinClassName(user && classes.backgroundSuccess)}
				       cloakClassName={classes.backgroundCloak}
				       src="https://picsum.photos/1920/1080/?random" alt="background"/>
				{renderComponent && renderComponent()}
				<Loading visible={loading}/>
			</Fragment>
		);
	}
	
	async loginSubmit(e) {
		e.preventDefault();
		let {target} = e,
			email = target[0].value,
			password = target[1].value,
			setState = promiseSetState(this);
		await setState({submitting: true, error: null});
		try {
			let user = await firebase.auth()
				.signInWithEmailAndPassword(email, password);
			await setState({user, loading: true});
			let data = await getUserData(),
				{portfolio} = data;
			data.portfolio = await Promise.all(portfolio.map(async project => {
				await project.getThumbnail();
				return project;
			}));
			await setState({
				data, loading: false
			});
			await setState({
				renderComponent: () => {
					let {
						data
					} = this.state;
					return <Edit data={data} onSubmit={this.editSubmit}/>
				}
			})
		} catch (e) {
			let {message: error} = e;
			await setState({error});
		}
		await setState({submitting: false});
	}
	
	async editSubmit(e) {
		e.preventDefault();
	}
}

export default injectSheet(style)(CMS);