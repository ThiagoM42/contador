import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Input from './Input';
import Filter from './components/Filter/Filter';
import {retornaTotal } from './store/contagem';
import {Wrapper} from './styles.js';

const Contagem = () => {  
  const {dadosObj, total} = useSelector(({contagem})=>contagem) 
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(retornaTotal())
  },[dispatch])
  
  return (    
    <div>
      {/* <h1 style={{position:'fixed', left:0}}>Qtd:{total} | Conexões:{dadosObj.length}</h1> */}
      <h1>Qtd:{total} | Conexões:{dadosObj.length}</h1>
      <Wrapper>
        <Filter />  
        <Input />
      </Wrapper>
    </div>
  );
};

export default Contagem;
