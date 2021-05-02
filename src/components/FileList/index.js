import React from 'react'
import {Container, FileInfo, Preview} from './styles';
import {Spinner} from 'react-bootstrap';

const FileList = ({files}) => (
    <Container>   
      {files.map(uploadedFile=>(
        <li key={uploadedFile.id}>
            <FileInfo>
                <Preview src={uploadedFile.preview}/>                 
                <div>                    
                    <span className="mx-2">{uploadedFile.readableSize}</span>
                </div>
            </FileInfo>
            <div>   
                
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>                     
             
                {/* {uploadedFile.progress===100 && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>                     
                ) }             */}
            </div>
        </li>          
      ))}
    </Container>
)

export default FileList;
