import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
width: 100%;
margin: 50px 0;
height: 80vh;
overflow-y: scroll;
max-height: 80vh;
`;

export default class InterviewWrapper extends React.Component<{}, {}> {
    public render() {
        return <Wrapper>{this.props.children}</Wrapper>
    }
}