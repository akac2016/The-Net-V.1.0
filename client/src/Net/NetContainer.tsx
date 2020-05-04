import React from "react";
import styled from "styled-components";
import Net from "./Net";
import InterviewNode from "./InterviewNode";
import Tutorial from "../Tutorial/TutorialOverlay";
import FadeMountTransition from "../Animation/FadeMountTransition";
import TutorialOverlay from "../Tutorial/TutorialOverlay";
import TutorialManager from "../Tutorial/TutorialManager";

const Container = styled.div`
top: 0;
left: 0;
width: 100vw;
max-width:100%;
height: 100vh;
overflow: hidden;
position: relative;
`;

interface IProps {
    openInterview: (node: InterviewNode) => void;
    isShowing: boolean;
}

interface IState {
    name: string;
    displayingSuccess: boolean;
    currentTutorial: string;
    isDoingTutorial: boolean;
}

export default class NetContainer extends React.Component<IProps, IState> {
    constructor(props : IProps) {
        super(props);
        this.state = {
            displayingSuccess: false,
            name: "",
            currentTutorial: TutorialManager.getCurrentTutorial().title,
            isDoingTutorial: true
        };
        this.tutorialNotifier = this.tutorialNotifier.bind(this);
        this.disableNotification = this.disableNotification.bind(this);
        this.closeTutorial = this.closeTutorial.bind(this);
    }

    public render() {
        return (
            <FadeMountTransition transitionDuration={1000} isShowing={this.props.isShowing}>
                <Container>
                    <TutorialOverlay
                        closeTutorial={this.closeTutorial}
                        disableNotification={this.disableNotification}
                        currentTutorialName={this.state.currentTutorial}
                        completedTutorialName={this.state.name}
                        isShowing={this.state.isDoingTutorial}/>
                    <Net 
                        tutorialNotifier={this.tutorialNotifier}
                        openInterview={this.props.openInterview}/>
                </Container>
            </FadeMountTransition>
        )
    }

    public closeTutorial() {
        this.setState({
            isDoingTutorial: false
        });
    }

    public tutorialNotifier(name: string) {
        if (!this.state.displayingSuccess) {
            TutorialManager.getTutorialEmitter(name).complete();
            this.setState({
                name: name
            });
        }
    }

    public disableNotification() {
        if (!this.state.displayingSuccess) {
            this.setState({
                displayingSuccess: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        displayingSuccess: false,
                        currentTutorial: TutorialManager.getCurrentTutorial().title
                    })
                }, 1000);
            });
        }
    }
}