import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import ReactPlayer from 'react-player';
import {ANIMATION_DELAY} from "../../utils/config";
import {joinClassName, promiseSetState, promiseSetTimeout} from "../../utils/library";
import AnimatedThumbnail from "../AnimatedThumbnail/AnimatedThumbnail";
import FadeInOut from "../FadeInOut/FadeInOut";
import Icon from "../Icon/Icon";
import style from './style';

const PLAYER_PLAY = 'PLAY';
const PLAYER_PAUSE = 'PAUSE';

export const PROJECT_APPEARING = 'APPEARING';
export const PROJECT_VISIBLE = 'VISIBLE';
export const PROJECT_DISAPPEARING = 'DISAPPEARING';
export const PROJECT_INVISIBLE = 'INVISIBLE';

/**
 * renders user project in details. Responsible
 * for animation as well
 */
class Project extends Component {
	static propTypes = {
		/**
		 * className of the container
		 */
		className: PropTypes.string,
		/**
		 * flag if the component needs to be shown
		 */
		visible: PropTypes.oneOf([
			PROJECT_APPEARING,
			PROJECT_VISIBLE,
			PROJECT_DISAPPEARING,
			PROJECT_INVISIBLE
		]),
		/**
		 * project video url
		 */
		url: PropTypes.string,
		/**
		 * project video thumbnail URL
		 */
		thumbnail: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.string
		]),
		/**
		 * description of the project,
		 * only shown in mobile view
		 */
		description: PropTypes.string,
		/**
		 * alt of the project video thumbnail
		 */
		alt: PropTypes.string,
		/**
		 * callback when the user has closed the
		 * project and the animation is about to
		 * end
		 */
		onProjectClose: PropTypes.func,
		/**
		 * callback to retrieve the animation
		 * start and end state. a boolean is passed
		 * as a parameter to infer whether the
		 * animation needs to be played in reverse
		 */
		getAnimationChain: PropTypes.func,
		/**
		 * to pop back to root
		 */
		history: PropTypes.object,
		location: PropTypes.object
	};
	
	static defaultProps = {
		visible: PROJECT_INVISIBLE,
		url: ''
	};
	
	constructor(props) {
		super(props);
		this.onPlayerReady = this.onPlayerReady.bind(this);
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
			visible,
			getAnimationChain
		} = this.props;
		
		if (this.props.url !== props.url) {
			await setState({animate: true});
			/**
			 * show the thumbnail while the player finishes loading
			 */
			await promiseSetTimeout(setState, 50, {
				url: this.props.url,
				showPlayer: false,
				opacity: 1
			});
		}
		
		if (visible !== props.visible && getAnimationChain) {
			if (visible === PROJECT_APPEARING) {
				//fetch the start and end state of the animation
				let {start, end} = getAnimationChain(false);
				//apply the animation start state
				await setState({
					animate: true,
					style: start,
					opacity: 1
				});
				//need to wait some time before we can apply the
				//end state. React be so cool. :)
				await promiseSetTimeout(setState, parseInt(ANIMATION_DELAY, 10), {
					style: end
				});
			} else if (visible === PROJECT_DISAPPEARING) {
				//stop playing video
				await setState({play: false});
				//get the animation start and end state
				let {start, end} = getAnimationChain(true);
				//apply the start state
				await setState({
					animate: true,
					style: start,
					opacity: 1,
					showPlayer: false
				});
				//apply the end animation, after a few ms
				//otherwise animation doesn't work, React be so cool :)
				await promiseSetTimeout(setState, 50, {style: end});
				//hide the dom responsible for animation
				await promiseSetTimeout(setState, 650, {animate: false});
			}
		}
	}
	
	render() {
		let {
			classes, className,
			thumbnail, alt,
			visible, description,
			onProjectClose
		} = this.props, {
			url, play, showPlayer,
			animate, style, opacity
		} = this.state;
		if (!url || visible === PROJECT_INVISIBLE) return null;
		return (
			<div className={joinClassName(classes.container, className)}>
				<div className={classes.videoWrapper}>
					<ReactPlayer
						width='100%' height='100%'
						url={url} controls={true} playing={play}
						onPlay={this.onPlayerChange(PLAYER_PLAY)}
						onPause={this.onPlayerChange(PLAYER_PAUSE)}
						onReady={this.onPlayerReady}
						style={{display: showPlayer ? 'initial' : 'none'}}/>
					<AnimatedThumbnail
						src={thumbnail} alt={alt} animate={animate}
						style={style} opacity={opacity}/>
					<FadeInOut
						display='inline' visible={!animate}
						duration='0.3s' className={classes.close}>
						<Icon name='close' onClick={onProjectClose}/>
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
		//fade out the thumbnail
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
}

export default injectSheet(style)(Project);