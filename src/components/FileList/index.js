import React from 'react'
import {Container, FileInfo, Preview} from './styles';
import {Spinner} from 'react-bootstrap';
import 'react-circular-progressbar/dist/styles.css';

const FileList = ({files}) => (
    <Container>   
      {files.map(uploadedFile=>(
        <li key={uploadedFile.id}>
            <FileInfo>
                <Preview src={uploadedFile.preview}/>                 
                <div>
                    {/* <strong>{uploadedFile.name}</strong> */}
                    <span className="mx-2">{uploadedFile.readableSize}</span>
                </div>
            </FileInfo>
            <div>              
                {uploadedFile.progress===100 && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>                     
                ) }            
            </div>
        </li>          
      ))}
    </Container>
)

export default FileList;
