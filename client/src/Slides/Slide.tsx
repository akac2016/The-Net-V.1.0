import React from "react"
import styled from "styled-components"
import SlideTheme from "../Theme/SlideTheme";

interface IProps {
    isPrimary?: boolean
    useSecondary?: boolean
    transitionDuration?: number;
}

const Container : any = styled.div`
background-color: ${(props: IProps) => props.useSecondary ? 
    SlideTheme.colors.background.secondary : 
    SlideTheme.colors.background.main
};
top: 0;
left: 0;
position: absolute;
width: 100%;
height: 100%;
overflow: hidden;
`;

export default class Slide extends React.Component<IProps, {}> {
    public render() {
        return (
            <Container useSecondary={this.props.useSecondary}>
                {this.injectTransitionIntoSlide()}
            </Container>
        )
    }

    public injectTransitionIntoSlide() {
        return React.cloneElement(this.props.children as React.ReactElement<any>, {
            ...(this.props.children as any).props,
            transitionDuration: this.props.transitionDuration 
        })
    }
}