import React from 'react';
import './App.css';
import Net from './Net/Net';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Slide from './Slides/Slide';
import SlideShow from './Slides/SlideShow';
import LoadingScreen from './LoadingScreen/LoadingScreen';
 
library.add(faChevronRight, faChevronLeft)

// TODO
// Fade intro after 4 seconds
// Add flashlight feature to net
// Add a way to add people to the net
// Make Nodes appear 3D
// Add reminder of the principles
// Add animation to interactable elements
// Change the interviews 
// Disqus

interface IState {
	hasLoaded: boolean;
	hasExitedSlides: boolean
}

export default class App extends React.Component<{}, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			hasLoaded: false,
			hasExitedSlides: false,
		}
	}

	public componentDidMount() {
		setTimeout(() => {
			this.setState({
				hasLoaded: true
			})
		}, 3000)
	}

	public render() {
		return (
			<div className="App">
				<LoadingScreen hasLoaded={this.state.hasLoaded}/>
				<SlideShow transitionTime={1000}>
					<Slide isPrimary>
						<h1>Principle 1</h1>
					</Slide> 
					<Slide>
						<h1>Principle 2</h1>
					</Slide> 
					<Slide>
						<h1>Principle 3</h1>
					</Slide> 
					<Slide useSecondary>
						<h1>Principle 4</h1>
					</Slide> 
				</SlideShow>
				<Net></Net>
			</div>
		);
	}
}
