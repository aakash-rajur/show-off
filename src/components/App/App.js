import React, {Component, Fragment} from 'react';
import injectSheet from 'react-jss';
import {getFacebookProfile, getUserData, joinClassName, promiseSetState, promiseSetTimeout} from "../../utils/library";
import Image from "../Image/Image";
import Loading from "../Loading/Loading";
import Portfolio from "../Portfolio/Portfolio";
import {ANIMATION_GROW, ANIMATION_SHRINK} from "../Portfolio/style";
import Project from "../Project/Project";
import {TEXT_FIRST, TEXT_SECOND} from "../TextFlip/style";
import TextFlip from "../TextFlip/TextFlip";
import style from './style';

class App extends Component {
	state = {
		userData: null,
		selected: null,
		portfolioAnimation: null,
		transitionAnimation: null,
		showProject: false,
		info: TEXT_FIRST
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
			} = this.state,
			{classes} = this.props;
		return (
			<Fragment>
				<div className={classes.app}>
					{this.renderInfo()}
					{this.renderPortfolio()}
					{this.renderProject()}
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
		} = userData, {
			selected,
			info
		} = this.state;
		return (
			<div className={classes.infoWrapper}>
				<div className={classes.info}>
					<Image src={getFacebookProfile} className={classes.profile}
					       alt={name} containerClassName={classes.profileContainer}/>
					<TextFlip current={info} vector={'1.5em'}
					          renderFirst={(
						          <Fragment>
							          <h2 className={classes.emphasis}>{title}</h2>
							          <h1 className={classes.emphasis}>{name}</h1>
						          </Fragment>
					          )}
					          renderSecond={selected ? (
						          <h1 className={classes.emphasis}>
							          {selected.project.name}
						          </h1>
					          ) : "\u00a0"}/>
					<div className={classes.decoration}>&nbsp;</div>
					<TextFlip className={classes.bio} current={info} renderFirst={bio}
					          renderSecond={selected ? selected.project.description : "\u00a0"}
					          vector={'1.5em'}/>
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
		let {
				showProject,
				selected
			} = this.state,
			{classes} = this.props,
			projectProps = {
				url: selected && selected.project.video,
				thumbnail: selected && selected.project.coverFile,
				alt: selected && selected.project.name,
				description: selected && selected.project.description
			};
		return (
			<Project
				className={joinClassName(classes.animationLocation, classes.project)}
				visible={showProject} onProjectClose={this.onProjectClose}
				getAnimationChain={this.generateAnimationChain(selected)}
				{...projectProps}/>
		)
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
	
	async onProjectClick({event: {target}, project, index}) {
		let setState = promiseSetState(this);
		await setState({
			selected: {
				project,
				target: target.getBoundingClientRect(),
				index
			}
		});
		await setState({
			showProject: true,
			portfolioAnimation: ANIMATION_SHRINK,
			info: TEXT_SECOND
		});
	}
	
	async onProjectClose() {
		let setState = promiseSetState(this);
		await setState({
			portfolioAnimation: ANIMATION_GROW,
			info: TEXT_FIRST
		});
		await promiseSetTimeout(setState, 650, {
			selected: null,
			showProject: false,
			portfolioAnimation: null,
		});
	}
	
	generateAnimationChain(selected) {
		if (!selected) return null;
		return backward => {
			let {
					top: tTop, left: tLeft,
					width: tWidth, height: tHeight
				} = selected.target,
				
				{innerWidth} = window,
				vLeft = innerWidth * 0.45 + 80,
				vTop = 478.5 - 9 / 32 * (innerWidth * 0.4);
			if (innerWidth <= 600) {
				vLeft = innerWidth * 0.1;
				vTop = 0.5 * innerWidth * 0.8 + 106;
			} else if (innerWidth <= 1024) {
				vLeft = innerWidth * 0.45 + 80;
			}
			
			let thumbnail = {
				width: tWidth, height: tHeight,
				transform: `translate(${tLeft - vLeft}px, ${tTop - vTop}px)`,
				borderRadius: '50%'
			}, video = {
				width: '100%', height: '100%',
				transform: 'initial',
				borderRadius: 'initial'
			};
			
			return {
				start: backward ? video : thumbnail,
				end: backward ? thumbnail : video
			}
		}
	}
}

export default injectSheet(style)(App);
//'https://picsum.photos/200/300/?random'
//2*window.innerWidth * 0.2 + 16 + 120