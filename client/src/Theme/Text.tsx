import React from "react";
import styled from "styled-components";

const StyledText : any = styled.p`
font-size: 20px;
line-height: 1.5em;

@media screen and (min-width: 375px) {
    font-size: 25px;
} 

@media screen and (min-width: 425px) {
    font-size: 30px;
    line-height: 2.0em;
}

@media screen and (max-height: 425px) {
    font-size: 20px;
    line-height: 1.5em;
}
`;

export default class Text extends React.Component<{}, {}> {
    public render() {
        return (
            <StyledText>
                {this.props.children}
            </StyledText>
        );
    }
}