import React, { Props } from 'react';
import Axios from "axios";
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

interface IState {
	isPinging: boolean
	isRunning: boolean
}

export default class App extends React.Component<{}, IState> {
	public state: IState = {
		isPinging: true,
		isRunning: false,
	};

	constructor(props : {}) {
		super(props);
		this.getStatus();
	}

	public render() {
		return (
			<div className="App">
				<header className="App-header">
					<FontAwesomeIcon icon={faCoffee} />
					<p> The Net Project </p>
					{ 
						!this.state.isPinging 
							? <p>Server is up.</p> 
							: <p>Server is down.</p> 
					}
				</header>
			</div>
		);
	}

	async getStatus() {
		const res = await Axios.get("/ping");
		this.setState({
			isPinging: false,
			isRunning: res.data.running
		})
	}
}
