import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {joinClassName} from "../../utils/library";
import Image from "../Image/Image";
import style, {tileStyle} from './style';

/**
 * Each tile represents a project
 */
const Tile = injectSheet(tileStyle)(
	function ({classes, src, alt, dom, onClick}) {
		return (
			<Image className={joinClassName(classes.image, classes.animation)}
			       containerClassName={classes.tile}
			       cloakClassName={classes.image}
			       src={src} alt={alt} dom={dom}
			       onClick={onClick} title={alt}/>
		)
	}
);

Tile.propTypes = {
	/**
	 * project video thumbnail URL
	 */
	src: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.func
	]),
	/**
	 * alt for project video thumbnail
	 */
	alt: PropTypes.string,
	/**
	 * ref callback
	 */
	dom: PropTypes.func,
	/**
	 * onClick passed on to the image
	 */
	onClick: PropTypes.func,
	/**
	 * boolean if that project is visible
	 */
	visible: PropTypes.bool,
	/**
	 * type of animation applied to each project
	 * except the ones that are not visible
	 */
	animation: PropTypes.string
};

Tile.defaultProps = {
	visible: true,
	animation: null
};


/**
 * Container class that holds all the project
 * tiles and choreographs all animation
 */
class Portfolio extends Component {
	static propTypes = {
		/**
		 * className applied to the container
		 */
		className: PropTypes.string,
		/**
		 * data source of all the projects
		 */
		data: PropTypes.arrayOf(PropTypes.object),
		/**
		 * callback when the user clicks any of the
		 * project. event, project object and it's
		 * dom index is pass as parameter
		 */
		onClick: PropTypes.func,
		/**
		 * callback wherein the parent decides the
		 * props that will be applied to each project
		 * tile
		 */
		getTileProps: PropTypes.func,
		/**
		 * prevent container scroll when the user
		 * selects any of the project
		 */
		preventScroll: PropTypes.bool
	};
	
	render() {
		let {
			classes,
			className,
			preventScroll = false
		} = this.props;
		return (
			<div className={joinClassName(classes.container, className)}
			     onWheel={e => preventScroll && e.preventDefault()}
			     id='portfolio'>
				{this.renderTiles()}
			</div>
		)
	}
	
	renderTiles() {
		let {
				data, classes,
				getTileProps
			} = this.props,
			tiles = data.map((project, index) => {
				let tileProps = getTileProps ? getTileProps(project, index) : {};
				return (
					<Tile key={index} {...tileProps}
					      onClick={this.onTileClick(project, index)}/>
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