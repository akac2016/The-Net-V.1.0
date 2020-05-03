import React from "react";

interface IProps {
    total: number;
    current: number;
}

export default class TutorialProgress extends React.Component<IProps, {}> {
    public render() {
        return (
            <span>{this.props.current}/{this.props.total}</span>
        )
    }
}