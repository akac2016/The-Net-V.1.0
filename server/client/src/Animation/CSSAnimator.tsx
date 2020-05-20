import React from "react";
import styled from "styled-components";
import Animation from "./Animation";
import "./Animations.css";

interface IProps {
    animation: Animation
}

const Animator : any = styled.div`
${(props: IProps) => props.animation.getCSSString()}
`

export default class CSSAnimator extends React.Component<IProps, {}> {
    public render() {
        return <Animator animation={this.props.animation}>{this.props.children}</Animator>
    }
}