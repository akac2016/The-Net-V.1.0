import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from "styled-components";
import './SlideAnimations.css';

const ControlArrow : any = styled.div`
position: absolute;
bottom: 55px;
${(props : IProps) => {
    return props.isLeft ? `left: 15px;` : 'right: 15px;';
}}
&:hover {
    cursor: pointer;
    -webkit-animation: bounce 1s ease both;
    animation: bounce 1s ease both;
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
                <FontAwesomeIcon size={"2x"} icon={this.getIcon()}/>
            </ControlArrow>
        )
    }

    public getIcon() {
        return this.props.isLeft ? "chevron-left" : "chevron-right";
    }
}