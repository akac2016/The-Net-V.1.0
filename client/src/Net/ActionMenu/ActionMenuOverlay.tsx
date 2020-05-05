import React from "react";
import styled from "styled-components";
import "../../Animation/Animations.css";
import Button from "../../Theme/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import slideTheme from "../../Theme/SlideTheme";
import AddForm from "./AddForm";

const Overlay : any = styled.div`
position: absolute;
max-width: 250px;
width: 100%;
height: 100vh;
right: -250px;
animation: ${(props : any) => props.isShowing ? 
                "slide-left 0.25s linear 0s 1 both" : 
                "slide-right 0.25s linear 0s 1 both"}
`;

const Container : any = styled.div`
position: relative;
height: 100vh;
width: 100%;
padding: 50px 10px;
box-sizing: border-box;
background-color: ${slideTheme.colors.background.main};
`;

const ToggleContainer : any = styled.div`
position: absolute;
left: -80px;
top: 50%;
margin-top: -75px;
display: none;
@media screen and (min-width: 850px) {
    display: block;
}
`;

interface IState {
    isShowing: boolean
    isShowingAddForm: boolean;
}

export default class ActionMenuOverlay extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isShowing: false,
            isShowingAddForm: false
        }
        this.toggleActionMenu = this.toggleActionMenu.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
    }

    public render() {
        return (
            <>
                <AddForm close={this.toggleForm} isShowing={this.state.isShowingAddForm}/>
                <Overlay isShowing={this.state.isShowing}>
                    <Container>
                        <ToggleContainer>
                            <Button onClick={this.toggleActionMenu} textColor="white" backgroundColor="black">
                                <FontAwesomeIcon icon={this.getIcon()}/>
                            </Button>
                        </ToggleContainer>
                        <Button onClick={this.toggleForm} textColor="white" backgroundColor="black">Add Your Self To The Net</Button>
                    </Container>
                </Overlay>
            </>
        )
    }

    public getIcon() {
        if (!this.state.isShowing) {
            return "chevron-left";
        }
        return "chevron-right";
    }

    public toggleActionMenu() {
        this.setState({
            isShowing: !this.state.isShowing
        })
    }

    public toggleForm() {
        this.setState({
            isShowingAddForm: !this.state.isShowingAddForm
        })
    }
}