import React from "react";
import styled from "styled-components";
import SlideTheme from "../Theme/SlideTheme";
import SlideWrapper from "./SlideWrapper";

const Container : any = styled.div`
top: 0;
left: 0;
width: 100%;
height: 100%;
position: absolute;
z-index: 2;
background-color: ${SlideTheme.colors.background.main};
`;

interface IProps {
    transitionDuration: number;
    slides: boolean[]
}

export default class SlideContainer extends React.Component<IProps, {}> {
    public render() {
        return (
            <Container>
                {React.Children.map(this.props.children, (slide : any, i : number) => {
                    return <SlideWrapper 
                        transitionDuration={this.props.transitionDuration} 
                        isActive={this.props.slides[i]}>
                        {slide}
                    </SlideWrapper>
                })}
            </Container>
        )
    }
}