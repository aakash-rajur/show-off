import PropTypes from 'prop-types';
import React from 'react';
import {joinClassName} from "../../utils/library";

/**
 * Component to render material icon
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
	/**
	 * name of the icon
	 */
	name: PropTypes.string,
	/**
	 * className applied to the icon
	 */
	className: PropTypes.string
};

export default Icon