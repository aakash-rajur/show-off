import PropTypes from 'prop-types';
import React from 'react';
import injectSheet from 'react-jss';
import style from "./style";

function Login(props) {
	let {
		classes,
		onSubmit,
		disabled,
		error
	} = props;
	return (
		<form className={classes.login}
		      onSubmit={onSubmit}>
			<input type="email" name="email"
			       placeholder="Enter E-Mail ID"
			       required={true} disabled={disabled}
			       id='email' title='Email ID'/>
			<input type="password" name="password"
			       placeholder="Enter Password"
			       required={true} disabled={disabled}
			       id="password" title="Password"/>
			<button type='submit' disabled={disabled}>
				Login
			</button>
			<span>{error}</span>
		</form>
	)
}

Login.propTypes = {
	onSubmit: PropTypes.func,
	disabled: PropTypes.bool,
	error: PropTypes.string
};

export default injectSheet(style)(Login)