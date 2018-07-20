import PropTypes from 'prop-types';
import React from 'react';
import {SortableContainer, SortableElement, SortableHandle} from "react-sortable-hoc";
import Icon from "../Icon/Icon";
import Image from "../Image/Image";

const DragHandle = SortableHandle(() => <Icon name='drag_handle'/>);

const ProjectItem = SortableElement(props => {
	let {
		className,
		name, coverFile,
		description,
		onEdit
	} = props;
	return (
		<li className={className}>
			<Image src={coverFile} alt={name}/>
			<div>{name}</div>
			<pre>{description}</pre>
			<Icon name='edit' onClick={onEdit}/>
			<DragHandle/>
		</li>
	);
});

ProjectItem.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string,
	getThumbnail: PropTypes.func,
	onEdit: PropTypes.func
};

const Sortable = SortableContainer(props => {
	let {
			data,
			className,
			itemClassName,
			onEdit
		} = props,
		onItemEdit = index =>
			() => onEdit && onEdit(index);
	return (
		<ul className={className}>
			{data.map((project, index) =>
				<ProjectItem
					{...project} className={itemClassName}
					key={index} index={index}
					onEdit={onItemEdit(index)}/>)}
		</ul>
	);
});

Sortable.propTypes = {
	className: PropTypes.string,
	data: PropTypes.array,
	itemClassName: PropTypes.string,
	onSortEnd: PropTypes.func,
	onEdit: PropTypes.func
};

export default Sortable;