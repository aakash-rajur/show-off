import React, {Component, Fragment} from 'react';
import injectSheet from 'react-jss';
import {getFacebookProfile, getUserData, promiseSetState} from "../../utils/library";
import Image from "../Image/Image";
import Loading from "../Loading/Loading";
import Portfolio from "../Portfolio/Portfolio";
import style from './style';

class App extends Component {
	state = {
		userData: null
	};
	
	async componentDidMount() {
		let setState = promiseSetState(this);
		await setState({userData: await getUserData()});
	}
	
	render() {
		let {userData} = this.state,
			{classes} = this.props;
		return (
			<Fragment>
				<div className={classes.app}>
					{this.renderInfo()}
					{this.renderPortfolio()}
				</div>
				<Loading visible={!Boolean(userData)}/>
			</Fragment>
		)
	}
	
	renderInfo() {
		let {userData} = this.state;
		if (!userData) return null;
		let {classes} = this.props, {
			name, title,
			bio
		} = userData;
		return (
			<div className={classes.infoWrapper}>
				<div className={classes.info}>
					<Image src={getFacebookProfile} className={classes.profile}
					       alt={name} containerClassName={classes.profileContainer}/>
					<h2 className={classes.emphasis}>{title}</h2>
					<h1 className={classes.emphasis}>{name}</h1>
					<div className={classes.decoration}>&nbsp;</div>
					<div className={classes.bio}>{bio}</div>
				</div>
			</div>
		)
	}
	
	renderPortfolio() {
		let {userData} = this.state;
		if (!userData) return null;
		let data = userData.portfolio
			.map(({name: alt, getThumbnail: src}) =>
				({alt, src})), {
			classes
		} = this.props;
		return <Portfolio data={data} className={classes.portfolio}/>
	}
}

export default injectSheet(style)(App);
//'https://picsum.photos/200/300/?random'