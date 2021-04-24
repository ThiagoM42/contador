import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Assistencia from './Assistencia';
import {Container} from './styles';

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

    return (
        <Container>               
            <table>
                <thead>
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
