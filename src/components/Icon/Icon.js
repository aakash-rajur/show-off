import PropTypes from 'prop-types';
import React from 'react';
import {joinClassName} from "../../utils/library";

/**
 * @return {null}
 */
function Icon({classes, name, className}) {
	if (!name) return null;
	return <span className={joinClassName('material-icons', className)}>{name}</span>
}

Icon.propTypes = {
	name: PropTypes.string,
	className: PropTypes.string
};

export default Icon