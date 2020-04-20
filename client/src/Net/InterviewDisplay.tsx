import React from "react";
import "./InterviewDisplay.css";

interface IProps {
    title: string;
    text: string;
    closeHandler: () => void;
    imageSource?: string;
}

export default class InterviewDisplay extends React.Component<IProps, {}> {
    public render() {
        return (
            <div className="interview-modal">
                <div className="interview-container">
                    <button onClick={this.props.closeHandler}>X</button>
                    <h1>{this.props.title}</h1>
                    { this.props.imageSource ? <img src={this.props.imageSource} alt="Interview Depiction"/> : null}
                    <p>{this.props.text}</p>
                </div>
            </div>
        )
    }
}