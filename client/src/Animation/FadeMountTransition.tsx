import React from "react";
import { CSSTransition } from "react-transition-group";

interface IProps {
    isShowing: boolean;
    transitionDuration: number;
    unMountOnExit?: boolean
}

interface IState {
    isShowing: boolean
} 

const transitionStyles : any = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
};

const defaultStyles : any = {
    opacity: 0,
}

export default class FadeMountTransition extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            isShowing: props.isShowing
        };
    }

    public componentWillReceiveProps(props: IProps) {
        this.setState({
            isShowing: props.isShowing
        })
    }

    public render() {
        return (
            <CSSTransition appear unmountOnExit={this.props.unMountOnExit} in={this.state.isShowing} timeout={this.props.transitionDuration}>
                {state =>
                    <div style={{
                        transition: `${this.props.transitionDuration}ms`, 
                        ...defaultStyles, 
                        ...transitionStyles[state]
                    }}>
                        {this.props.children}
                    </div>
                }
            </CSSTransition>
        )
    }
}