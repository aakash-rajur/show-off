import PropTypes from 'prop-types';
import React from 'react';
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import Icon from "../Icon/Icon";
import Image from "../Image/Image";

const DragHandle = SortableHandle(() => <Icon name='drag_handle' className='drag'/>);

const ProjectItem = SortableElement(props => {
	let {
		className,
		name, coverFile,
		description,
		onEdit, onDelete
	} = props;
	return (
		<li className={className}>
			<Image src={coverFile} alt={name}/>
			<div>{name}</div>
			<pre>{description}</pre>
			<Icon name='delete' onClick={onDelete} className='delete'/>
			<Icon name='edit' onClick={onEdit} className='edit'/>
			<DragHandle/>
		</li>
	);
});

ProjectItem.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string,
	getThumbnail: PropTypes.func,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func
};

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
	className: PropTypes.string,
	data: PropTypes.array,
	itemClassName: PropTypes.string,
	onSortEnd: PropTypes.func,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func
};

export default Sortable;