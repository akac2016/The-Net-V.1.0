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
font-weight: bold;
border-bottom: 2px solid black;
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
                <Button textColor="white" backgroundColor="black" onClick={this.props.closeHandler}>Close</Button>
                <InterviewWrapper>
                    {this.props.children}
                </InterviewWrapper>
            </Container>
        )
    }
}