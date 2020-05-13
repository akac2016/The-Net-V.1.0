import React from "react";
import styled from "styled-components";
import slideTheme from "../Theme/SlideTheme";

interface IProps {
    title: string;
    x: number,
    y: number,
    isShowing: boolean;
}

const Tooltip = styled.div`
display: ${(props: IProps) => props.isShowing ? "block" : "none"};
position: absolute;
z-index: 2;
top: ${(props: IProps) => props.y}px;
left: ${(props: IProps) => props.x}px;
width: 150px;
font-size: 20px;
color: black;
background-color: ${slideTheme.colors.background.main};
border-radius: 15px;
padding: 5px 5px;
font-weight: bolder;
text-transform: capitalize;
box-shadow: 0px 0px 9px 9px rgba(0, 0, 0, 0.7);
animation-name: popup;
animation-duration: 0.5s;
animation-fill-mode: both;
animation-delay: 50ms;
animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
opacity: 0;

@keyframes popup {
    0% {
        transform: scale(1.0)
        opacity: 0;
    }
    25% {
        opacity: 1;
    }
    75% {
        transform: scale(1.125)
    }
    100% {
        opacity: 1;
        transform: scale(1.1)
    }
}
`;

export default class NetToolTip extends React.Component<IProps, {}> {
    public render() {
        return (
            <Tooltip isShowing={this.props.isShowing} x={this.props.x - 80} y={this.props.y - 65} title={this.props.title}>
                {this.getTitle()}
            </Tooltip>
        );
    }

    private getTitle() {
        if (this.props.title.length > 15) {
            return this.props.title.substring(0, 13) + "...";
        } else {
            return this.props.title;
        }
    }
}