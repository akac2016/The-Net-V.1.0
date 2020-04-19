import React from "react"
import Styled from "styled-components";
import SlideTheme from "../Theme/SlideTheme";

const Dot : any = Styled.div`
width: 25px;
height: 25px;
border-radius: 100%;
margin: 10px;
background-color: ${(props : IProps) => {
    return props.isActive
    ? SlideTheme.colors.controls.dot.active
    : SlideTheme.colors.controls.dot.main
}};
transition: 0.5s all;
&:hover {
    cursor: pointer;
    -webkit-animation: bounce 1s ease both;
    animation: bounce 1s ease both;
    background-color: ${(props : IProps) => {
        return !props.isActive
        ? SlideTheme.colors.controls.dot.hover
        : SlideTheme.colors.controls.dot.active
    }};
}
`

interface IProps {
    isActive: boolean;
    selector: () => void;
}

export default class ProgressionDot extends React.Component<IProps, {}> {
    public render() {
        return (
            <Dot isActive={this.props.isActive} onClick={this.props.selector} ></Dot>
        )
    }
}