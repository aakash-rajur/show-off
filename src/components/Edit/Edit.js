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

/**
 * Component to render relevant fields
 * to edit user data
 */
class Edit extends Component {
	static propTypes = {
		/**
		 * user data
		 */
		data: PropTypes.object,
		/**
		 * callback when the user submits the form
		 */
		onSubmit: PropTypes.func
	};
	
	constructor(props) {
		super(props);
		this.onSortEnd = this.onSortEnd.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onReset = this.onReset.bind(this);
		this.onSave = this.onSave.bind(this);
		this.state = {
			//we're making a copy of the user data allowing us to reset it
			data: JSON.parse(JSON.stringify(props.data)),
			//function that will render the modal
			renderModal: null,
			//storing temporary user edits
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
				<form className={classes.container}
				      onSubmit={this.onSave}>
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
						<button className={classes.save} type='submit'>
							Save
						</button>
					</div>
				</form>
				<Dialog open={Boolean(renderModal)}
				        duration='0.3s' className={classes.modal}>
					{renderModal && renderModal(edit)}
				</Dialog>
			</Fragment>
		);
	}
	
	/**
	 * onChange function generator that will listen
	 * to the provided field and mutate that state
	 * accordingly
	 * @param object: the object whose property needs to mutated
	 * @param property: the key whose value needs to be mutated
	 * @param isFile: flag if the value is a file
	 * @return {Function} a function that'll listen to input's change
	 */
	onChange(object, property, isFile = false) {
		return ({target: {value, files}}) => {
			object[property] = value;
			if (isFile) {
				object.files = {
					...(object.files || {}),
					[property]: files[0]
				}
			}
			let {data, edit} = this.state;
			this.setState({data, edit});
		}
	}
	
	/**
	 * function callback to Sortable component.
	 * changes the index of the freshly moved
	 * project
	 * @param oldIndex: Project's old index
	 * @param newIndex: Project's new index
	 */
	onSortEnd({oldIndex, newIndex}) {
		let {data} = this.state;
		data.portfolio = arrayMove(data.portfolio, oldIndex, newIndex);
		this.setState({data});
	}
	
	/**
	 * callback when user wants to add new project
	 * @return {Promise<void>}
	 */
	async onAdd() {
		if (await this.editInfo(null)) {
			let {data, edit} = this.state;
			//append the new object to user's portfolio array
			data.portfolio = [...data.portfolio, edit];
			this.setState({data, edit: null});
		}
	}
	
	/**
	 * callback when user has saved the edited project
	 * @param index: index of the edited project
	 * @return {Promise<void>}
	 */
	async onEdit(index) {
		let {data} = this.state;
		//don't invoke the modal if the index is not valid
		if (!data || !data.portfolio || !data.portfolio.length || data.portfolio.length < index) return;
		//show the edit modal and wait until user saves the changes
		if (await this.editInfo(data.portfolio[index])) {
			let {data, edit} = this.state;
			//save the user edit to the relevant index
			data.portfolio[index] = edit;
			this.setState({data, edit: null});
		}
	}
	
	/**
	 * callback when user want's to delete any of the project
	 * @param index
	 */
	onDelete(index) {
		let {data} = this.state;
		data.portfolio.splice(index, 1);
		this.setState({data});
	}
	
	/**
	 * callback to reset user edits
	 * @param e
	 */
	onReset(e) {
		e.preventDefault();
		let {data} = this.props;
		this.setState({data: JSON.parse(JSON.stringify(data))});
	}
	
	/**
	 * common function that invokes the modal to add a
	 * new project or edit an existing one
	 * @param project: the project to edit, null if new
	 * @return {Promise<any>}: resolves with a bool if action was successful
	 */
	editInfo(project) {
		if (!project) project = {
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
						//resolve now since the modal has been closed
						resolve(submit);
					}
				}, edit = {...project, coverFile: ''};
			
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
								       id='coverFile' name='coverFile' value={edit.coverFile}
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
	
	onSave(e) {
		e.preventDefault();
		let {onSubmit} = this.props,
			{data} = this.state;
		onSubmit && onSubmit(data);
	}
}

export default injectSheet(style)(Edit);
//https://youtu.be/lZ2JX_6SGNI