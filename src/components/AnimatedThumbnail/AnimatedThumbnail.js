import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import {joinClassName} from "../../utils/library";
import style from './style';

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
	className: PropTypes.string,
	animate: PropTypes.bool,
	style: PropTypes.object,
	src: PropTypes.string,
	alt: PropTypes.string,
	opacity: PropTypes.number
};

AnimatedThumbnail.defaultProps = {
	animate: false,
	opacity: 1
};

export default injectSheet(style)(AnimatedThumbnail);