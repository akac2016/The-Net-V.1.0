import React from "react"
import styled from "styled-components"
import InterviewWrapper from "./InterviewWrapper";
import Button from "../Theme/Button";
import Interview from "../Net/Interview";

const Container : any = styled.div`
display: block;
width: 100%;
max-width: 800px
margin: 0px auto;
`;

const Title : any = styled.div`
text-transform: capitalize;
font-size: 48px;
margin: 25px;
margin-botom: 0px;
font-weight: bold;
border-bottom: 2px solid black;
`;

const ButtonContainer : any = styled.div`
position: fixed;
bottom: 10px;
width: 100vw;
display:flex;
justify-content: center;
`;

interface IProps {
    interview: Interview
    closeHandler: () => void;
}

export default class InterviewContainer extends React.Component<IProps, {}> {
    public render() {
        return (
            <Container>
                <Title>{this.props.interview ? this.props.interview.title : ""}</Title>
                <InterviewWrapper>
                    {this.props.children}
                </InterviewWrapper>
                <ButtonContainer>
                    <Button textColor="white" backgroundColor="black" onClick={this.props.closeHandler}>Close</Button>
                </ButtonContainer>
            </Container>
        )
    }
}