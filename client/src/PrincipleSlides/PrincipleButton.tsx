import React from "react"
import Button from "../Theme/Button"
import slideTheme from "../Theme/SlideTheme"

interface IProps {
    close: () => void;
}

export default class PrincipleButton extends React.Component<IProps, {}> {
    public render() {
        return (
            <Button
                onClick={this.props.close}
                backgroundColor={slideTheme.colors.background.secondary} 
                textColor={"white"}>
                    Enter The Net
            </Button>
        )
    }
}