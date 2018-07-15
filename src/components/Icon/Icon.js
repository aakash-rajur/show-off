import PropTypes from 'prop-types';
import React from 'react';
import {joinClassName} from "../../utils/library";

/**
 * @return {null}
 */
function Icon({classes, name, className, ...rest}) {
	if (!name) return null;
	return (
		<span className={joinClassName('material-icons', className)} {...rest}>
			{name}
			</span>
	)
}

Icon.propTypes = {
	name: PropTypes.string,
	className: PropTypes.string
};

export default Icon