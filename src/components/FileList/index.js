import React from 'react'
import {Container, FileInfo, Preview} from './styles';
import {CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const FileList = ({files}) => (
    <Container>   
      {files.map(uploadedFile=>(
        <li key={uploadedFile.id}>
            <FileInfo>
                <Preview src={uploadedFile.preview}/>                 
                <div>
                    <strong>{uploadedFile.name}</strong>
                    <span>{uploadedFile.readableSize}
                        {/* <button onClick={()=>{}} >Excluir</button> */}
                    </span>
                </div>
            </FileInfo>
            <div>
                {!uploadedFile.uploaded && !uploadedFile.error  &&(
                    <CircularProgressbar
                    styles={{
                        root:{width:24},
                        path:{stroke:'#7159c1'},                    
                    }}                    
                    strokeWidth={10}
                    value={uploadedFile.progress}              
                    />                    
                )}
                {uploadedFile.progress===100 && <strong>Processando</strong>}
            </div>
        </li>          
      ))}
    </Container>
)

export default FileList;
