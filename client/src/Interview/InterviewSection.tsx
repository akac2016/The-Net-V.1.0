import React from "react"
import styled from "styled-components";
import Text from "../Theme/Text";
import FadeMountTransition from "../Animation/FadeMountTransition";

interface IProps {
    paragraph: string;
    url?: string;
    isLeftAligned: boolean;
    isShowing: boolean;
}

const Container = styled.div`
display: flex;
height: auto;
flex-wrap: wrap;
box-sizing: border-box;
flex-direction: row;
text-align: left;
padding: 0 20px;
max-width: 1200px;
margin: 0 auto;

@media all and (min-width: 800px) {
    flex-wrap: no-wrap;
    flex-direction: ${(props: IProps) => props.isLeftAligned ? "row" : "row-reverse"};
}
`;

const TextContainer = styled.div`
width: 100%;
box-sizing: border-box;
font-size: 12px;
padding: 5px;
text-align: left;

@media all and (min-width: 800px) {
    width: 70%;
}
`;

const ImageContainer = styled.div`
width: 100%;
box-sizing: border-box;

@media all and (min-width: 800px) {
    width: 30%;
}
`;

const Image = styled.img`
width: 80%;
height: auto;
min-width: 250px;
border-raidus: 100%;
display: block;
margin: 25px auto;
`;

export default class InterviewSection extends React.Component<IProps, {}> {
    public render() {
        if (this.props.url) {
            return (
                <FadeMountTransition unMountOnExit isShowing={this.props.isShowing} transitionDuration={1000}>
                    <Container isShowing={this.props.isShowing} url={this.props.url} paragraph={this.props.paragraph} isLeftAligned={this.props.isLeftAligned}>
                        <ImageContainer>
                            <Image src={this.props.url}/>
                        </ImageContainer>
                        <TextContainer>
                            <Text useCustomFontSize>{this.props.paragraph}</Text>
                        </TextContainer>
                    </Container>
                </FadeMountTransition>
            );
        }
        else {
            return (
                <FadeMountTransition unMountOnExit isShowing={this.props.isShowing} transitionDuration={1000}>
                    <Container isShowing={this.props.isShowing} url={this.props.url} paragraph={this.props.paragraph} isLeftAligned={this.props.isLeftAligned}>
                        <Text useCustomFontSize>{this.props.paragraph}</Text>
                    </Container>
                </FadeMountTransition>
            );
        }
    }
}