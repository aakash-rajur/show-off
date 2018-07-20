import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import {joinClassName} from "../../utils/library";
import style from "./style";

function Input(props) {
	let {
		classes,
		className,
		id, name,
		children,
		lines,
		placeholder,
		...rest
	} = props;
	
	return (
		<label htmlFor={id || name} className={joinClassName(classes.container, className)}>
			<span>{placeholder}</span>
			{lines > 1 ? (
				<textarea id={id || name} name={name} rows={lines}
				          placeholder={placeholder} {...rest}/>
			) : <input id={id || name} name={name} placeholder={placeholder} {...rest}/>}
			{children}
		</label>
	)
}

Input.propTypes = {
	className: PropTypes.string,
	id: PropTypes.string,
	lines: PropTypes.number,
};

Input.defaultProps = {
	lines: 1
};

export default injectSheet(style)(Input);