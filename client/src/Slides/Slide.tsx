import React from "react"
import styled from "styled-components"
import SlideTheme from "../Theme/SlideTheme";

interface IProps {
    isPrimary?: boolean
    useSecondary?: boolean
    transitionDuration? : number;
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
transition: ${(props : IProps) => props.transitionDuration ? 
    props.transitionDuration : 
    0}ms;
`;

export default class Slide extends React.Component<IProps, {}> {
    render() {
        return (
            <Container 
                transitionDuration={this.props.transitionDuration} 
                useSecondary={this.props.useSecondary}
            >
                {this.props.children}
            </Container>
        )
    }
}