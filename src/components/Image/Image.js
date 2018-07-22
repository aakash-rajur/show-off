import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {getThumbnailFromFile, joinClassName, promiseSetState} from "../../utils/library";
import FadeInOut from "../FadeInOut/FadeInOut";
import Icon from "../Icon/Icon";
import style from './style';

const IMAGE_LOAD = 'IMAGE_LOAD';
const IMAGE_LOADED = 'IMAGE_LOADED';
const IMAGE_ERRORED = 'IMAGE_ERRORED';

/**
 * component animates the image
 * after it is successfully loaded
 * and shows a better alt instead
 * of the native one as a cloak
 */
class Image extends Component {
	static propTypes = {
		/**
		 * src of the image. can be a string,
		 * any async function returning a string
		 * or File object
		 */
		src: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.func,
			PropTypes.object,
		]),
		/**
		 * alt of the image
		 */
		alt: PropTypes.string,
		/**
		 * title of the image to show the tooltip
		 */
		title: PropTypes.string,
		/**
		 * className applied to the image
		 */
		className: PropTypes.string,
		/**
		 * className applied to the cloak
		 */
		cloakClassName: PropTypes.string,
		/**
		 * className applied to the container
		 */
		containerClassName: PropTypes.string,
		/**
		 * ref callback to the image
		 */
		dom: PropTypes.func,
		/**
		 * callback when the image is clicked
		 */
		onClick: PropTypes.func
	};
	
	state = {
		imageState: IMAGE_LOAD,
		src: null
	};
	
	async componentDidMount() {
		let {src} = this.props;
		this.setState({
			src: src instanceof Function ? await src() :
				src instanceof File ? await getThumbnailFromFile(src) :
					src
		});
	}
	
	async componentDidUpdate(props) {
		if (this.props.src !== props.src) {
			let {src} = this.props,
				setState = promiseSetState(this);
			
			if (typeof src === 'string' || src === null)
				return await setState({src: this.props.src, imageState: IMAGE_LOAD});
			else if (src instanceof File)
				return await setState({src: await getThumbnailFromFile(src), imageState: IMAGE_LOAD});
			else if (src instanceof Function) {
				await setState({imageState: IMAGE_LOAD});
				await setState({src: await src()});
			}
		}
	}
	
	render() {
		let {
			classes, alt,
			className, dom,
			containerClassName,
			onClick, title
		} = this.props, {
			src, imageState
		} = this.state;
		return (
			<div className={joinClassName(classes.container, containerClassName)}
			     onClick={onClick}>
				<img src={src} alt={alt} ref={dom} title={title}
				     className={joinClassName(classes.image,
					     imageState !== IMAGE_LOADED && classes.hidden,
					     className)}
				     onLoad={this.onImageStateChange(IMAGE_LOADED)}
				     onError={this.onImageStateChange(IMAGE_ERRORED)}/>
				{this.renderCloak()}
			</div>
		)
	}
	
	renderCloak() {
		let {imageState} = this.state,
			{classes, cloakClassName, alt} = this.props,
			name = imageState === IMAGE_LOAD ? 'image' :
				imageState === IMAGE_ERRORED ? 'broken_image' :
					null;
		return (
			<FadeInOut className={joinClassName(cloakClassName, classes.cloak)}
			           visible={Boolean(name)} display='flex'>
				<Icon name={name}/>
				{name && <span>{alt}</span>}
			</FadeInOut>
		)
	}
	
	onImageStateChange(imageState) {
		return () => {
			let {src} = this.state;
			if (src === '' || src === null) imageState = IMAGE_LOAD;
			this.setState({imageState});
		}
	}
}

export default injectSheet(style)(Image);