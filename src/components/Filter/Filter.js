import React from 'react';
import {Container} from './styles.js'
import { useDispatch, useSelector } from 'react-redux';
import { changeFilters, selectUniqueStatus, addLocalstorage, retornaTotal} from '../../store/contagem';
import api from '../../services/api';
import {v4 } from 'uuid';
import filesize from 'filesize';
import Upload from '../Upload';
import FileList from '../FileList';

import {Card} from 'react-bootstrap';

const Filter = () => {
  const status = useSelector(selectUniqueStatus);  
  const [search, setSearch] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState([]);
  const [uploadedFilesState, setUploadedFilesState] = React.useState({})
  const dispatch = useDispatch();


  React.useEffect(() => {
    //não mandou como objeto pois status é um array
    dispatch(changeFilters({ name: 'status', value:selectedStatus }));
  }, [selectedStatus, dispatch]);

  React.useEffect(()=>{
    dispatch(changeFilters({ name: 'nome', value:search }));
  }, [search, dispatch])

  function handleChangeStatus({ target }) {
    if (target.checked) {
    setSelectedStatus([...selectedStatus, target.value]);
    } else {
    //retornar o array atual exceto o elemento do evento
    setSelectedStatus(
        selectedStatus.filter((status) => status !== target.value),
    );
    }
}
//################################ START UPLOAD ################################
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
//################################ END UPLOAD ################################


  return (
    <Container>
      <Card>
        <Card.Header>Upload</Card.Header>
          <Card.Body>
            <Upload className="noPrint mx-0 p-0" onUpload={handleUpload}/>
            {!!uploadedFilesState.length &&(
                <FileList className="noPrint" files={uploadedFilesState}/>
            )}        
          </Card.Body>
      </Card>

      <Card>
        <Card.Header>Filtro</Card.Header>
          <Card.Body>
            <div className="mb-3"> 
              <label style={{marginBottom:5, display:'block'}}>Pesquisar por nome:</label>     
              <input
                type="text"
                value={search}
                onChange={({ target }) => setSearch(target.value)}
                placeholder="Pesquisar por nome"
              />  
            </div>  
            
            <div className="mt-3">
              <label>Confirmados:</label>
              {status.map((value) => (
                <label key={value}>
                  <input
                    type="checkbox"
                    value={value}              
                    onChange={handleChangeStatus}
                  />
                  {value}
                </label>
              ))}        
            </div>  
          </Card.Body>
      </Card>
    </Container>
  );
};

export default Filter;
