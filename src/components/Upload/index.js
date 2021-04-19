import { Component } from "react";
import Dropzone from 'react-dropzone';
import {DropContainer, UploadMessage} from './styles';
import api from '../../services/api'

export default class Upload extends Component{
    renderDragMessage = (isDragActive, isDragReject) =>{
        if(!isDragActive){
            return <UploadMessage>Arraste apenas 1 arquivo aqui...</UploadMessage>
        }if(isDragReject){
            return <UploadMessage type="error">Arquivo não suportado ou mais de um arquivo</UploadMessage> 
        }
        return <UploadMessage type="success">Solte os arquivos aqui.</UploadMessage>
    }

    updateFile = (id, data)=>{
        this.setState({
            uploadedFiles:this.state.uploadedFiles
            .map(uploadedFile=>{return id === uploadedFile.id? {...uploadedFile, ...data}:uploadedFile
            })
        })
    }

    processUpload = (uploadedFile)=>{
        const data = new FormData();
        data.append('file', uploadedFile.file, uploadedFile.name);
        api.post('/posts', data, {
            onUploadProgress: e=>{
                const progress = parseInt(Math.round((e.loaded*100)/e.total));
                this.updateFile(uploadedFile.id, {
                    progress
                })
            }
        })
    }    
    render(){
        const {onUpload} = this.props;        

        return(
            <Dropzone accept="image/*" onDropAccepted={onUpload} multiple={false}>
                {({getRootProps, getInputProps, isDragActive, isDragReject}) =>
                (<DropContainer
                    {...getRootProps()}
                    isDragActive={isDragActive}
                    isDragReject={isDragReject}
                >
                    <input {...getInputProps()}/>
                    {this.renderDragMessage(isDragActive, isDragReject)}
                </DropContainer>
                    )}
            </Dropzone>
        )
    }
}