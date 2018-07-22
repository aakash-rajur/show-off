import PropTypes from 'prop-types';
import React from 'react';
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import Icon from "../Icon/Icon";
import Image from "../Image/Image";

const DragHandle = SortableHandle(() => <Icon name='drag_handle' className='drag'/>);

// noinspection JSValidateJSDoc
/**
 * Each Item represents user Project
 * @type {React.ComponentClass<*>}
 */
const ProjectItem = SortableElement(props => {
	let {
		className,
		name, coverFile,
		description, files,
		onEdit, onDelete
	} = props;
	return (
		<li className={className}>
			<Image src={files ? files.coverFile : coverFile} alt={name}/>
			<div>{name}</div>
			<pre>{description}</pre>
			<Icon name='delete' onClick={onDelete} className='delete'/>
			<Icon name='edit' onClick={onEdit} className='edit'/>
			<DragHandle/>
		</li>
	);
});

ProjectItem.propTypes = {
	/**
	 * className of the container
	 */
	className: PropTypes.string,
	/**
	 * name of the project
	 */
	name: PropTypes.string,
	/**
	 * coverFile URL
	 */
	coverFile: PropTypes.string,
	/**
	 * callback when user clicks the edit icon
	 */
	onEdit: PropTypes.func,
	/**
	 * callback when user clicks the delete icon
	 */
	onDelete: PropTypes.func
};

/**
 * Container component that will animate user drag,
 * drop and sort
 * @type {React.ComponentClass<*>}
 */
const Sortable = SortableContainer(props => {
	let {
			data,
			className,
			itemClassName,
			onEdit, onDelete,
			children
		} = props,
		onItemEdit = index =>
			() => onEdit && onEdit(index),
		onDeleteItem = index =>
			() => onDelete && onDelete(index);
	return (
		<ul className={className}>
			{data.map(
				(project, index) =>
					<ProjectItem
						{...project} className={itemClassName}
						key={index} index={index}
						onEdit={onItemEdit(index)}
						onDelete={onDeleteItem(index)}/>
			)}
			{children}
		</ul>
	);
});

Sortable.propTypes = {
	/**
	 * className of the container DOM
	 */
	className: PropTypes.string,
	/**
	 * data source to render projects
	 */
	data: PropTypes.array,
	/**
	 * className assigned to each ProjectItem
	 */
	itemClassName: PropTypes.string,
	/**
	 * callback when user has sorted any project
	 */
	onSortEnd: PropTypes.func,
	/**
	 * callback when user clicks edit on any of the project
	 */
	onEdit: PropTypes.func,
	/**
	 * callback when user clicks edit on any of the project
	 */
	onDelete: PropTypes.func
};

export default Sortable;