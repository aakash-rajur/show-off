import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import {joinClassName} from "../../utils/library";
import style, {TEXT_FIRST, TEXT_SECOND} from "./style";

/**
 * Component that will animate view change
 * with an translation animation
 */
function TextFlip(props) {
	let {
		classes,
		className,
		renderFirst,
		renderSecond
	} = props;
	return (
		<div className={joinClassName(classes.container, className)}>
			<div className={classes.first}>{renderFirst}</div>
			<div className={classes.second}>{renderSecond}</div>
		</div>
	)
}

TextFlip.propTypes = {
	/**
	 * container className
	 */
	className: PropTypes.string,
	/**
	 * first view that has to be shown
	 */
	renderFirst: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	/**
	 * second view that has to be shown
	 */
	renderSecond: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	/**
	 * flag that determines which view to
	 * show on the DOM. DEFAULT: TEXT_FIRST
	 */
	current: PropTypes.oneOf([
		TEXT_FIRST,
		TEXT_SECOND
	]),
	/**
	 * translation animation vector.
	 * DEFAULT: 10px
	 */
	vector: PropTypes.string
};

TextFlip.defaultProps = {
	current: TEXT_FIRST,
	vector: '10px'
};

export default injectSheet(style)(TextFlip);