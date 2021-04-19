import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Input from './Input';
import Filter from './Filter';
import {retornaTotal } from './store/contagem';

const Contagem = () => {  
  const {dadosObj, total} = useSelector(({contagem})=>contagem) 
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(retornaTotal())
  },[dispatch])
  
  return (    
    <>

      <h1 className="total">Qtd:{total} | Conexões:{dadosObj.length}</h1>
      <Filter />  
      <Input />
    </>
  );
};

export default Contagem;
