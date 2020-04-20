import React from "react";
import { CSSTransition } from 'react-transition-group'
import "./SlideTransitions.css";
import Slide from "./Slide";

interface IProps {
    isPrimary?: boolean;
    isActive: boolean;
    transitionDuration: number
}

export default class SlideWrapper extends React.Component<IProps, {}> {
    public render() {
        return (
            <CSSTransition
                in={this.props.isActive}
                classNames="slide-transition"
                unmountOnExit
                timeout={this.props.transitionDuration}>
                    {this.injectTransitionIntoSlide()}
            </CSSTransition>
        )
    }

    public injectTransitionIntoSlide() {
        return React.cloneElement(this.props.children as React.ReactElement<any>, {
            ...(this.props.children as Slide).props,
            transitionDuration: this.props.transitionDuration 
        })
    }
}