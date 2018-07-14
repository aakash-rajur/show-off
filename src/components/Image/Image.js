import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {joinClassName, promiseSetState} from "../../utils/library";
import FadeInOut from "../FadeInOut/FadeInOut";
import Icon from "../Icon/Icon";
import style from './style';

const IMAGE_LOAD = 'IMAGE_LOAD';
const IMAGE_LOADED = 'IMAGE_LOADED';
const IMAGE_ERRORED = 'IMAGE_ERRORED';

class Image extends Component {
	static propTypes = {
		src: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.func
		]),
		alt: PropTypes.string,
		className: PropTypes.string,
		containerClassName: PropTypes.string,
		dom: PropTypes.func
	};
	
	constructor(props) {
		super(props);
		this.state = {
			imageState: IMAGE_LOAD,
			src: null
		};
	}
	
	async componentDidMount() {
		let {src} = this.props;
		this.setState({
			src: src instanceof Function ?
				await src() : src
		});
	}
	
	async componentDidUpdate(props) {
		if (this.props.src !== props.src) {
			let {src} = this.props,
				setState = promiseSetState(this);
			if (typeof src === 'string')
				return await setState({src: this.props.src, imageState: IMAGE_LOAD});
			await setState({imageState: IMAGE_LOAD});
			await setState({src: await src()});
		}
	}
	
	render() {
		let {
			classes, alt,
			className, dom,
			containerClassName
		} = this.props, {
			src, imageState
		} = this.state;
		return (
			<div className={joinClassName(classes.container, containerClassName)}>
				<img src={src} alt={alt} ref={dom}
				     className={joinClassName(classes.image, imageState !== IMAGE_LOADED && classes.hidden, className)}
				     onLoad={this.onImageStateChange(IMAGE_LOADED)}
				     onError={this.onImageStateChange(IMAGE_ERRORED)}/>
				{this.renderCloak()}
			</div>
		)
	}
	
	renderCloak() {
		let {imageState} = this.state,
			{classes, className, alt} = this.props,
			name = imageState === IMAGE_LOAD ? 'image' :
				imageState === IMAGE_ERRORED ? 'broken_image' :
					null;
		return (
			<FadeInOut className={joinClassName(classes.cloak, className)}
			           visible={Boolean(name)} display='flex'>
				<Icon name={name}/>
				{name && <span>{alt}</span>}
			</FadeInOut>
		)
	}
	
	onImageStateChange(imageState) {
		return () => {
			let {src} = this.state;
			if (src === '') imageState = IMAGE_LOAD;
			this.setState({imageState});
		}
	}
}

export default injectSheet(style)(Image);