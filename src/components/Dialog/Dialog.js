import PropTypes from 'prop-types'
import React from 'react';
import FadeInOut from "../FadeInOut/FadeInOut";

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
	open: PropTypes.bool,
	className: PropTypes.string,
	duration: PropTypes.string
};

Dialog.defaultProps = {
	open: false
};

export default Dialog;