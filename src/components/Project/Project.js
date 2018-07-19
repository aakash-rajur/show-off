import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import ReactPlayer from 'react-player';
import {joinClassName, promiseSetState, promiseSetTimeout} from "../../utils/library";
import AnimatedThumbnail from "../AnimatedThumbnail/AnimatedThumbnail";
import FadeInOut from "../FadeInOut/FadeInOut";
import Icon from "../Icon/Icon";
import style from './style';

const PLAYER_PLAY = 'PLAY';
const PLAYER_PAUSE = 'PAUSE';

class Project extends Component {
	static propTypes = {
		className: PropTypes.string,
		visible: PropTypes.bool,
		url: PropTypes.string,
		thumbnail: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.string
		]),
		description: PropTypes.string,
		alt: PropTypes.string,
		onProjectClose: PropTypes.func,
		getAnimationChain: PropTypes.func
	};
	
	static defaultProps = {
		visible: false,
		url: ''
	};
	
	constructor(props) {
		super(props);
		this.onPlayerReady = this.onPlayerReady.bind(this);
		this.onProjectClose = this.onProjectClose.bind(this);
		this.state = {
			play: false,
			url: props.url,
			showPlayer: false,
			animate: false,
			style: null,
			opacity: 0
		};
	}
	
	async componentDidUpdate(props) {
		let setState = promiseSetState(this), {
			visible, getAnimationChain
		} = this.props;
		if (this.props.url !== props.url) {
			await setState({animate: true});
			await promiseSetTimeout(setState, 50, {
				url: this.props.url,
				showPlayer: false,
				opacity: 1
			});
		}
		if (visible !== props.visible && visible && getAnimationChain) {
			let {start, end} = getAnimationChain(false);
			await setState({
				animate: true,
				style: start,
				opacity: 1
			});
			await promiseSetTimeout(setState, 100, {
				style: end
			});
		}
	}
	
	render() {
		let {
			classes, className,
			thumbnail, alt,
			visible, description
		} = this.props, {
			url, play, showPlayer,
			animate, style, opacity
		} = this.state;
		if (!url || !visible) return null;
		return (
			<div className={joinClassName(classes.container, className)}>
				<div className={classes.videoWrapper}>
					<ReactPlayer
						width='100%' height='100%'
						url={url} controls={true} playing={play}
						onPlay={this.onPlayerChange(PLAYER_PLAY)}
						onPause={this.onPlayerChange(PLAYER_PAUSE)}
						onReady={this.onPlayerReady}
						style={{visibility: showPlayer ? 'initial' : 'hidden'}}/>
					<AnimatedThumbnail
						src={thumbnail} alt={alt} animate={animate}
						style={style} opacity={opacity}/>
					<FadeInOut
						display='inline' visible={!animate}
						duration='0.3s' className={classes.close}>
						<Icon name='close' onClick={this.onProjectClose}/>
					</FadeInOut>
				</div>
				<FadeInOut visible={!animate} duration='0.3s'
				           className={classes.description}>
					<pre>{description}</pre>
				</FadeInOut>
			</div>
		)
	}
	
	async onPlayerReady() {
		let setState = promiseSetState(this);
		await setState({opacity: 0, showPlayer: true});
		await promiseSetTimeout(setState, 320, {
			animate: false,
			play: true
		});
	}
	
	onPlayerChange(state) {
		return () => this.setState({play: state === PLAYER_PLAY})
	}
	
	async onProjectClose() {
		let setState = promiseSetState(this), {
			getAnimationChain, onProjectClose
		} = this.props;
		await setState({play: false});
		if (getAnimationChain) {
			let {start, end} = getAnimationChain(true);
			await setState({
				animate: true,
				style: start,
				opacity: 1,
				showPlayer: false
			});
			onProjectClose && onProjectClose();
			await promiseSetTimeout(setState, 50, {style: end});
			await promiseSetTimeout(setState, 650, {animate: false});
		}
	}
}

export default injectSheet(style)(Project);