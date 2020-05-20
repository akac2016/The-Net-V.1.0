import React from "react";
import SlideShow from "../Slides/SlideShow";
import PrincipleSlide from "./PrincipleSlide";
import PrincipleButton from "./PrincipleButton";
import DefaultPrinciples from "./PrinciplesText";
import FadeMountTransition from "../Animation/FadeMountTransition";

interface IProps {
    isShowing: boolean;
    transitionDuration: number;
    close: () => void;
}

interface IState {
    hasClosed: boolean
}

export default class PrincipleSlideShow extends React.Component<IProps, IState> {
    constructor(props : IProps) {
        super(props);
        this.state = {
            hasClosed: false
        }
    } 

    public componentWillReceiveProps(props: IProps) {
        if (!props.isShowing) {
            this.setState({
                hasClosed: true
            })
        }
    }

    public render() {
        return (
            <FadeMountTransition transitionDuration={500} isShowing={this.props.isShowing} unMountOnExit>
                <SlideShow transitionDuration={this.props.transitionDuration}>
                    {this.getSlides()}
                </SlideShow>
            </FadeMountTransition>
        )
    }

    public getSlides() {
        return DefaultPrinciples.keywords.map((keyword : string, i : number) => 
            <PrincipleSlide key={i} 
                isPrimary={this.isPrimary(i)} 
                useSecondary={this.isLastSlide(i)} 
                principle={keyword}>
                {this.getChildren(i)}
            </PrincipleSlide>
        );
    }

    public isPrimary(i : number) {
        return i === 0; 
    }

    public getChildren(i : number) {
        if (this.isLastSlide(i)) {
            return <PrincipleButton close={this.props.close}></PrincipleButton>
        }
        return null;
    }

    public isLastSlide(i : number) {
        return i === DefaultPrinciples.keywords.length - 1;
    }
}