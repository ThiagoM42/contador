import getLocalStorage from '../helper/getLocalStorage';

function removeDuplicator(dadosSanitaze){
    let dadosLocais = getLocalStorage().map(d=>d.nome);
    let dados = dadosSanitaze.filter(d=>!dadosLocais.includes(d.nome))    
    return dados;
}

export default removeDuplicator;