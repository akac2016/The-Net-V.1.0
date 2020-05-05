import React from "react";
import Text from "../Theme/Text";
import CSSAnimator from "../Animation/CSSAnimator";
import { TextFocusIn } from "../Animation/Animations";
import DefaultPrinciples from "./PrinciplesText";

interface IProps {
    keyword: string
}

export default class PrincipleText extends React.Component<IProps, {}> {
    public render() {
        return (
            <CSSAnimator animation={TextFocusIn(1, 0)}>
                <Text>
                    {this.getTextComponents()}
                </Text>  
            </CSSAnimator>        
        )
    }

    public getTextComponents() {
        return this.getWords().map((word : string) => {
            return this.getComponent(word);
        })
    }

    public getComponent(word : string) {
        return word === this.props.keyword ? <b key={word}>{word} </b> : `${word} `;
    }

    public getWords() : string[] {
        return (DefaultPrinciples.textMapping.get(this.props.keyword.toLowerCase()) as string).split(" ");
    }
}