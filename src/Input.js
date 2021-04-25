import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import Assistencia from './Assistencia';
import {Container} from './styles';
import {MdAdd, MdDone, MdDoneAll, MdList } from 'react-icons/md';
import {dataCreate} from './store/contagem';
import { v4 as uuidv4 } from 'uuid';
import {CopyToClipboard} from 'react-copy-to-clipboard';

// import Modal from './components/Modal';
import {Modal, Button, ListGroup} from 'react-bootstrap';

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
    const [modal, setModal] = React.useState({"dados":dados.map(d=>d.nome)});
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);

    const dispatch = useDispatch();

    //##################################################################
    function handleClickAdd() {    
        dispatch(dataCreate())
    }
    
    function handleClickNaoConfirmados() {    
            let dados_ =  dados
                    .filter(d=>d.status==="Não")
                    .map(d=>(d.nome).padEnd(30, ".")+"  qtd: ??")    
            const new_dados = {"title":"Não confirmados", "dados":dados_};
            setModal(new_dados);
            dadosConfirmacao()         
    }
    
    function handleClickConfirmados() {
        let dados_ =  dados
            .filter(d=>d.status==="Sim")
            .map(d=>(d.nome).padEnd(30, ".")+"  qtd:"+d.qtd)      
        const new_dados = {"title":"Confirmados", "dados":dados_};
        setModal(new_dados);
        dadosConfirmacao()
    }  
    
    function handleClickTodos() {
        let dados_ =  dados                        
                    .map(d=>(d.nome).padEnd(30, ".")+"   qtd:"+d.qtd) 
        const total =  dados.reduce((a,b)=>a+(parseInt(b.qtd)),0)          
        dados_.push("*Total: "+total+"*")
        const new_dados = {"title":"Todos", "dados":dados_};
        setModal(new_dados);
        dadosConfirmacao()
    }  

    function dadosConfirmacao(){            
        setShow(true);
    }

    function handleCopy(e){            
        setShow(false);                
    }
  
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

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modal && modal.title}</Modal.Title>
                </Modal.Header>        
                    <Modal.Body>
                            <ListGroup variant="flush">
                                {modal && modal.dados.map((value)=>(
                                    <ListGroup.Item  key={uuidv4()}>{value}</ListGroup.Item>
                                 ))}
                            </ListGroup>
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>

                    <CopyToClipboard text={modal.dados.map(d=>d+"\n\n").join().replaceAll(",","")} onCopy={handleCopy}>
                        <Button variant="primary">
                            Copiar
                        </Button>
                    </CopyToClipboard>
                </Modal.Footer>
            </Modal>

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
