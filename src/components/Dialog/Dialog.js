import PropTypes from 'prop-types'
import React, {Component} from 'react';
import FadeInOut from "../FadeInOut/FadeInOut";

class Dialog extends Component {
	static propTypes = {
		open: PropTypes.bool,
		className: PropTypes.string,
		duration: PropTypes.string
	};
	
	static defaultProps = {
		open: false
	};
	
	render() {
		let {
			className,
			children,
			open, duration
		} = this.props;
		return (
			<FadeInOut
				className={className} duration={duration}
				display='grid' visible={open}>
				{children}
			</FadeInOut>
		)
	}
}

export default Dialog;