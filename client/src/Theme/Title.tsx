import React from "react"
import styled from "styled-components";

const StyledTitle = styled.h1`
font-size: 47px;
margin: 0;
padding: 25px;
text-transform: capitalize;
`

export default class Title extends React.Component<{}, {}> {
    public render() {
        return (
            <StyledTitle>{this.props.children}</StyledTitle>
        )
    }
}