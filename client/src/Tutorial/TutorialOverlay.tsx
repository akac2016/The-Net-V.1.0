import React from "react";
import styled from "styled-components";
import FadeMountTransition from "../Animation/FadeMountTransition";
import slideTheme from "../Theme/SlideTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TutorialView from "./TutorialView";

const Overlay : any = styled.div`
position: absolute;
display: flex;
bottom: 0;
height:300px;
width: 100vw;
z-index: 2;
justify-content: center;
`;

const Modal : any = styled.div`
background-color: ${slideTheme.colors.background.main};
width: 100%;
height: 250px;
margin-top: 50px;
border-top-left-radius: 10px;
border-top-right-radius: 10px;
box-shadow: 0px 0px 5px 5px black;
`;

interface IProps {
    isShowing: boolean;
    hasNavigated: boolean;
}

// Transition fr

// Click and Drag
// Highlight Node
// Click Node
// Add yourself to the net

export default class TutorialOverlay extends React.Component<IProps, {}> {
    public render() {
        return (
            <FadeMountTransition isShowing={this.props.isShowing} transitionDuration={4000} unMountOnExit>
                <Overlay>
                    <Modal>
                        <TutorialView/>
                    </Modal>
                </Overlay>
            </FadeMountTransition>
        );
    }
}