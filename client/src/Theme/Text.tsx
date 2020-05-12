import React from "react";
import styled from "styled-components";

interface IProps {
    useCustomFontSize? : boolean;
}

const StyledText : any = styled.p`
font-size: 20px;
line-height: 1.5em;


${(props: IProps) => props.useCustomFontSize ? "" :
`@media screen and (min-width: 375px) {
    font-size: 25px;
} 

@media screen and (min-width: 425px) {
    font-size: 30px;
    line-height: 2.0em;
}

@media screen and (max-height: 425px) {
    font-size: 20px;
    line-height: 1.5em;
}`
}
`;

export default class Text extends React.Component<IProps, {}> {
    public render() {
        return (
            <StyledText useCustomFontSize={this.props.useCustomFontSize}>
                {this.props.children}
            </StyledText>
        );
    }
}