import {v4} from 'uuid';

//pegar o texto bruto e usar inicialmente como string
//O SEPARADOR REGEX PODE SER O \n
function sanitizeData(dados){
  let dadosObj = [];
  //artificio para pegar somente o push  
  dados = dados.filter(d=>d!=="");
  dados.reduce((acc, dado, index) => {  
    let qtd = dado.match(/(\b\d{1,2}\b)/, '$1');    
    // let nome = dado.trim().replace('“','').replace("",'').replace("\"",'').replace("'",'');
    let nome = dado.trim().replace(/[^0-9a-zA-Z]+/, "");
    dadosObj.push({"id":v4(), nome, "qtd":qtd?parseInt(qtd[0]):0, "status":"Não"});
  return acc;
  }, {})
  return dadosObj;
}


export default sanitizeData;
