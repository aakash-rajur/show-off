import PropTypes from 'prop-types';
import React, {Component} from 'react';

class AsyncComponent extends Component {
	static propTypes = {
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