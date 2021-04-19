import React from 'react';
import { useDispatch } from 'react-redux';
import { changeDataName, changeDataQtd, changeDataStatus, retornaTotal } from './store/contagem';


const Input = ({dados}) => {   
     
    const [qtd, setQtd] = React.useState(dados.qtd);
    const [nome, setNome] = React.useState(dados.nome);
    const [status, setStatus] = React.useState(dados.status);

    // const qtd = dados.qtd;
    // const nome = dados.nome;
    // const status = dados.status;    
    
    const dispatch = useDispatch();

    function handleChangeQtd({target}){            
        setQtd(target.value)
        dispatch(retornaTotal());
    }

    function handleChangeNome({target}){        
        // setNome(target.value);    
                   
    }
    function handleOnBlurNome(){
        // setTimeout(()=>
        //     dispatch(changeDataName({}))
        // , 3000
        // ) 
    }
    function handleOnBlurQtd(){
        // dispatch(changeDataQtd({id:dados.id, value:qtd}))            
    }    

    function handleStatus(){    
        // if(status === "Sim"){
        //     setStatus('Não')
        // }else{
        //     setStatus('Sim')
        // }
        // console.log(dados.nome)
        // dispatch(changeDataStatus())
    }
 
    return (
        <>       
        <td >
            <input 
                name={nome} 
                value={nome} 
                type="text"
                // onChange={handleChangeNome}    
                // onBlur={handleOnBlurNome}        
            />
        </td>
        <td>
            <input
                value={qtd}
                type="number"
                onChange={handleChangeQtd}  
                // onBlur={handleOnBlurQtd}             
            />
        </td>

        <td><button onClick={handleStatus}>{status}</button></td>        

        </>
    )
}


export default Input
