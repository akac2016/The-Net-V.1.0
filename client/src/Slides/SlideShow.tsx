import React from "react";
import SlideContainer from "./SlideContainer";
import SlideShowControlOverlay from "./SlideShowControlOverlay";
import SlideShowProgression from "./SlideShowProgression";
import Slide from "./Slide";
import SlideShowControl from "./SlideShowControl";
import SlideWrapper from "./SlideWrapper";

interface IProps {
    children: React.ReactNode
    transitionTime: number   
}

interface IState {
    slides: boolean[]
    slideProgression: boolean[]
    currentIndex: number
}

export default class SlideShow extends React.Component<IProps, IState> {
    constructor(props : IProps) {
        super(props);
        this.state = {
            slides: this.getInitialSlideState(props.children),
            slideProgression: this.getInitialSlideState(props.children),
            currentIndex: this.getCurrentIndex(props.children)
        }
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.displaySlide = this.displaySlide.bind(this);
    }

    public getCurrentIndex(children : React.ReactNode) {
        let index : number | undefined = React.Children
            .toArray(children)
            .filter(element => (element as Slide).props.isPrimary)
            .map((element, i) => i)[0]
        if (index === undefined) {
            return 0;
        } else {
            return index;
        }
    }

    public getInitialSlideState(children : React.ReactNode) {
        return React.Children.map(children, (element) => (element as Slide).props.isPrimary ? true : false);
    }

    public render() {
        if (!this.props.children) {
            return <div className="slide-show"></div>
        }
        return (
            <div className="slide-show">
                <SlideContainer>
                    {React.Children.map(this.props.children, (slide : any, i : number) => {
                        return <SlideWrapper 
                            transitionTime={this.props.transitionTime} 
                            isActive={this.state.slides[i]}>
                            {slide}
                        </SlideWrapper>
                    })}
                </SlideContainer>
                <SlideShowControlOverlay>
                    <SlideShowControl action={this.previous} isLeft={true}></SlideShowControl>
                    <SlideShowControl action={this.next} isLeft={false}></SlideShowControl>
                    <SlideShowProgression
                        displaySlide={this.displaySlide} 
                        slides={this.state.slideProgression}>
                    </SlideShowProgression>
                </SlideShowControlOverlay>
            </div>
        )
    }

    public next() {
        if (this.isOnLastSlide()) {
            this.displaySlide(0);
        } else {
            this.displaySlide(this.state.currentIndex + 1);
        }
    }

    public isOnLastSlide() {
        return this.state.currentIndex === this.state.slides.length - 1;
    }

    public previous() {
        if (this.isOnFirstSlide()) {
            this.displaySlide(this.state.slides.length - 1);
        } else {
            this.displaySlide(this.state.currentIndex - 1);
        }
    }

    public isOnFirstSlide() {
        return this.state.currentIndex  === 0;
    }

    public displaySlide(slideNumber : number) {
        this.setState({
            slides: this.clearSlides(),
            slideProgression: this.getSlideProgression(slideNumber),
            currentIndex: slideNumber
        }, () => {
            setTimeout(() => {
                this.setState({
                    slides: this.getSlides(),
                })
            }, this.props.transitionTime)
        });
    }

    public clearSlides() {
        return this.state.slides.map((slide, i) => false);
    }

    public getSlideProgression(slideNumber : number) {
        return this.state.slideProgression.map((slide, i) => i === slideNumber);
    }
    
    public getSlides() {
        return this.state.slides.map((slide, i) => i === this.state.currentIndex);
    }
}