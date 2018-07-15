import React, {Component, Fragment} from 'react';
import injectSheet from 'react-jss';
import {getFacebookProfile, getUserData, joinClassName, promiseSetState, promiseSetTimeout} from "../../utils/library";
import Image from "../Image/Image";
import Loading from "../Loading/Loading";
import Portfolio from "../Portfolio/Portfolio";
import {ANIMATION_GROW, ANIMATION_SHRINK} from "../Portfolio/style";
import Project from "../Project/Project";
import style from './style';

class App extends Component {
	state = {
		userData: null,
		selected: null,
		showProject: false,
		portfolioAnimation: null
	};
	
	constructor(props) {
		super(props);
		this.onProjectClick = this.onProjectClick.bind(this);
		this.onProjectClose = this.onProjectClose.bind(this);
		this.onGetTileProps = this.onGetTileProps.bind(this);
	}
	
	async componentDidMount() {
		let setState = promiseSetState(this);
		await setState({userData: await getUserData()});
	}
	
	render() {
		let {
				userData,
				showProject,
				selected
			} = this.state,
			{classes} = this.props;
		return (
			<Fragment>
				<div className={classes.app}>
					{this.renderInfo()}
					{this.renderPortfolio()}
					<Project
						className={joinClassName(classes.animationLocation, classes.project)}
						visible={showProject} url={selected && selected.project.video}
						thumbnail={selected && selected.project.coverFile}
						alt={selected && selected.project.name}
						onProjectClose={this.onProjectClose}/>
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
	
	async onProjectClick({event: {target}, project, index}) {
		let setState = promiseSetState(this);
		await setState({
			selected: {
				project,
				target,
				index
			},
			portfolioAnimation: ANIMATION_SHRINK
		});
		await promiseSetTimeout(setState, 700, {showProject: true});
	}
	
	onGetTileProps(project, index) {
		let {
				getThumbnail: src, name: alt
			} = project, {
				selected,
				portfolioAnimation
			} = this.state,
			visible = !selected || selected.index !== index;
		return {
			src, alt,
			visible,
			animation: visible ? portfolioAnimation : null
		};
	}
	
	async onProjectClose() {
		let setState = promiseSetState(this);
		await setState({showProject: false, portfolioAnimation: ANIMATION_GROW});
		await promiseSetTimeout(setState, 720, {selected: null, portfolioAnimation: null});
	}
}

export default injectSheet(style)(App);
//'https://picsum.photos/200/300/?random'