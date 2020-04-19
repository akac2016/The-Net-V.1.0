import React from 'react';
import './App.css';
import Net from './Net/Net';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Slide from './Slides/Slide';
import SlideShow from './Slides/SlideShow';
 
library.add(faChevronRight, faChevronLeft)

// TODO
// Fade intro after 4 seconds
// Add flashlight feature to net
// Add a way to add people to the net
// Make Nodes appear 3D
// Add animation to interactable elements
// Change the interviews 
// Disqus


export default class App extends React.Component<{}, {}> {
	public render() {
		return (
			<div className="App">
				<SlideShow>
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
			</div>
		);
	}
}
