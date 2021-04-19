import React from 'react';
import Modal from './components/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilters, selectUniqueStatus, dataCreate} from './store/contagem';

const Filter = () => {
  const [modal, setModal] = React.useState(null);
  const dados = useSelector(({contagem})=>contagem.dadosObj)
  const status = useSelector(selectUniqueStatus);  
  const [search, setSearch] = React.useState('');
  const [selectedStatus, setSelectedStatus] = React.useState([]);
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
                  .filter(d=>d.qtd!==0)                
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

  return (
    <div>
      <div style={{display:"flex"}}>
      <label>Nome:</label>
        <input
          type="text"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Pesquisar por nome"
        />  
      </div>  
      <br/>

      <div style={{display:"flex", width:"100%", justifyContent:"center"}}>
        <button onClick={handleClickAdd}>Add</button>{' '}{' '}{' '}
        <button onClick={handleClickNaoConfirmados}>Não Confirmados</button>{' '}{' '}{' '}
        <button onClick={handleClickConfirmados}>Confirmados</button>{' '}{' '}{' '}
        <button onClick={handleClickTodos}>Todos</button>
      </div>

      <br/>
      <div style={{display:"flex"}}>
        <label>Confirmados:</label>
        {status.map((value) => (
          <label key={value}>
            <input
              type="checkbox"
              value={value}
              //checked={handleChecked(value)}
              onChange={handleChangeStatus}
            />
            {value}
          </label>
        ))}        
      </div>  

      <br/>
    {modal && <Modal dados={modal}/>}
    </div>
  );
};

// const Filter = () =>{return <></>}
export default Filter;
