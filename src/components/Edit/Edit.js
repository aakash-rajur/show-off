import PropTypes from 'prop-types';
import React, {Component, Fragment} from 'react';
import injectSheet from 'react-jss';
import ReactPlayer from 'react-player';
import {arrayMove} from 'react-sortable-hoc';
import {joinClassName, promiseSetState} from "../../utils/library";
import Dialog from "../Dialog/Dialog";
import Icon from "../Icon/Icon";
import Image from "../Image/Image";
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
		this.onAdd = this.onAdd.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onReset = this.onReset.bind(this);
		this.state = {
			data: JSON.parse(JSON.stringify(props.data)),
			renderModal: null,
			edit: null
		};
	}
	
	render() {
		let {
			classes
		} = this.props, {
			data, data: {
				name, title, bio,
				portfolio
			},
			edit, renderModal
		} = this.state;
		return (
			<Fragment>
				<div className={classes.container}>
					<section className={classes.personal}>
						<h1>Personal</h1>
						<Input id="client" value={name} title='Name' placeholder='Name'
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
						          useDragHandle={true} onSortEnd={this.onSortEnd}
						          onEdit={this.onEdit} onDelete={this.onDelete}/>
						<Icon name='add' className={classes.add}
						      onClick={this.onAdd}/>
					</section>
					<div className={classes.action}>
						<button className={classes.reset}
						        onClick={this.onReset}>
							Reset
						</button>
						<button className={classes.save}>
							Save
						</button>
					</div>
				</div>
				<Dialog open={Boolean(renderModal)}
				        duration='0.3s' className={classes.modal}>
					{renderModal && renderModal(edit)}
				</Dialog>
			</Fragment>
		);
	}
	
	onChange(object, path, isFile = false) {
		return ({target: {value, files}}) => {
			object[path] = value;
			if (isFile) {
				object.files = {
					...(object.files || {}),
					[path]: files[0]
				}
			}
			let {data, edit} = this.state;
			this.setState({data, edit});
		}
	}
	
	onSortEnd({oldIndex, newIndex}) {
		let {data} = this.state;
		data.portfolio = arrayMove(data.portfolio, oldIndex, newIndex);
		this.setState({data});
	}
	
	async onAdd() {
		if (await this.editInfo(null)) {
			let {data, edit} = this.state;
			data.portfolio = [...data.portfolio, edit];
			this.setState({data, edit: null});
		}
	}
	
	async onEdit(index) {
		let {data} = this.state;
		if (!data || !data.portfolio || !data.portfolio.length || data.portfolio.length < index) return;
		if (await this.editInfo(data.portfolio[index])) {
			let {data, edit} = this.state;
			data.portfolio[index] = edit;
			this.setState({data, edit: null});
		}
	}
	
	onDelete(index) {
		let {data} = this.state;
		data.portfolio.splice(index, 1);
		this.setState({data});
	}
	
	onReset() {
		let {data} = this.props;
		this.setState({data: JSON.parse(JSON.stringify(data))});
	}
	
	editInfo(data) {
		if (!data) data = {
			name: '',
			description: '',
			video: '',
			coverFile: ''
		};
		return new Promise(async resolve => {
			let setState = promiseSetState(this),
				onClose = (submit = false) => {
					return async e => {
						e.preventDefault();
						await setState({renderModal: null});
						resolve(submit);
					}
				}, edit = {...data};
			await setState({edit});
			
			await setState({
				renderModal: edit => {
					let {classes} = this.props;
					return (
						<form className={classes.content} onSubmit={onClose(true)}>
							<h2 className={classes.title}>
								{edit.name ? `Edit ${edit.name}` : 'Add New Project'}
							</h2>
							<div className={classes.inputContainer}>
								<Input id="video" value={edit.video} name='video'
								       title='Project Name' placeholder='Project Video'
								       onChange={this.onChange(edit, 'video')}
								       className={classes.video} required
								       type="url">
									{edit.video ?
										<ReactPlayer width='28vh' height='20vh' url={edit.video} controls={true}/> :
										<Icon name='movie'/>}
								</Input>
								<Input type='file' accept=".jpg, .jpeg, .png"
								       id='coverFile' name='coverFile' value={edit.files ? edit.coverFile : ''}
								       onChange={this.onChange(edit, 'coverFile', true)}
								       className={classes.coverFile} placeholder='Select Thumbnail'
								       {...(edit.coverFile ? {} : {required: true})}>
									<Image alt={edit.name || 'Video Thumbnail'}
									       src={edit.files ? edit.files.coverFile : edit.coverFile}/>
								</Input>
								<Input id="name" value={edit.name} name='name'
								       title='Project Name' placeholder='Project Name'
								       onChange={this.onChange(edit, 'name')}
								       className={classes.name} required/>
								<Input id="description" value={edit.description}
								       title='Description' placeholder='Project Description'
								       name='description' lines={3}
								       onChange={this.onChange(edit, 'description')}
								       className={classes.description}/>
							</div>
							<button className={joinClassName(classes.save, classes.actionButton)}
							        type='submit'>
								Save
							</button>
							<button className={joinClassName(classes.reset, classes.actionButton)}
							        onClick={onClose()}>
								Cancel
							</button>
						</form>
					)
				}
			});
		});
	}
}

export default injectSheet(style)(Edit);
//https://youtu.be/lZ2JX_6SGNI