import React from "react";
import styled from "styled-components";
import loadingScreen from "../Theme/LoadingTheme";
import "./LoadingScreenTransitions.css";

const Background : any = styled.div`
background-color: ${loadingScreen.colors.background.main};
top: 0;
left: 0;
position: absolute;
width: 100%;
height: 100%;
z-index: 40;
opacity: 1;
transition: 1500ms;
`;

const Text : any = styled.h1`
color: ${loadingScreen.colors.text.primary}
`

interface IProps {
    hasLoaded: boolean
}

export default class LoadingScreen extends React.Component<IProps, {}> {
    public render() {
        return (
            <Background>
                <Text>Loading text...</Text>
            </Background>
        )
    }
}