import React from 'react';
import { useDispatch} from 'react-redux';
import {changeDataName, changeDataQtd, changeDataStatus, dataRemove, retornaTotal } from './store/contagem';

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
        //verificação para ter apenas 1 setTimeout
        setTimeout(()=>{
            dispatch(changeDataName({nome, id}))
          },6000)        
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
        dispatch(dataRemove({id})) 
        dispatch(retornaTotal())      
    }     

    return (
        <>   
        <td className={"td_bolinha noPrint"}>
            <div className={status==="Não"?"bolinha noconfirm":"bolinha confirm"}></div>
        </td>    
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

        <td className="noPrint"><button onClick={()=>handleChangeStatus(status)}>{status}</button></td>   
        <td className="noPrint"><button onClick={()=>handleClickExcluir(id)}>Excluir</button></td>   
        </>
    )
}


export default Assistencia
