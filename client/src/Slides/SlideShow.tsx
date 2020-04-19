import React, { Children, ReactNode } from "react";
import SlideContainer from "./SlideContainer";
import SlideShowControlOverlay from "./SlideShowControlOverlay";
import SlideShowProgression from "./SlideShowProgression";
import Slide from "./Slide";
import SlideShowControl from "./SlideShowControl";
import SlideWrapper from "./SlideWrapper";

interface IProps {
    children: React.ReactNode   
}

interface IState {
    slides: boolean[]
    currentIndex: number
}

export default class SlideShow extends React.Component<IProps, IState> {
    constructor(props : IProps) {
        super(props);
        let currentIndex : number = -1;
        React.Children.forEach(props.children, (element, i) => {
            let slide : Slide = element as Slide;
            if (slide.props.isPrimary) {
                currentIndex = i;
            }
        });
        if (currentIndex === -1) {
            throw new Error("A primary slide must be designated")
        }
        this.state = {
            slides: React.Children.map(props.children, (element) => {
                let slide : Slide = element as Slide;
                return slide.props.isPrimary ? true : false
            }),
            currentIndex: currentIndex
        }
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.displaySlide = this.displaySlide.bind(this);
    }

    public render() {
        if (!this.props.children) {
            return <div className="slide-show"></div>
        }
        return (
            <div className="slide-show">
                <SlideContainer>
                    {React.Children.map(this.props.children, (slide : any, i : number) => {
                        return <SlideWrapper isActive={this.state.slides[i]}>{slide}</SlideWrapper>
                    })}
                </SlideContainer>
                <SlideShowControlOverlay>
                    <SlideShowControl action={this.previous} isLeft={true}></SlideShowControl>
                    <SlideShowControl action={this.next} isLeft={false}></SlideShowControl>
                    <SlideShowProgression
                        displaySlide={this.displaySlide} 
                        slides={this.state.slides}>
                    </SlideShowProgression>
                </SlideShowControlOverlay>
            </div>
        )
    }

    public next() {
        let currentIndex : number = this.state.currentIndex + 1
        if (currentIndex === this.state.slides.length) {
            currentIndex = 0;
        }
        this.setState({
            slides: this.state.slides.map((slide, i) => false),
            currentIndex: currentIndex
        }, () => {
            setTimeout(() => {
                this.setState({
                    slides: this.state.slides.map((slide, i) => i === this.state.currentIndex),
                })
            },1500)
        });
    }

    public previous() {
        let currentIndex : number = this.state.currentIndex - 1
        if (currentIndex === -1) {
            currentIndex = this.state.slides.length - 1;
        }
        this.setState({
            slides: this.state.slides.map((slide, i) => false),
            currentIndex: currentIndex
        }, () => {
            setTimeout(() => {
                this.setState({
                    slides: this.state.slides.map((slide, i) => i === this.state.currentIndex),
                })
            },1500)
        });
    }

    public displaySlide(slideNumber : number) {
        this.setState({
            slides: this.state.slides.map((slide, i) => false),
            currentIndex: slideNumber
        }, () => {
            setTimeout(() => {
                this.setState({
                    slides: this.state.slides.map((slide, i) => i === this.state.currentIndex),
                })
            },1500)
        });
    }
}