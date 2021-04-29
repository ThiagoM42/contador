import React from 'react';
import { useDispatch} from 'react-redux';
import {BsTrash} from 'react-icons/bs';
import {MdDone, MdDoneAll} from 'react-icons/md';
import {changeDataName, changeDataQtd, changeDataStatus, dataRemove, retornaTotal } from './store/contagem';
import {Button} from 'react-bootstrap';

const Assistencia = ({dados}) => {    
    const id = dados.id
    const [nome, setNome] = React.useState(dados.nome)
    const [qtd, setQtd] = React.useState(dados.qtd)
    const [status, setStatus] = React.useState(dados.status)

    const dispatch = useDispatch();

    function handleChangeNome({target}){ 
        setNome(target.value)
    } 

    function handleOnBlurNome(){ 
        dispatch(changeDataName({nome, id}))     
    }
    
    function handleChangeQtd({target}){
        const qtdAtual=target.value 
        setQtd(target.value)
        dispatch(changeDataQtd({qtdAtual, id}))        
    }
    
    function handleChangeStatus(value){ 
        value = value==="Sim"?"Não":"Sim"       
        setStatus(value)         
        dispatch(changeDataStatus({value, id}))       
    } 

    function handleClickExcluir(id){ 
        const confirm = window.confirm("Tem certeza que deseja excluir?");
        if(confirm){
            dispatch(dataRemove({id})) 
            dispatch(retornaTotal())      
        }
    }     
    
    return (
        <>     
        <td className="noPrint">
            <Button className="p-1 px-2" variant="outline-dark" onClick={()=>handleChangeStatus(status)}>{
                status==="Sim"?<MdDoneAll size={19} style={{cursor:'pointer'}} title="Confirmado"/>:
                <MdDone size={19} style={{cursor:'pointer'}} title="Não confirmado"/>
                }
            </Button></td>   
        <td className={status==="Não"?"noconfirm":"confirm"}>
            <input                               
                name={id} 
                value={nome} 
                type="text"
                onChange={handleChangeNome}    
                onBlur={handleOnBlurNome}        
            />
        </td>        
        <td>
            <input                
                name={id}
                value={qtd}
                type="number"
                min="0"           
                step="1"
                onChange={handleChangeQtd}  
            />
        </td>

        <td><BsTrash style={{ cursor:'pointer'}} size={18} onClick={()=>handleClickExcluir(id)}/></td>
        </>
    )
}


export default Assistencia
