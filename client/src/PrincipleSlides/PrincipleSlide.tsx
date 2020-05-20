import React from "react";
import styled from "styled-components";
import Slide from "../Slides/Slide";
import PrincipleText from "./PrincipleText";
import PrincipleTitle from "./PrincipleTitle";

const Container : any = styled.div`
width: 100%;
max-width: 800px;
height: 100%;
margin: 0 auto;
`

interface IProps {
    principle: string;
    isPrimary?: boolean;
    useSecondary?: boolean;
    transitionDuration?: number;
}

export default class PrincipleSlide extends React.Component<IProps, {}> {
    public render() {
        return (
            <Slide useSecondary={this.props.useSecondary} isPrimary={this.props.isPrimary}>
                <Container>
                    <PrincipleTitle transitionDuration={this.props.transitionDuration}>{this.props.principle}</PrincipleTitle>
                    <PrincipleText keyword={this.props.principle.toLowerCase()}/>
                    {this.props.children}
                </Container>
            </Slide>
        )
    }
}