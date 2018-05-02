import React    from 'react';
import ReactDOM from 'react-dom';
import App      from './App';
import Card     from './Card'
import Table    from './Card'

it('renders without crashing',() => {
	const div = document.createElement('div');
	ReactDOM.render(<App/>,div);
	ReactDOM.render(<Card/>,div);
	ReactDOM.render(<Table/>,div);

	ReactDOM.unmountComponentAtNode(div);
});
