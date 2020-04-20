import React from "react";
import { CSSTransition } from 'react-transition-group'
import "./SlideTransitions.css";

interface IProps {
    isPrimary?: boolean;
    isActive: boolean;
    transitionTime: number
}

export default class SlideWrapper extends React.Component<IProps, {}> {
    public render() {
        return (
            <CSSTransition
                in={this.props.isActive}
                classNames="slide-transition"
                unmountOnExit
                timeout={this.props.transitionTime}>
                    {this.props.children}
            </CSSTransition>
        )
    }
}