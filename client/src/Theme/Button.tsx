import React from "react";
import styled from "styled-components";
import './ButtonAnimation.css';

const AnimationSpeed = 0.5;
const BorderWidth = 4

const StyledButton = styled.button`
outline : none;
padding: 10px 35px;
font-size: 18px;
border: ${BorderWidth}px solid transparent;
color: ${(props : IProps) => props.textColor};
background-color: ${(props : IProps) => props.backgroundColor};
&:before {
    content: '';
    position: absolute;
    background: ${(props : IProps) => props.textColor};
}
&:after {
    content: '';
    position: absolute;
    background: ${(props : IProps) => props.textColor};
}
&:hover {
    cursor: pointer;
    -webkit-animation: scale-up-center 1s cubic-bezier(0.785, 0.135, 0.150, 0.860) both, shadow-drop-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both, borderColors ${AnimationSpeed}s steps(1) forwards;
    animation: scale-up-center 1s cubic-bezier(0.785, 0.135, 0.150, 0.860) both, shadow-drop-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both, borderColors ${AnimationSpeed}s steps(1) forwards;

}
&:hover:before {
    animation: beforeBorders ${AnimationSpeed}s forwards ease-in-out;
}
&:hover:after {
    animation: afterBorders ${AnimationSpeed}s forwards ease-in-out;
}
&:focus {
    animation: borderColors ${AnimationSpeed}s steps(1) forwards;
}
&:focus:before {
    animation: beforeBorders ${AnimationSpeed}s forwards ease-in-out;
}
&:focus:after {
    animation: afterBorders ${AnimationSpeed}s forwards ease-in-out;
}
@keyframes beforeBorders {
    0% {
        top: ${BorderWidth * -1}px;
        left: 50%;
        bottom: auto;
        right: auto;
        width: 0;
        height: ${BorderWidth}px;
    }
    33% {    
        top: ${BorderWidth * -1}px;
        left: ${BorderWidth * -1}px;
        bottom: auto;
        right: auto;
        width: calc(${BorderWidth}px + 50%)
        height: ${BorderWidth}px;
    }
    66% {
        top: ${BorderWidth * -1}px;
        left: ${BorderWidth * -1}px;
        bottom: auto;
        right: auto;
        width: ${BorderWidth}px;
        height: calc(${BorderWidth}px * 2 + 100%);
    }
    100% {
        top: auto;
        left: ${BorderWidth * -1}px;
        bottom: ${BorderWidth * -1}px;
        right: auto;
        width: calc(${BorderWidth}px + 50%)
        height: calc(${BorderWidth}px * 2 + 100%);
    }
}

@keyframes afterBorders {
    0% {
        top: ${BorderWidth * -1}px;
        left: auto;
        bottom: auto;
        right: 50%;
        width: 0;
        height: ${BorderWidth}px;
    }
    33% {    
        top: ${BorderWidth * -1}px;
        left: auto;
        bottom: auto;
        right: ${BorderWidth * -1}px;
        width: calc(${BorderWidth}px + 50%)
        height: ${BorderWidth}px;
    }
    66% {
        top: ${BorderWidth * -1}px;
        left: auto;
        bottom: auto;
        right: ${BorderWidth * -1}px;
        width: ${BorderWidth}px;
        height: calc((${BorderWidth}px * 2) + 100%);
    }
    100% {
        top: auto;
        left: auto;
        bottom: ${BorderWidth * -1}px;
        right: ${BorderWidth * -1}px;
        width: calc(${BorderWidth}px + 50%)
        height: calc((${BorderWidth}px * 2) + 100%);
    }
}

@keyframes borderColors {
    0% {
        border-top-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
    }
    33% {
        border-top-color: ${(props : IProps) => props.textColor};
        border-right-color: transparent;
        border-bottom-color: transparent;
        border-left-color: transparent;
    }
    66% {
        border-top-color: ${(props : IProps) => props.textColor};
        border-right-color: ${(props : IProps) => props.textColor};
        border-bottom-color: transparent;
        border-left-color: ${(props : IProps) => props.textColor};
    }
    100% {
        border-top-color: ${(props : IProps) => props.textColor};
        border-right-color: ${(props : IProps) => props.textColor};
        border-bottom-color: ${(props : IProps) => props.textColor};
        border-left-color: ${(props : IProps) => props.textColor};
    }
}
`;

const AnimationWrapper = styled.div`
&:focus {
    animation: background ${AnimationSpeed / 5 * 3}s forwards ease-in-out;
    animation-delay: ${AnimationSpeed / 5 * 2}s;
}

&:hover {
    animation: background ${AnimationSpeed / 5 * 3}s forwards ease-in-out;
    animation-delay: ${AnimationSpeed / 5 * 2}s;
}


@keyframes background {
    to {
        text-shadow: 0 0.1em 0.1em #111;
    }
}
`

interface IProps {
    textColor: string;
    backgroundColor: string,
    onClick?: () => void;
}

export default class Button extends React.Component<IProps, {}> {
    public render() {
        return (
            <AnimationWrapper>
                <StyledButton
                    onClick={this.props.onClick}
                    textColor={this.props.textColor} 
                    backgroundColor={this.props.backgroundColor}>
                        {this.props.children}
                </StyledButton>
            </AnimationWrapper>
        )
    }
}