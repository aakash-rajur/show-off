import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import ReactPlayer from 'react-player';
import {joinClassName, promiseSetState} from "../../utils/library";
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
		alt: PropTypes.string,
		onProjectClose: PropTypes.func
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
			ready: false,
			play: false,
			url: props.url
		};
	}
	
	async componentDidUpdate(props) {
		if (this.props.url !== props.url) {
			let setState = promiseSetState(this);
			await setState({ready: false});
			await setState({url: this.props.url});
		}
	}
	
	render() {
		let {
			classes, className,
			thumbnail, alt,
			visible
		} = this.props, {
			url, ready,
			play
		} = this.state;
		if (!url) return null;
		return (
			<FadeInOut
				className={joinClassName(classes.container, className)}
				display='grid' visible={visible} duration='0.3s'
				skipExit={true}>
				<div className={classes.videoWrapper}>
					<ReactPlayer
						width='100%' height='100%'
						url={url} controls={true} playing={play}
						onPlay={this.onPlayerChange(PLAYER_PLAY)}
						onPause={this.onPlayerChange(PLAYER_PAUSE)}
						onReady={this.onPlayerReady}
					/>
					<FadeInOut className={classes.fadingImage}
					           visible={!ready} duration='0.3s'>
						<img src={thumbnail} alt={alt}/>
					</FadeInOut>
					<Icon className={classes.close} name='close'
					      onClick={this.onProjectClose}/>
				</div>
			</FadeInOut>
		)
	}
	
	onPlayerReady() {
		this.setState({ready: true, play: true});
	}
	
	onPlayerChange(state) {
		return () => this.setState({play: state === PLAYER_PLAY})
	}
	
	async onProjectClose() {
		let setState = promiseSetState(this), {
			onProjectClose
		} = this.props;
		await setState({play: false});
		onProjectClose && onProjectClose();
	}
}

export default injectSheet(style)(Project);