import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import {joinClassName} from "../../utils/library";
import style from './style';

function Progress({classes, className}) {
	return (
		<div className={joinClassName(classes.container, className)}>
			<div className={classes.progress}>&nbsp;</div>
		</div>
	)
}

Progress.propTypes = {
	color: PropTypes.string,
	progress: PropTypes.number,
	className: PropTypes.string
};

export default injectSheet(style)(Progress);