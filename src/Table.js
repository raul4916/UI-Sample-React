import React,{ Component } from 'react';
import axios               from "axios/index";
import Card                from './Card'


class Table extends Component {
	constructor( props ) {
		super(props);
		this.state = {
			data          : [],
			displayForm   : true,
			inputTitle    : '',
			inputBody     : '',
			inputCategory : ''
		};

		this.changeCard = this.changeCard.bind(this);
		this.updateInputTitle = this.updateInputTitle.bind(this);
		this.updateInputBody = this.updateInputBody.bind(this);
		this.updateInputCategory = this.updateInputCategory.bind(this);

	}

	render() {
		this.gatherCards();


		try {
			var activeCards = this.getCards();
			var displayForm = this.getCreationCards();
			activeCards.push(displayForm);

			return activeCards;
		} catch ( e ) {
			//Needed to return something for it to work
			return <div></div>
		}
	}

	gatherCards() {
		var data = axios.get('http://localhost:9000/cards.json').then(response => {
			this.setState({data : response.data});
		});

		return data;
	}


	getCards() {
		var activeCards = [];

		this.state.data.forEach(function ( el ) {
			var dateCreated = el.created_at;
			activeCards.push((<Card key={el.id} cardID={el.id}
									cardTitle={el.title} cardBody={el.body} cardCategory={el.category_id}
									dateCreated={dateCreated}
			/>));
		});

		return activeCards;
	}

	getCreationCards() {
		return this.state.displayForm ?
			   (<Card key="add" toCreate="true" handler={this.changeCard}/>) :
			   (<Card key="cardForm" formEnabled="true" inputTitle={this.state.inputTitle}
					  inputBody={this.state.inputBody} inputCategory={this.state.inputCategory}
					  titleHandler={this.updateInputTitle} bodyHandler={this.updateInputBody}
					  categoryHandler={this.updateInputCategory} handler={this.changeCard}/>);
	}

	changeCard() {
		var data = null;
		if ( this.state.displayForm ) {
			this.setState({displayForm : false});
		} else {
			this.setState({displayForm : true});

			var data = axios.post('http://localhost:9000/cards.json',{
				"title"       : this.state.inputTitle,
				"body"        : this.state.inputBody,
				"category_id" : this.state.inputCategory
			}).then(response => {
				this.setState({data : response.data});
			}).catch(function ( error ) {
				alert(error.response.data[ 'message' ]);
			});
		}

		this.resetInputs();

	}

	updateInputTitle( evt ) {
		this.setState({inputTitle : evt.target.value});
		return this.state.inputTitle;
	}

	updateInputBody( evt ) {
		this.setState({inputBody : evt.target.value});
		return this.state.inputBody;
	}

	updateInputCategory( evt ) {
		this.setState({inputCategory : evt.target.value});
		return this.state.inputCategory;
	}

	resetInputs() {
		this.setState({inputTitle : ''});
		this.setState({inputBody : ''});
		this.setState({inputCategory : ''});
	}

}


export default Table;