import React from "react";
import ImageUploader from 'react-images-upload';
import "./ImageUploader.css";

interface IProps {
    update: (pictures: any[]) => void;
}

interface IState {
    pictures: any[]
}

export default class FormImageUploader extends React.Component<IProps, IState> {
    constructor(props : IProps) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture : any) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        }, () => {
            this.props.update(this.state.pictures);
        });
    }

    public render() {
        return <ImageUploader
                    withPreview={true}
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={this.onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />
    }
}