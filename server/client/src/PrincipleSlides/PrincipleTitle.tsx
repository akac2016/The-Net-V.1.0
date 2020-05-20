import React from "react";
import Title from "../Theme/Title";
import CSSAnimator from "../Animation/CSSAnimator";
import { TrackingInContract } from "../Animation/Animations";

interface IProps {
    transitionDuration?: number;
}

export default class PrincipleTitle extends React.Component<IProps, {}> {
    public render() {
        const delay : number = this.props.transitionDuration ? this.props.transitionDuration / 1000 : 0;
        return (
            <CSSAnimator animation={TrackingInContract(0.8, delay)}>
                <Title>
                    {this.props.children}
                </Title>
            </CSSAnimator>
        )
    }
}