import PropTypes from 'prop-types';
import React, {Component} from 'react';
import injectSheet from 'react-jss';
import {arrayMove} from 'react-sortable-hoc';
import Input from "../Input/Input";
import Sortable from "../Sortable/Sortable";
import style from "./style";

class Edit extends Component {
	static propTypes = {
		data: PropTypes.object,
		onSubmit: PropTypes.func
	};
	
	constructor(props) {
		super(props);
		this.onSortEnd = this.onSortEnd.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.state = {
			data: JSON.parse(JSON.stringify(props.data))
		};
	}
	
	render() {
		let {
			classes,
			onSubmit
		} = this.props, {
			data, data: {
				name, title, bio,
				portfolio
			}
		} = this.state;
		return (
			<div className={classes.container}>
				<section className={classes.personal}>
					<h1>Personal</h1>
					<Input id="name" value={name} title='Name' placeholder='Name'
					       onChange={this.onChange(data, 'name')}/>
					<Input id="title" value={title} title='Title' placeholder='Title'
					       onChange={this.onChange(data, 'title')}/>
					<Input id="bio" value={bio} title='Bio' placeholder='Bio'
					       lines={3} className={classes.bio}
					       onChange={this.onChange(data, 'bio')}/>
				</section>
				<section className={classes.portfolio}>
					<h1>Projects</h1>
					<Sortable data={portfolio} className={classes.list}
					          itemClassName={classes.project} lockAxis='y'
					          onSortEnd={this.onSortEnd} onEdit={this.onEdit}
					          useDragHandle={true}/>
				</section>
				<div className={classes.action}>
					<button className={classes.reset}>
						Reset
					</button>
					<button className={classes.save}>
						Save
					</button>
				</div>
			</div>
		);
	}
	
	onChange(object, path) {
		return ({target: {value}}) => {
			object[path] = value;
			let {data} = this.state;
			this.setState({data});
		}
	}
	
	onSortEnd({oldIndex, newIndex}) {
		let {data} = this.state;
		data.portfolio = arrayMove(data.portfolio, oldIndex, newIndex);
		this.setState({data});
	}
	
	onEdit(index) {
		console.log(index);
	}
}

export default injectSheet(style)(Edit);