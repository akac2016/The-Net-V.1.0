import React from "react";
import Interview from "../Net/Interview";
import styled from "styled-components";
import InterviewContainer from "./InterviewContainer";
import InterviewSection from "./InterviewSection";
import "../Animation/Animations.css";
import InterviewReminder from "./InterviewReminer";
import FadeMountTransition from "../Animation/FadeMountTransition";

interface IProps {
    isShowing: boolean;
    interview: Interview;
    closeHandler: () => void;
}

interface IState {
    isShowingReminder: boolean;
}

const Modal : any = styled.div`
z-index: 20;
position: absolute;
width: 100vw;
height: 100vh;
top: 100vh;
left: 0;
background-color: #F4EEE6;
overflow: scroll;
animation: slide-up 0.5s linear 0s 1 both;
`

export default class InterviewDisplay extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isShowingReminder: true
        }
        this.hideReminder = this.hideReminder.bind(this);
        this.close = this.close.bind(this);
    }

    public render() {
        return (
            <FadeMountTransition unMountOnExit isShowing={this.props.isShowing} transitionDuration={1000}>
                <Modal>
                    <InterviewContainer closeHandler={this.close} interview={this.props.interview}>
                        {this.getDisplay()}
                    </InterviewContainer>
                </Modal>
            </FadeMountTransition>
        )
    }

    public getDisplay() {
        return (
            <>
                {this.getReminder()}
                {this.getSections()}
            </>
        )
    }

    public close() {
        this.setState({
            isShowingReminder: true
        })
        this.props.closeHandler();
    }

    public getReminder() {
        return (
            <InterviewReminder isShowing={this.state.isShowingReminder} hideReminder={this.hideReminder}/>
        )
    }

    public hideReminder() {
        this.setState({
            isShowingReminder: false
        })
    }

    public getSections() {
        if (this.state.isShowingReminder) {
            return null;
        }
        return this.props.interview.text.split("\n").map((paragraph: string, i : number) => {
            return <InterviewSection key={i} isShowing={!this.state.isShowingReminder} isLeftAligned={i % 2 === 0}
                        paragraph={paragraph} 
                        url={this.props.interview.imageUrls[i % this.props.interview.imageUrls.length]}/>
        })
    }
}