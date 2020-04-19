import React from "react";
import styled from "styled-components";
import SlideTheme from "../Theme/SlideTheme";

const Container : any = styled.div`
top: 0;
left: 0;
width: 100%;
height: 100%;
position: absolute;
z-index: 2;
background-color: ${SlideTheme.colors.controls.dot.hover};
`;

export default class SlideContainer extends React.Component<{}, {}> {
    public render() {
        return (
            <Container>
                {this.props.children}
            </Container>
        )
    }
}