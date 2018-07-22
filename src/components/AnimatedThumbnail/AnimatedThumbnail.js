import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import {joinClassName} from "../../utils/library";
import style from './style';

/**
 * A separate image component is necessary to
 * animate position, opacity and border-radius
 * @param props
 * @return {*}
 * @constructor
 */
function AnimatedThumbnail(props) {
	let {
			classes,
			src, alt
		} = props,
		classNames = joinClassName(
			classes.image,
			classes.animation
		);
	return (
		<img src={src} alt={alt} className={classNames}/>
	);
}

AnimatedThumbnail.propTypes = {
	/**
	 * className applied to the image
	 */
	className: PropTypes.string,
	/**
	 * flag if the image has to be animated
	 */
	animate: PropTypes.bool,
	/**
	 * animation style to be applied
	 */
	style: PropTypes.object,
	/**
	 * src of the image
	 */
	src: PropTypes.string,
	/**
	 * alt of the image
	 */
	alt: PropTypes.string,
	/**
	 * opacity of the image
	 */
	opacity: PropTypes.number
};

AnimatedThumbnail.defaultProps = {
	animate: false,
	opacity: 1
};

export default injectSheet(style)(AnimatedThumbnail);