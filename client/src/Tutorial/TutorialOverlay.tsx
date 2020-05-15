import React from "react";
import styled from "styled-components";
import FadeMountTransition from "../Animation/FadeMountTransition";
import slideTheme from "../Theme/SlideTheme";
import TutorialView from "./TutorialView";
import Button from "../Theme/Button";

const Overlay : any = styled.div`
position: fixed;
display: flex;
bottom: 0px;
height:300px;
width: 100vw;
z-index: 2;
justify-content: center;
`;

const Modal : any = styled.div`
position:relative;
background-color: ${slideTheme.colors.background.main};
width: 100%;
height: 250px;
margin-top: 50px;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
box-shadow: 0px 0px 5px 5px black;
`;

interface IProps {
    closeTutorial: () => void;
    isShowing: boolean;
    completedTutorialName: string;
    currentTutorialName: string;
    disableNotification: () => void;
}

const CloseButtonContainer : any = styled.div`
position: absolute;
top: -2px;
right: 10px;
`;

export default class TutorialOverlay extends React.Component<IProps, {}> {
    public render() {
        return (
            <FadeMountTransition isShowing={this.props.isShowing} transitionDuration={500} unMountOnExit>
                <Overlay>
                    <Modal>
                        <CloseButtonContainer>
                            <Button onClick={this.props.closeTutorial} textColor="white" backgroundColor="black">X</Button>
                        </CloseButtonContainer>
                        <TutorialView
                            currentTutorialName={this.props.currentTutorialName}
                            completedTutorialName={this.props.completedTutorialName}
                            disableNotification={this.props.disableNotification}
                            />
                    </Modal>
                </Overlay>
            </FadeMountTransition>
        );
    }
}