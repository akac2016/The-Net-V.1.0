import React from "react"
import styled from "styled-components"
import InterviewWrapper from "./InterviewWrapper";
import Button from "../Theme/Button";
import Interview from "../Net/Interview";

const Container : any = styled.div`
display: block;
width: 100%;
margin: 0px auto;
height: 100vh;
overflow-y: scroll;
max-height: 99vh;
box-sizing: border-box;
`;

const Title : any = styled.div`
text-transform: capitalize;
font-size: 48px;
padding: 25px;
margin-botom: 0px;
font-weight: bold;
border-bottom: 2px solid black;
box-sizing: border-box;
`;

interface IProps {
    interview: Interview
    closeHandler: () => void;
}

export default class InterviewContainer extends React.Component<IProps, {}> {
    public render() {
        return (
            <Container>
                <InterviewWrapper>
                    <Title>{this.props.interview ? this.props.interview.title : ""}</Title>
                    {this.props.children}
                    <Button textColor="white" backgroundColor="black" onClick={this.props.closeHandler}>Close</Button>
                </InterviewWrapper>
            </Container>
        )
    }
}