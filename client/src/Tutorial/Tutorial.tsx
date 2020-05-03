import React from "react";
import styled from "styled-components";
import Text from "../Theme/Text";
import TutorialInfo from "./TutorialInfo";

const TutorialHeader : any = styled.h1`
font-size: 48px;
font-weight: 800;
`

interface IProps {
    tutorial: TutorialInfo
}

export default class Tutorial extends React.Component<IProps, {}> {
    public render() {
        return (
            <>
                <TutorialHeader>{this.props.tutorial.title}</TutorialHeader>
                <Text>{this.props.tutorial.instructions}</Text>
            </>
        )
    }
}