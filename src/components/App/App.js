import React, {Component, Fragment} from 'react';
import injectSheet from 'react-jss';
import {ROOT_URL} from "../../utils/config";
import {
	getFacebookProfile,
	getUserData,
	joinClassName,
	promiseSetState,
	promiseSetTimeout,
	SHARE_TEMPLATE
} from "../../utils/library";
import FadeInOut from "../FadeInOut/FadeInOut";
import Image from "../Image/Image";
import Loading from "../Loading/Loading";
import Portfolio from "../Portfolio/Portfolio";
import {ANIMATION_GROW, ANIMATION_SHRINK} from "../Portfolio/style";
import Project, {PROJECT_APPEARING, PROJECT_DISAPPEARING, PROJECT_INVISIBLE, PROJECT_VISIBLE} from "../Project/Project";
import {TEXT_FIRST, TEXT_SECOND} from "../TextFlip/style";
import TextFlip from "../TextFlip/TextFlip";
import style from './style';

/**
 * Landing screen
 */
class App extends Component {
	state = {
		userData: null,
		selected: null,
		portfolioAnimation: null,
		transitionAnimation: null,
		projectState: PROJECT_INVISIBLE,
		info: TEXT_FIRST
	};
	
	constructor(props) {
		super(props);
		this.selectProject = this.selectProject.bind(this);
		this.unSelectProject = this.unSelectProject.bind(this);
		this.onProjectClick = this.onProjectClick.bind(this);
		this.onProjectClose = this.onProjectClose.bind(this);
		this.onGetTileProps = this.onGetTileProps.bind(this);
	}
	
	async componentDidMount() {
		let setState = promiseSetState(this);
		//fetch user data
		await setState({userData: await getUserData()});
		
		const {match, history} = this.props,
			{userData: {portfolio}} = this.state;
		if (match.params && match.params.project) {
			const projectIndex = portfolio.findIndex(({route}) => route === match.url);
			if (projectIndex < 0)
				return history.replace(ROOT_URL);
			const project = portfolio[projectIndex],
				target = document.getElementById('portfolio').children[projectIndex];
			await setState({
				projectState: PROJECT_VISIBLE,
				portfolioAnimation: ANIMATION_SHRINK,
				info: TEXT_SECOND,
				selected: {
					target: target.getBoundingClientRect(),
					index: projectIndex,
					project
				}
			});
		}
	}
	
	async componentDidUpdate(prevProps) {
		const {location} = this.props;
		if (location !== prevProps.location) {
			const backward = location.pathname === ROOT_URL,
				config = backward ? this.state.selected : location.state;
			if (!config) return;
			const {
					target,
					project,
					index
				} = config,
				animator = backward ? this.unSelectProject : this.selectProject;
			await animator(target, project, index);
		}
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
							          <h2 className={classes.title}>{title}</h2>
							          <h1 className={classes.name}>{name}</h1>
						          </Fragment>
					          )}
					          renderSecond={selected ? (
						          <h1 className={classes.head}>
							          {selected.project.name}
						          </h1>
					          ) : "\u00a0"}/>
					<div className={classes.decoration}>&nbsp;</div>
					<TextFlip className={classes.bio} current={info} renderFirst={bio}
					          renderSecond={selected ? (
						          <pre>{selected.project.description}</pre>
					          ) : "\u00a0"}
					          vector={'1.5em'}/>
					<FadeInOut className={classes.share} display='grid'
					           duration='0.3s' visible={!Boolean(selected)}>
						{SHARE_TEMPLATE.map(({href, icon, alt}) => (
							<a key={alt} href={href} className={classes.icon} target='_blank'>
								<img src={icon} alt={alt}/>
							</a>
						))}
					</FadeInOut>
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
				projectState,
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
				visible={projectState} onProjectClose={this.onProjectClose}
				getAnimationChain={this.generateAnimationChain(selected)}
				{...projectProps}/>
		)
	}
	
	/**
	 * callback to Portfolio to provide
	 * tile props.
	 * @param project: project data of the tile
	 * @param index: index of that project
	 * @return {{src: *, alt: *, visible: boolean, animation: null}}: tile props
	 */
	onGetTileProps(project, index) {
		let {
				coverFile: src, name: alt
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
	
	async selectProject(target, project, index) {
		let {selected} = this.state;
		if (selected) return;
		
		let setState = promiseSetState(this);
		await setState({
			selected: {
				project,
				target,
				index
			}
		});
		await setState({
			projectState: PROJECT_APPEARING,
			portfolioAnimation: ANIMATION_SHRINK,
			info: TEXT_SECOND
		});
		await promiseSetTimeout(setState, 560, {projectState: PROJECT_VISIBLE});
	}
	
	async unSelectProject() {
		let setState = promiseSetState(this);
		await setState({
			portfolioAnimation: ANIMATION_GROW,
			info: TEXT_FIRST,
			projectState: PROJECT_DISAPPEARING
		});
		await promiseSetTimeout(setState, 680, {
			selected: null,
			projectState: PROJECT_INVISIBLE,
			portfolioAnimation: null,
		});
	}
	
	async onProjectClick({event: {currentTarget}, project, index}) {
		const {history} = this.props,
			{selected} = this.state;
		
		if (selected) return;
		
		history.push(project.route, {
			target: currentTarget.getBoundingClientRect(),
			project,
			index
		})
	}
	
	async onProjectClose() {
		const {history} = this.props;
		history.goBack();
	}
	
	/**
	 * calculates animation start and end position,
	 * w.r.t to whether the animation is being
	 * played forward or backward.
	 * @param selected
	 * @return {*}
	 */
	generateAnimationChain(selected) {
		if (!selected) return null;
		return backward => {
			let {
					top: tTop, left: tLeft,
					width: tWidth, height: tHeight
				} = selected.target,
				
				{innerHeight, innerWidth} = window,
				vLeft = innerWidth * 0.45 + 80,
				vTop = (innerHeight / 2) - 9 / 32 * (innerWidth * 0.4);
			if (innerWidth <= 600) {
				vLeft = innerWidth * 0.1;
				vTop = 0.7 * innerWidth * 0.8 + 30;
			} else if (innerWidth <= 1024) {
				vLeft = innerWidth * 0.45 + 60;
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