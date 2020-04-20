import React from "react";
import styled from "styled-components";
import loadingScreen from "../Theme/LoadingTheme";
import { Transition } from "react-transition-group";

const Background : any = styled.div`
background-color: ${loadingScreen.colors.background.main};
top: 0;
left: 0;
position: absolute;
width: 100%;
height: 100%;
z-index: 40;
opacity: 0;
transition: opacity ${(props : IProps) => props.transitionDuration}ms ease-in-out;
`;

const Text : any = styled.h1`
color: ${loadingScreen.colors.text.primary}
`

interface IProps {
    hasLoaded: boolean
    transitionDuration: number
}

const transitionStyles : any = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

export default class LoadingScreen extends React.Component<IProps, {}> {
    public render() {
        return (
            <Transition 
                in={!this.props.hasLoaded} 
                timeout={this.props.transitionDuration}
                unmountOnExit>
                {state => (
                    <Background 
                        transitionDuration={this.props.transitionDuration} 
                        style={{
                            ...transitionStyles[state]
                        }}>
                        <Text>Loading Screen</Text>
                    </Background>
                )}
            </Transition>
        )
    }
}