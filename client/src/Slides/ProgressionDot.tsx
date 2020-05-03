import React from "react"
import Styled from "styled-components";
import SlideTheme from "../Theme/SlideTheme";

const Dot : any = Styled.div`
width: 20px;
height: 20px;
border-radius: 100%;
margin: 7px;
background-color: ${(props : IProps) => {
    return props.isActive
    ? SlideTheme.colors.controls.dot.active
    : SlideTheme.colors.controls.dot.main
}};
transition: 0.5s all;
&:hover {
    cursor: pointer;
    -webkit-animation: shadow-drop-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: shadow-drop-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    background-color: ${(props : IProps) => {
        return !props.isActive
        ? SlideTheme.colors.controls.dot.hover
        : SlideTheme.colors.controls.dot.active
    }};
}
@media (min-width: 800px) {
    width: 25px;
    height: 25px;
    margin: 10px
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