import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
width: 100%;
margin: 25px 0;
height: 60vh;
overflow-y: scroll;
max-height: 60vh;
background-color: pink;
`;

export default class InterviewWrapper extends React.Component<{}, {}> {
    public render() {
        return <Wrapper>{this.props.children}</Wrapper>
    }
}