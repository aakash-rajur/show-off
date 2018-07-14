import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import LOADING_ICON from '../../assets/puff.svg';
import FadeInOut from "../FadeInOut/FadeInOut";
import style from './style';

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
	visible: PropTypes.bool
};

export default injectSheet(style)(Loading);

