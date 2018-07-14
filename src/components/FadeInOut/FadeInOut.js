import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {joinClassName, promiseSetState, promiseSetTimeout} from "../../utils/library";
import style, {FADE_IN, FADE_OUT} from "./style";

const Animated = injectSheet(style)(
	function ({className, classes, children}) {
		return (
			<div className={joinClassName(classes.container, className)}>
				{children}
			</div>
		)
	}
);

Animated.propTypes = {
	className: PropTypes.string,
	animate: PropTypes.oneOf([FADE_IN, FADE_OUT]),
	visible: PropTypes.bool,
	display: PropTypes.string
};

Animated.defaultProps = {
	display: 'initial'
};

class FadeInOut extends Component {
	static propTypes = {
		visible: PropTypes.bool,
		className: PropTypes.string,
		display: PropTypes.string
	};
	
	static defaultProps = {
		visible: false
	};
	
	constructor(props) {
		super(props);
		this.state = {
			animate: props.visible ? FADE_IN : FADE_OUT,
			visible: props.visible
		};
	}
	
	async componentDidUpdate(props) {
		if (this.props.visible !== props.visible) {
			let {visible} = this.props,
				setState = promiseSetState(this);
			if (visible) return await setState({visible: true, animate: FADE_IN});
			await setState({animate: FADE_OUT});
			await promiseSetTimeout(setState, 720, {visible: false});
		}
	}
	
	render() {
		let {
			className,
			display,
			children
		} = this.props;
		return (
			<Animated {...this.state}
			          className={className}
			          display={display}>
				{children}
			</Animated>
		)
	}
}

export default FadeInOut;