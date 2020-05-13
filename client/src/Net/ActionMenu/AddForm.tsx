import React from "react";
import styled from "styled-components";
import "../../Animation/Animations.css";
import slideTheme from "../../Theme/SlideTheme";
import FormInput from "./FormInput";
import Button from "../../Theme/Button";
import FormEditor from "./FormEditor";
import FormImageUploader from "./ImageUploader";
import { ContentState } from "draft-js";

interface IProps {
    isShowing: boolean,
    close: () => void;
}

const Overlay : any = styled.div`;
position: absolute;
top: -100vh;
left: 0;
width: 100vw;
height: 100vh;
background-color: rgba(0,0,0,0.7);
z-index: 5;
animation: ${(props : IProps) => props.isShowing ? 
    "form-slide-down 0.25s linear 0s 1 both" : 
    "form-slide-up 0.25s linear 0s 1 both"}
`;

const Modal : any = styled.div`
position: relative;
width: 80%;
height: 80%;
max-height: 80%;
margin: 5% auto;
background-color: ${slideTheme.colors.background.main};
overflow: scroll;
padding: 25px;
`;

const Header : any = styled.h1`
font-size:36px;
padding: 25px;
`;

const CloseContainer : any = styled.div`
position: absolute;
right: 0;
top: 0;
`;

interface IState {
    pictures: any[],
    title: string,
    text: string
}

export default class AddForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            pictures: [],
            title: "",
            text: ""
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handlePictures = this.handlePictures.bind(this);
        this.submit = this.submit.bind(this);
    }

    public render() {
        return (
            <Overlay isShowing={this.props.isShowing}>
                <Modal>
                    <CloseContainer>
                        <Button onClick={this.props.close} textColor="white" backgroundColor="black">X</Button>
                    </CloseContainer>
                    <Header>Add Your Self To The Net</Header>
                    <FormInput value={this.state.title} update={this.handleTitleChange}/>
                    <FormEditor update={this.handleTextChange}/>
                    <FormImageUploader update={this.handlePictures}/>
                    <Button onClick={this.submit} textColor="white" backgroundColor="black">Submit</Button>
                </Modal>
            </Overlay>
        )
    }

    public submit() {
        console.log(this.state);
    }

    public handlePictures(pictures: any[]) {
        this.setState({
            pictures: pictures
        })
    }

    public handleTitleChange(title: string) {
        this.setState({
            title: title
        });
    }

    public handleTextChange(contentState : ContentState) {
        this.setState({
            text: contentState.getPlainText()
        })
    }
}