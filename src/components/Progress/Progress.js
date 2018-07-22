import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import {joinClassName} from "../../utils/library";
import style from './style';

/**
 * Animated Progress Bar
 * @param className: className assigned to the container
 * @return {*} DOM
 * @constructor
 */
function Progress({classes, className}) {
	return (
		<div className={joinClassName(classes.container, className)}>
			<div className={classes.progress}>&nbsp;</div>
		</div>
	)
}

Progress.propTypes = {
	/**
	 * color of the progress bar
	 */
	color: PropTypes.string,
	/**
	 * amount of work done. between 0 and 1
	 */
	progress: PropTypes.number,
	/**
	 * className assigned to the container
	 */
	className: PropTypes.string
};

export default injectSheet(style)(Progress);