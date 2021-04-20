import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addLocalstorage, retornaTotal} from './store/contagem';
import Assistencia from './Assistencia';
import Upload from './components/Upload';
import FileList from './components/FileList';
import api from './services/api';
import {v4 } from 'uuid';
import filesize from 'filesize';

//lembrar que o 1° parametro é filters.status o 2° parametro 
//é o data oq tah chamando
const filterStatus = (status) => (contagem) =>{
    return !status.length || status.includes(contagem.status);    
}

const filterNomes = (nome) => (contagem) =>
  !nome.length || contagem.nome.toLowerCase().match(nome.toLowerCase())
  
const filterDados = ({ contagem }) => {    
    const {dadosObj, filters} = contagem;    
    return dadosObj
      .filter(filterStatus(filters.status))
      .filter(filterNomes(filters.nome))
      .sort(function(a, b){
        return (a.nome.trim().toLowerCase() > b.nome.trim().toLowerCase())?1
        :((b.nome.trim().toLowerCase() > a.nome.trim().toLowerCase())?-1
        :0);
      })
  };

const Input = () => {    
    const data = useSelector(filterDados);
    const [uploadedFilesState, setUploadedFilesState] = React.useState({})
    const dispatch = useDispatch();

    const handleUpload = files =>{        
        const uploadedFiles = files.map(
            file=>({
                file,
                id:v4(),
                name:file.name,
                readableSize:filesize(file.size),
                preview: URL.createObjectURL(file),
                progress:0,
                uploaded:false,
                error:false,                 
            })
        )
        setUploadedFilesState([...uploadedFiles])        
        uploadedFiles.forEach(e=>processUpload(e))
    }

    const updateFile = (id, data)=>{
        setUploadedFilesState(uploadedFilesState=>uploadedFilesState.map(
          uploadedFile=>id===uploadedFile.id?{...uploadedFile, ...data}:uploadedFile 
        ))                        
    }

    const processUpload = async (uploadedFile) =>{
        const data =  new FormData();
        data.append('file', uploadedFile.file, uploadedFile.name);
        const dadosApi = await api.post('post', data,{
                onUploadProgress:e=>{
                    const progress = parseInt(Math.round((e.loaded*100)/e.total));
                    updateFile(uploadedFile.id, {
                        progress
                    })
                }
            })
        //aqui add no local storage;           
        dispatch(addLocalstorage({ dados:dadosApi.data.participantes}));
        setUploadedFilesState([]);
    }

    React.useEffect(()=>{
        //MELHORAR ESSA PARTE DO CÓDIGO
        if(uploadedFilesState){
            dispatch(retornaTotal())
        }
    },[uploadedFilesState, dispatch])

    return (
        <>     
            <Upload onUpload={handleUpload}/>
            {!!uploadedFilesState.length &&(
                <FileList files={uploadedFilesState}/>
            )}            
            <table>
                <thead>
                <tr>
                    <th>Status</th>
                    <th>Nome</th>
                    <th>Qtd</th>
                    <th>Confirmado?</th>
                    <th>Exluir?</th>
                </tr>
                </thead>
                <tbody>
                {data.map((value) => (            
                    <tr key={value.id}>
                        <Assistencia dados={{...value}}/>
                    </tr>                    
                ))}
                </tbody>
            </table>                        
        </>
    )
}

export default Input
