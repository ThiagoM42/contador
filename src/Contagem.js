import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Input from './Input';
import Filter from './components/Filter/Filter';
import {retornaTotal } from './store/contagem';
import {Container, Row, Col} from 'react-bootstrap';

const Contagem = () => {  
  const {dadosObj, total} = useSelector(({contagem})=>contagem) 
  const dispatch = useDispatch();

  React.useEffect(()=>{
    dispatch(retornaTotal())
  },[dispatch])
  
  return (    
    <div>
      {/* <h1 style={{position:'fixed', left:0}}>Qtd:{total} | Conexões:{dadosObj.length}</h1> */}
      <h1 className="p-5">Qtd:{total} | Conexões:{dadosObj.length}</h1>
      <Container >
        <Row>
          <Col sm={12} md={3}><Filter/></Col>
          <Col sm={12} md={9}><Input/></Col>      
        </Row>
      </Container>
    </div>
  );
};

export default Contagem;
