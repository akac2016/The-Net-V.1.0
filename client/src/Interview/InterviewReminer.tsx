import React from "react";
import PrincipleSlide from "../PrincipleSlides/PrincipleSlide";
import Button from "../Theme/Button";
import slideTheme from "../Theme/SlideTheme";
import DefaultPrinciples from "../PrincipleSlides/PrinciplesText";
import FadeMountTransition from "../Animation/FadeMountTransition";

interface IProps {
    isShowing: boolean;
    hideReminder: () => void;
}

export default class InterviewReminder extends React.Component<IProps, {}> {
    public render() {
        return (
            <FadeMountTransition unMountOnExit transitionDuration={1000} isShowing={this.props.isShowing}>
                <PrincipleSlide useSecondary transitionDuration={1000} principle={DefaultPrinciples.choosePrinciple()}>
                    <Button 
                        textColor="white" 
                        backgroundColor={slideTheme.colors.background.secondary} 
                        onClick={this.props.hideReminder}>
                            Show Interview
                    </Button>
                </PrincipleSlide>
            </FadeMountTransition>
        )
    }
}