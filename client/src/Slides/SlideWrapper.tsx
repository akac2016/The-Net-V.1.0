import React from "react";
import { Transition } from 'react-transition-group'
import styled from "styled-components";
import Slide from "./Slide";

interface IProps {
    isPrimary?: boolean;
    isActive: boolean;
    transitionDuration: number
}

const transitionStyles : any = {
    entering: { opacity: 0 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
};

const Wrapper : any = styled.div`
opacity: 0;
transition: ${(props : IProps) => props.transitionDuration ? 
    props.transitionDuration : 
    0}ms ease;
`;

export default class SlideWrapper extends React.Component<IProps, {}> {
    public render() {
        return (
            <Transition
                in={this.props.isActive}            
                unmountOnExit
                timeout={this.props.transitionDuration}>
                    {state => 
                        <Wrapper transitionDuration={this.props.transitionDuration} style={{ ...transitionStyles[state]}}>
                            {this.injectTransitionDuration()}
                        </Wrapper>
                    }
            </Transition>
        )
    }

    public injectTransitionDuration() {
        return React.cloneElement(this.props.children as React.ReactElement<any>, {
            ...(this.props.children as Slide).props,
            transitionDuration: this.props.transitionDuration 
        })
    }
}