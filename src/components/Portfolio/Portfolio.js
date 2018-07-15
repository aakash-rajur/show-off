import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {joinClassName} from "../../utils/library";
import Image from "../Image/Image";
import style, {ANIMATION_SHRINK, tileStyle} from './style';

const Tile = injectSheet(tileStyle)(
	function ({classes, src, alt, dom, onClick}) {
		return (
			<Image className={joinClassName(classes.image, classes.animation)}
			       containerClassName={classes.tile}
			       cloakClassName={classes.image}
			       src={src} alt={alt} dom={dom}
			       onClick={onClick}/>
		)
	}
);

Tile.propTypes = {
	src: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func
	]),
	alt: PropTypes.string,
	dom: PropTypes.func,
	onClick: PropTypes.func,
	visible: PropTypes.bool,
	animation: PropTypes.string
};

Tile.defaultProps = {
	visible: true,
	animation: null
};

class Portfolio extends Component {
	static propTypes = {
		className: PropTypes.string,
		data: PropTypes.arrayOf(PropTypes.object),
		onClick: PropTypes.func,
		getSource: PropTypes.func,
		getAlt: PropTypes.func,
		selected: PropTypes.number
	};
	
	render() {
		let {
			classes,
			className,
		} = this.props;
		return (
			<div className={joinClassName(classes.container, className)}>
				{this.renderTiles()}
			</div>
		)
	}
	
	renderTiles() {
		let {
				data, classes,
				getSource, getAlt,
				selected
			} = this.props,
			tiles = data.map((project, index) => {
				let tileSelected = selected === index,
					animation = Number.isInteger(selected) && !tileSelected ?
						ANIMATION_SHRINK : null;
				return (
					<Tile key={index} onClick={this.onTileClick(project, index)}
					      src={getSource && getSource(project)} alt={getAlt && getAlt(project)}
					      visible={!tileSelected} animation={animation}/>
				);
			});
		data.length && tiles.splice(1, 0, <div key='spacer' className={classes.spacer}>&nbsp;</div>);
		return tiles;
	}
	
	onTileClick(project, index) {
		let {onClick} = this.props;
		return event => onClick && onClick({
			event,
			project,
			index
		});
	}
}

export default injectSheet(style)(Portfolio);