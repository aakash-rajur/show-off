import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import LOADING_ICON from '../../assets/puff.svg';
import FadeInOut from "../FadeInOut/FadeInOut";
import style from './style';

/**
 * Component responsible to show
 * site wide loading
 * @param visible: boolean, will the loader be visible
 * @return {*}
 * @constructor
 */
function Loading({visible, classes}) {
	return (
		<FadeInOut display='flex' visible={visible}
		           className={classes.container}>
			<img src={LOADING_ICON} alt="Loading"
			     className={classes.spinner}/>
		</FadeInOut>
	)
}

Loading.propTypes = {
	/**
	 * flag to infer if the loader
	 * needs to be shown
	 */
	visible: PropTypes.bool
};

export default injectSheet(style)(Loading);

