import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from "styled-components";
import './SlideAnimations.css';

const ControlArrow : any = styled.div`
position: absolute;
top: -50vh;
background-color: transparent;
${(props : IProps) => {
    return props.isLeft ? `left: 15px;` : 'right: 15px;';
}}
&:hover {
    cursor: pointer;
    -webkit-animation: scale-up-center 0.4s cubic-bezier(0.785, 0.135, 0.150, 0.860) both;
    animation: scale-up-center 0.4s cubic-bezier(0.785, 0.135, 0.150, 0.860) both;
}

@media (min-width: 800px) {
    top: auto;
    bottom: 55px;
}
`;

interface IProps {
    isLeft: boolean;
    action: () => void;
}

export default class SlideShowControl extends React.Component<IProps, {}> {
    public render() {
        return (
            <ControlArrow isLeft={this.props.isLeft} onClick={this.props.action}>
                <FontAwesomeIcon size={"3x"} icon={this.getIcon()}/>
            </ControlArrow>
        )
    }

    public getIcon() {
        return this.props.isLeft ? "chevron-left" : "chevron-right";
    }
}