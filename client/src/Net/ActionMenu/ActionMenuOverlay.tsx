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
left: -70px;
top: 50%;
`;

const AboutContainer : any = styled.div`
width: 100%;
height: auto;
min-height: 100px;
bottom: 0;
position: absolute;
left: 0;
`;

const AboutPanel : any = styled.div`
box-sizing: border-box;
border-top: 3px solid black;
text-align: left;
padding: 5px;
margin: 5px;
margin-left: 15px;

@media all and (min-width; 800px) {
    padding: 10px;
    margin: 10px;
}

`;

const AboutList : any = styled.ul`
text-align: left;
list-style: none;
line-height: 2.0em;
`;

const ProfileLink : any = styled.a`
color: black;
transition: all 0.5s ease;
display: block;

&:hover {
    color: blue;
    transform: scale(1.1);
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
                        <AboutContainer>
                            <AboutPanel>
                                Created By:
                                <AboutList>
                                    <li><ProfileLink href="https://www.linkedin.com/in/ali-kapadia/">Ali Kapadia</ProfileLink ></li>
                                </AboutList>
                            </AboutPanel>
                            <AboutPanel>
                                Developed By:
                                <AboutList>
                                    <li><ProfileLink href="https://www.linkedin.com/in/evancoulson/"><b>Frontend:</b> Evan Coulson</ProfileLink ></li>
                                    <li><ProfileLink href="https://www.linkedin.com/in/samuelnunoo/"><b>Backend:</b> Samuel Nunoo</ProfileLink ></li>
                                </AboutList>
                            </AboutPanel>
                            <AboutPanel>
                                Desgined By:
                                <AboutList>
                                    <li><ProfileLink href="https://www.linkedin.com/in/hannah-a-586758161/">Hannah Avalos</ProfileLink ></li>
                                    <li><ProfileLink href="https://www.linkedin.com/in/salih-erdal-739b53106/">Salih Erdal</ProfileLink ></li>
                                </AboutList>
                            </AboutPanel>
                        </AboutContainer>
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