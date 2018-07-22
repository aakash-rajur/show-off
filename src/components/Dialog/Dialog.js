import PropTypes from 'prop-types'
import React from 'react';
import FadeInOut from "../FadeInOut/FadeInOut";

/**
 * Component abstracts over FadeInOut
 * to act as a modal
 * @param props
 * @return {*}
 * @constructor
 */
function Dialog(props) {
	let {
		className,
		children,
		open, duration
	} = props;
	return (
		<FadeInOut
			className={className} duration={duration}
			display='grid' visible={open}>
			{children}
		</FadeInOut>
	)
}

Dialog.propTypes = {
	/**
	 * flag to open or close the modal
	 */
	open: PropTypes.bool,
	/**
	 * className applied to the container class
	 */
	className: PropTypes.string,
	/**
	 * duration of the animation
	 */
	duration: PropTypes.string
};

Dialog.defaultProps = {
	open: false
};

export default Dialog;