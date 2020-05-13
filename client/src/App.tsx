import React from 'react';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronRight, faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import LoadingScreen from './LoadingScreen/LoadingScreen';
import PrincipleSlideShow from './PrincipleSlides/PrincipleSlideShow';
import InterviewDisplay from './Interview/InterviewDisplay';
import Interview from './Net/Interview';
import InterviewNode from './Net/InterviewNode';
import NetContainer from './Net/NetContainer';
 
library.add(faChevronRight, faChevronLeft, faCheck)

// TODO
// mobile transitions
// Hook up to backend

interface IState {
	hasLoaded: boolean;
	hasExitedSlides: boolean;
	hasClickedInterview: boolean;
	selectedInterview: Interview | null;
}

export default class App extends React.Component<{}, IState> {
	constructor(props: any) {
		super(props);
		this.state = {
			hasLoaded: false,
			hasExitedSlides: false,
			hasClickedInterview: false,
			selectedInterview: null
		}
		this.closeSlideShow = this.closeSlideShow.bind(this);
		this.closeInterview = this.closeInterview.bind(this);
		this.openInterview = this.openInterview.bind(this);
	}

	public componentDidMount() {
		setTimeout(() => {
			this.setState({
				hasLoaded: true
			})
		}, 4000)
	}

	public render() {
		return (
			<div className="App">
				<LoadingScreen 
					transitionDuration={750} 
					hasLoaded={this.state.hasLoaded}/>
				<PrincipleSlideShow 
					transitionDuration={500} 
					isShowing={!this.state.hasExitedSlides}
					close={this.closeSlideShow}/> 
				<NetContainer isShowing={this.state.hasExitedSlides} openInterview={this.openInterview}/>
				<InterviewDisplay isShowing={this.state.hasClickedInterview}
					interview={this.state.selectedInterview as Interview}
					closeHandler={this.closeInterview} />
			</div>
		);
	}

	public async openInterview(node : InterviewNode) {
		this.setState({
			hasClickedInterview: true,
			selectedInterview: await node.getInterview()
		})
	} 

	public closeInterview() {
		this.setState({
			hasClickedInterview: false,
			selectedInterview: null
		})
	}

	public closeSlideShow() {
		this.setState({
			hasExitedSlides: true
		})
	}
}
