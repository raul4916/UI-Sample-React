import React,{ Component } from 'react';
import axios               from "axios/index";


class Card extends Component {

	constructor( props ) {
		super(props);
		this.state = {};
		this.host = 'rgms.photography'
	}

	render() {
		if ( this.props.toCreate ) {
			return (<div className='createCard'>
					<div className='card-content'>
						<img className='addImage' onClick={this.props.handler}
							 src="https://dharmamerchantservices.com/wp-content/uploads/2015/06/add.png"/>
					</div>
				</div>
			);
		}
		if ( this.props.formEnabled ) {
			return (<div className='card createCard'>
				<div className='form-content'>
					<div className='input'>
						<label htmlFor='title'>Title</label>
						<input id='title' type='text' value={this.props.inputTitle}
							   onChange={evt => this.props.titleHandler(evt)}/>
					</div>
					<div className='input'>
						<label htmlFor='category'>Category</label>
						<input id='category' type='text' value={this.props.inputCategory}
							   onChange={evt => this.props.categoryHandler(evt)}/>
					</div>
					<div className='input'>
						<label htmlFor='body'>Body</label>
						<textarea id='body' cols="21" value={this.props.inputBody}
								  onChange={evt => this.props.bodyHandler(evt)}/>
					</div>
					<button onClick={this.props.handler}>Add</button>

				</div>
			</div>);
		} else {
			return (
				<div className='card'>
					<div className='card-content'>
						<div className='top-info'>
							<div className='title'>
								<h1>{this.props.cardTitle}</h1>
							</div>
							<div className='body'>
								<h3>{this.props.cardBody}</h3>
							</div>
							<div className='category'>
								{this.props.cardCategory}
							</div>
							<div className='dateCreated'>
								{this.props.dateCreated}
							</div>
						</div>
						<button onClick={evt => this.deleteCard(this.props.cardID)}>Delete</button>
					</div>
				</div>
			)
		}
	}


	deleteCard( id ) {
		axios.delete('http://'+this.host+'/cards/' + id).catch(function ( error ) {
			console.log("success")
		});
	}
}


export default Card;