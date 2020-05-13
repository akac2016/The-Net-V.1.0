import React from "react"
import ProgressionDot from "./ProgressionDot"
import styled from "styled-components";

const ProgressionContainer : any = styled.div`
display: flex;
justify-content: center;
width: 100%;
position: absolute;
bottom: 50px;
left: 50%;
margin: 0 -50%;

@media (min-width: 800px) {
    width: 90%;
    margin: 0 -45%;
}
`;

interface IProps {
    slides: boolean[]
    displaySlide : (slideIndex : number) => void
}

export default class SlideShowProgression extends React.Component<IProps, {}> {
    constructor(props: IProps) {
        super(props);
        this.getSelector = this.getSelector.bind(this);
    }

    public render() {
        return (
            <ProgressionContainer>
                {
                    this.props.slides.map((status, i) => {
                        return <ProgressionDot 
                            key={i} 
                            selector={this.getSelector(i)} 
                            isActive={status}/>
                    })
                }
            </ProgressionContainer>
        )
    }

    public getSelector(i : number) {
        return () => {
            this.props.displaySlide(i);
        }
    }
}