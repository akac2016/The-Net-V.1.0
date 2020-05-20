import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
width: 100%;
max-width: 1000px;
margin: 0 auto;
padding-bottom: 100px;
`;

export default class InterviewWrapper extends React.Component<{}, {}> {
    public render() {
        return (
            <Wrapper>
                {this.props.children}
            </Wrapper>
        );
    }
}