import React from "react";
import styled from "styled-components";
import loadingScreen from "../Theme/LoadingTheme";
import { Transition } from "react-transition-group";
import "./LoadingScreenAnimations.css";
import CSSAnimator from "../Animation/CSSAnimator";
import { TrackingInExpand } from "../Animation/Animations";

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

const Container : any = styled.div`
width: 100%;
height: 100%;
max-height: 100vh;
max-width: 100vw;
overflow: hidden;
margin: 0 auto;
`

const Text : any = styled.h1`
margin: 0 auto;
padding: 150px 15px;
color: ${loadingScreen.colors.text.primary};
font-size: 36px;
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
                        <Container>
                            <CSSAnimator animation={TrackingInExpand(1, 0)}>
                                <Text>Have you ever wondered if there was a meaning to life?</Text>
                            </CSSAnimator>
                        </Container>
                    </Background>
                )}
            </Transition>
        )
    }
}