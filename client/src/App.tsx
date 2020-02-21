import React, { Props } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import Net from './Net/Net';

export default class App extends React.Component<{}, {}> {
	public render() {
		return (
			<div className="App">
				<header className="App-header">
					<FontAwesomeIcon icon={faCoffee} />
					<p> The Net Project </p>
				</header>
				<Net></Net>
			</div>
		);
	}
}
