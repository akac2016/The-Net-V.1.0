import React, { Props } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

interface IState {
	title: String
}

export default class App extends React.Component<{}, IState> {
	public state: IState = {
		title: "Title"
	};

	constructor(props : {}) {
		super(props);
		this.changeTitle = this.changeTitle.bind(this);
	}

	public render() {
		return (
			<div className="App">
				<header className="App-header">
					<FontAwesomeIcon icon={faCoffee} />
					<p> {this.state.title} </p>
					<button onClick={this.changeTitle}>Click me!</button>
				</header>
			</div>
		);
	}

	changeTitle() {
		this.setState({
			title: "The Net Project"
		});
	}
}
