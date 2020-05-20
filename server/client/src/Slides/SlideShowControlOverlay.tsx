import React from "react";
import Styled from "styled-components"

const Overlay : any = Styled.div`
z-index: 20;
width: 100%;
height: 0;
margin: 0 auto;
bottom: 0;
left: 0;
position: absolute;
`

const Container : any = Styled.div`
width: 100%;
height: 0;
max-width: 800px;
margin: 0 auto;
position: relative;
`;

export default class SlideShowControlOverlay extends React.Component<{}, {}> {
    public render() {
        return (
            <Overlay>
                <Container>
                    {this.props.children}
                </Container>
            </Overlay>
        )
    }
}