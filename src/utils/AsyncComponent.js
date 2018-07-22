import PropTypes from 'prop-types';
import React, {Component} from 'react';

/**
 * chunking implementation
 */
class AsyncComponent extends Component {
	static propTypes = {
		/**
		 * any function that imports component file dynamically
		 */
		getComponent: PropTypes.func,
	};
	
	state = {
		Component: null
	};
	
	async componentDidMount() {
		let {getComponent} = this.props;
		let {default: Component} = await getComponent();
		this.setState({Component});
	}
	
	render() {
		let {Component} = this.state;
		return Component ? <Component/> : null;
	}
}

export default AsyncComponent;