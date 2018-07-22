import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import {joinClassName} from "../../utils/library";
import style from "./style";

/**
 * Common Input component to show
 * the placeholder, title and label
 * @param props
 * @return {*}
 * @constructor
 */
function Input(props) {
	let {
		classes,
		className,
		id, name,
		children,
		lines, type,
		placeholder,
		...rest
	} = props;
	
	return (
		<label htmlFor={id || name} className={joinClassName(classes.container, className)}>
			<span>{placeholder}</span>
			{lines > 1 ? (
				<textarea id={id || name} name={name} rows={lines}
				          placeholder={placeholder} {...rest}/>
			) : <input id={id || name} name={name} placeholder={placeholder}
			           type={type} {...rest}/>}
			{children}
		</label>
	)
}

Input.propTypes = {
	/**
	 * className applied to the container
	 */
	className: PropTypes.string,
	/**
	 * id of the input
	 */
	id: PropTypes.string,
	/**
	 * no of lines if multi-line
	 */
	lines: PropTypes.number,
};

Input.defaultProps = {
	lines: 1,
	type: 'text'
};

export default injectSheet(style)(Input);