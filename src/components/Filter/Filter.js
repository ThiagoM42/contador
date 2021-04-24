import React from 'react';
import Modal from '../Modal';
import {Container} from './styles.js'
import { useDispatch, useSelector } from 'react-redux';
import { changeFilters, selectUniqueStatus, dataCreate, addLocalstorage, retornaTotal} from '../../store/contagem';
import api from '../../services/api';
import {v4 } from 'uuid';
import filesize from 'filesize';
import {MdAdd, MdDone, MdDoneAll, MdList } from 'react-icons/md';
import Upload from '../Upload';
import FileList from '../FileList';

const Filter = () => {
  const [modal, setModal] = React.useState(null);
  const dados = useSelector(({contagem})=>contagem.dadosObj)
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
  function handleClickAdd() {    
    dispatch(dataCreate())
  }

  function handleClickNaoConfirmados() {    
    const new_dados =  dados
                  .filter(d=>d.status==="Não")
                  .map(d=>(d.nome).padEnd(30, ".")+"  qtd: ??")    
    dadosConfirmacao(new_dados)           
  }

  function handleClickTodos() {
    const new_dados =  dados                        
                  .map(d=>(d.nome).padEnd(30, ".")+"   qtd:"+d.qtd) 
    const total =  dados.reduce((a,b)=>a+(parseInt(b.qtd)),0)          
    new_dados.push("*Total: "+total+"*")
    dadosConfirmacao(new_dados)
  }  

  function handleClickConfirmados() {
    const new_dados =  dados
                  .filter(d=>d.status==="Sim")
                  .map(d=>(d.nome).padEnd(30, ".")+"  qtd:"+d.qtd)      
    dadosConfirmacao(new_dados)
  }  

  function dadosConfirmacao(new_dados){
    if(!modal){
      setModal(new_dados)     
    }else{
      setModal(null)     
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

      <Upload className="noPrint" onUpload={handleUpload}/>
      {!!uploadedFilesState.length &&(
          <FileList className="noPrint" files={uploadedFilesState}/>
      )}        

      <div> 
        <label style={{marginBottom:5, display:'block'}}>Pesquisar por nome:</label>     
        <input
          type="text"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Pesquisar por nome"
        />  
      </div>  

      
      <div>
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

      <div style={{display:'flex', justifyContent: 'space-between'}}>
        <MdAdd style={{cursor:'pointer'}} size={24} onClick={handleClickAdd}/>
        <MdDone style={{cursor:'pointer'}} size={24} onClick={handleClickNaoConfirmados}/>
        <MdDoneAll style={{cursor:'pointer'}} size={24} onClick={handleClickConfirmados}/>
        <MdList style={{cursor:'pointer'}} size={24} onClick={handleClickTodos}/>
      </div>

      <br/>
    {modal && <Modal dados={modal}/>}
    </Container>
  );
};

// const Filter = () =>{return <></>}
export default Filter;
