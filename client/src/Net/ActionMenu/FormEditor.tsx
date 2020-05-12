import React from "react";
import { Editor, EditorState, RichUtils, DraftEditorCommand, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";
import styled from "styled-components";

interface IProps {
    update: (contentState : ContentState) => void;
}

interface IState {
    editorState: EditorState
}

const Container = styled.div`
width: 80%;
margin 25px auto;
border: 4px solid black;
padding: 25px;
height: 50%;
transition: all 0.25s ease;
box-sizing: border-box;
overflow: scroll;

&:hover {
    cursor: text;
    transform: scale(1.01);
    box-shadow: 0px 0px 5px 5px rgba(0,0,0,0.3);
}
`;

export default class FormEditor extends React.Component<IProps, IState> {
    constructor(props : any) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        }
        this.onChange = this.onChange.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    public render() {
        return (
            <Container>
                <Editor
                    placeholder="Type your story here..." 
                    handleKeyCommand={this.handleKeyCommand}
                    editorState={this.state.editorState} 
                    onChange={this.onChange}/>
            </Container>
        )
    }

    public onChange(editorState : EditorState) {
        this.setState({
            editorState
        }, () => {
            this.props.update(this.state.editorState.getCurrentContent());
        });
    }

    public handleKeyCommand(command : DraftEditorCommand, editorState : EditorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState)
            return "handled";
        }
        return "not-handled"
    }
}