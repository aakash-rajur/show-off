import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import {joinClassName} from "../../utils/library";
import style, {TEXT_FIRST, TEXT_SECOND} from "./style";

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
	className: PropTypes.string,
	renderFirst: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	renderSecond: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.object
	]),
	current: PropTypes.oneOf([
		TEXT_FIRST,
		TEXT_SECOND
	]),
	vector: PropTypes.string
};

TextFlip.defaultProps = {
	current: TEXT_FIRST,
	vector: '10px'
};

export default injectSheet(style)(TextFlip);