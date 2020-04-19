import React from "react";
import { CSSTransition } from 'react-transition-group'
import "./SlideTransitions.css";

interface IProps {
    isPrimary?: boolean;
    isActive: boolean;
}

interface IState {
    isShowing: boolean
}

export default class SlideWrapper extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isShowing: props.isPrimary ? true : false
        }
    }

    public componentWillReceiveProps(props: IProps) {
        this.setState({
            isShowing: props.isActive
        })
    }

    public render() {
        return (
            <CSSTransition
                in={this.props.isActive}
                classNames="slide-transition"
                unmountOnExit
                timeout={1500}>
                    {this.props.children}
            </CSSTransition>
        )
    }
}