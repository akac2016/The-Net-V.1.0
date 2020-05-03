import React from "react";
import Tutorial from "./Tutorial";
import TutorialProgress from "./TutorialProgress";
import TutorialInfo from "./TutorialInfo";

interface IState {
    tutorialInfos: TutorialInfo[];
    currentTutorial: number
}

interface IProps {
    hasClicked: boolean;
    hasHovered: boolean;
    hasNavigated: boolean;
    hasZoomed: boolean;
}

export default class TutorialView extends React.Component<IProps, IState> {
    constructor(props : IProps) {
        super(props);
        this.state = {
            tutorialInfos: [
                new TutorialInfo("Navigation", "Click and drag to navigate the net.")
            ],
            currentTutorial: 0
        }
    }
    
    public componentWillReceiveProps(props : IProps) {
        
    }

    public render() {
        return (
            <>
                <Tutorial tutorial={this.state.tutorialInfos[this.state.currentTutorial]}/>
                <TutorialProgress 
                    total={this.state.tutorialInfos.length} 
                        current={this.state.currentTutorial}/>
            </>
        )
    }

    public incrementState() {

    }
}