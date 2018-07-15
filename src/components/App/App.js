import React, {Component, Fragment} from 'react';
import injectSheet from 'react-jss';
import {getFacebookProfile, getUserData, joinClassName, promiseSetState} from "../../utils/library";
import Image from "../Image/Image";
import Loading from "../Loading/Loading";
import Portfolio from "../Portfolio/Portfolio";
import {ANIMATION_SHRINK} from "../Portfolio/style";
import style from './style';

class App extends Component {
	state = {
		userData: null,
		selected: null
	};
	
	constructor(props) {
		super(props);
		this.onProjectClick = this.onProjectClick.bind(this);
		this.onGetTileProps = this.onGetTileProps.bind(this);
	}
	
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
			<div className={classes.infoWrapper}
			     onClick={() => this.setState({selected: null})}>
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
		let {classes} = this.props,
			{selected} = this.state;
		return (
			<Portfolio
				data={userData.portfolio} onClick={this.onProjectClick}
				className={joinClassName(classes.animationLocation, classes.portfolio)}
				getTileProps={this.onGetTileProps} preventScroll={Boolean(selected)}
			/>
		);
	}
	
	renderProject() {
		//return;
	}
	
	onProjectClick({event: {target}, project, index}) {
		this.setState({
			selected: {
				project,
				target,
				index
			}
		});
	}
	
	onGetTileProps(project, index) {
		let {
				getThumbnail: src, name: alt
			} = project, {
				selected
			} = this.state,
			visible = !selected || selected.index !== index;
		return {
			src, alt,
			visible,
			animation: selected && Number.isInteger(selected.index) && visible ?
				ANIMATION_SHRINK : null
		};
	}
}

export default injectSheet(style)(App);
//'https://picsum.photos/200/300/?random'