import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import Assistencia from './Assistencia';
import {Container} from './styles';
import {MdAdd, MdDone, MdDoneAll, MdList } from 'react-icons/md';
import {dataCreate} from './store/contagem';
import Modal from './components/Modal';

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
    //   .sort(function(a, b){
    //     return (a.nome.trim().toLowerCase() > b.nome.trim().toLowerCase())?1
    //     :((b.nome.trim().toLowerCase() > a.nome.trim().toLowerCase())?-1
    //     :0);
    //   })
  };

const Input = () => {    
    const data = useSelector(filterDados);   
    const dados = useSelector(({contagem})=>contagem.dadosObj)
    const [modal, setModal] = React.useState(null);
    const dispatch = useDispatch();

    //##################################################################
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
    //##################################################################
    return (
        <Container> 
            <div style={{display:'flex', justifyContent: 'space-between', marginLeft:'2.4rem', paddingBottom:'1.4rem'}}>
                    <MdAdd style={{cursor:'pointer'}} size={24} onClick={handleClickAdd}/>
                <div style={{marginRight:'16rem'}}>
                    <MdDone style={{cursor:'pointer'}} size={24} onClick={handleClickNaoConfirmados}/>
                    <MdDoneAll style={{cursor:'pointer'}} size={24} onClick={handleClickConfirmados}/>
                    <MdList style={{cursor:'pointer'}} size={24} onClick={handleClickTodos}/>
                </div>
            </div>  
            {modal && <Modal dados={modal}/>}                        
            <table>
                <thead  style={{marginBottom:'3rem'}}>
                <tr>
                    <th className="noPrint">Status</th>
                    <th>Nome</th>
                    <th>Qtd</th>
                    <th className="noPrint">Confirmado?</th>
                    <th className="noPrint">Exluir?</th>
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
        </Container>
    )
}

export default Input
