import React, { ChangeEvent } from "react";
import styled from "styled-components";

const Input = styled.input`
border: none;
border-bottom: 4px solid black;
font-size: 36px;
padding: 10px;
width: 200px;
outline: none;
background-color: transparent;
transition: all 0.25s ease;
box-sizing: border-box;

&:hover {
    cursor: pointer;
    transform: scale(1.01);
}

&:focus {
    transform: scale(1.01);
}
`;

interface IProps {
    value: string;
    update: (title: string) => void;
}

export default class FormInput extends React.Component<IProps, {}> {
    public render() {
        return <Input value={this.props.value} onChange={this.handleChange.bind(this)} placeholder="Title..." />
    }

    public handleChange(event : ChangeEvent) {
        this.props.update((event.target as any).value);
    }
}