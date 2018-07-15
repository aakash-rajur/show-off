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
	display: PropTypes.string,
	duration: PropTypes.string
};

Animated.defaultProps = {
	display: 'initial',
	duration: '0.7s'
};

class FadeInOut extends Component {
	static propTypes = {
		visible: PropTypes.bool,
		className: PropTypes.string,
		display: PropTypes.string,
		duration: PropTypes.string,
		skipEnter: PropTypes.bool,
		skipExit: PropTypes.bool
	};
	
	static defaultProps = {
		visible: false,
		skipEnter: false,
		skipExit: false
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
			let {
					skipEnter, skipExit,
					visible
				} = this.props,
				setState = promiseSetState(this);
			if (!skipEnter && visible) {
				await setState({visible: true});
				return await promiseSetTimeout(setState, 2, {animate: FADE_IN});
			}
			if (skipExit) return await setState({animate: FADE_OUT, visible: false});
			await setState({animate: FADE_OUT});
			await promiseSetTimeout(setState, 720, {visible: false});
		}
	}
	
	render() {
		let {
			className,
			display,
			children,
			duration
		} = this.props;
		return (
			<Animated {...this.state}
			          className={className}
			          display={display}
			          duration={duration}>
				{children}
			</Animated>
		)
	}
}

export default FadeInOut;