import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {joinClassName} from "../../utils/library";
import Image from "../Image/Image";
import style, {tileStyle} from './style';

const Tile = injectSheet(tileStyle)(
	function ({classes, src, alt, dom}) {
		return (
			<Image containerClassName={classes.tile}
			       src={src} alt={alt} dom={dom}
			       className={classes.image}/>
		)
	}
);

Tile.propTypes = {
	src: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func
	]),
	alt: PropTypes.string,
	dom: PropTypes.func
};

class Portfolio extends Component {
	static propTypes = {
		className: PropTypes.string,
		data: PropTypes.arrayOf(PropTypes.object)
	};
	
	constructor(props) {
		super(props);
	}
	
	render() {
		let {
			classes,
			className
		} = this.props;
		return (
			<div className={joinClassName(classes.container, className)}>
				{this.renderTiles()}
			</div>
		)
	}
	
	renderTiles() {
		let {data, classes} = this.props,
			tiles = data.map(({src, alt}, index) =>
				<Tile key={index} src={src} alt={alt}/>);
		tiles.splice(1, 0, <div key='spacer' className={classes.spacer}>&nbsp;</div>);
		return tiles;
	}
}

export default injectSheet(style)(Portfolio);