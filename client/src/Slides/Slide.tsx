import React from "react"
import styled from "styled-components"

interface IProps {
    isPrimary?: boolean
    useSecondary?: boolean
}

const Container : any = styled.div`
background-color: #F4EEE6;
top: 0;
left: 0;
position: absolute;
width: 100%;
height: 100%;
transition: 1500ms;
`;

export default class Slide extends React.Component<IProps, {}> {
    render() {
        return (
            <Container>
                {this.props.children}
            </Container>
        )
    }
}