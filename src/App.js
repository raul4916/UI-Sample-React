import React,{ Component } from 'react';
import './App.css';
import Table               from './Table'


class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Cards</h1>
				</header>
				<Table></Table>
			</div>
		);
	}
}


export default App;
