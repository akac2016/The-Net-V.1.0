import React from "react";
import styled from "styled-components";
import Net from "./Net";
import InterviewNode from "./InterviewNode";
import Tutorial from "../Tutorial/TutorialOverlay";
import FadeMountTransition from "../Animation/FadeMountTransition";
import TutorialOverlay from "../Tutorial/TutorialOverlay";

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
    hasNavigated: boolean;
    hasHovered: boolean;
    hasClicked: boolean;
}

export default class NetContainer extends React.Component<IProps, IState> {
    constructor(props : IProps) {
        super(props);
        this.state = {
            hasClicked: false,
            hasHovered: false,
            hasNavigated: false
        }
        this.navigationListener = this.navigationListener.bind(this);
    }

    public render() {
        return (
            <FadeMountTransition transitionDuration={2000} isShowing={this.props.isShowing}>
                <Container>
                    <TutorialOverlay 
                        hasNavigated={this.state.hasNavigated}
                        isShowing={this.props.isShowing}/>
                    <Net 
                        navigationListener={this.navigationListener}
                        openInterview={this.props.openInterview}/>
                </Container>
            </FadeMountTransition>
        )
    }

    public navigationListener() {

    }
}