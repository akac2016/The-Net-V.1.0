import React from "react";
import Tutorial from "./Tutorial";
import TutorialProgress from "./TutorialProgress";
import TutorialManager from "./TutorialManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

interface IProps {
    completedTutorialName: string;
    currentTutorialName: string;
    disableNotification: () => void;
}

const IconCircle : any = styled.div`
border: 5px solid white;
border-radius: 100%;
width: 100px;
height: 100px;
margin: 0 auto;
padding-top: 10px;
padding-left: 10px;
`;

export default class TutorialView extends React.Component<IProps, {}> {
    public render() {
        if (this.props.completedTutorialName !== this.props.currentTutorialName) {
            return (
                <>
                    <Tutorial tutorial={TutorialManager.getCurrentTutorial()}/>
                    <TutorialProgress 
                        total={TutorialManager.getTotalTutorials()} 
                            current={TutorialManager.getCurrentTutorialIndex() + 1}/>
                </>
            )
        } else {
            this.props.disableNotification()
            return (
                <>
                    <h1>Great job!</h1>
                    <IconCircle>
                        <FontAwesomeIcon icon="check" color="green" size="5x"/>
                    </IconCircle>
                </>
            );
        }
    }
}