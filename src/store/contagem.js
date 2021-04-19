import { createSlice } from '@reduxjs/toolkit';
import getLocalStorage from '../helper/getLocalStorage';
import sanitizeData from '../helper/sanitizeData';
import removeDuplicator from '../helper/removeDuplicator';

const slice = createSlice({
  name: 'contagem',
  initialState: {
    dadosObj:getLocalStorage('dados'),   
    total:0,
    filters: {
      status: [],
      nome:""
    },
  },
  reducers: {
    addLocalstorage(state, action){
      let dadosWithsanitizeData = (sanitizeData(action.payload.dados))
      dadosWithsanitizeData = removeDuplicator(dadosWithsanitizeData)
      let dadosJOin = [...getLocalStorage('dados'), ...dadosWithsanitizeData];
      window.localStorage.setItem("dados", JSON.stringify(dadosJOin));
      state.dadosObj = getLocalStorage('dados')
    },
    changeFilters(state, action) {   
      state.filters[action.payload.name] = action.payload.value;
    },
    changeDataName(state, action){    
      let indice = state.dadosObj.map(d=>d.id).indexOf(action.payload.id)
      state.dadosObj[indice].nome = action.payload.nome 
      window.localStorage.setItem("dados", JSON.stringify(state.dadosObj));      
    },
    changeDataQtd(state, action){        
      let indice = state.dadosObj.map(d=>d.id).indexOf(action.payload.id)      
      state.dadosObj[indice].qtd = action.payload.qtdAtual
      state.total = state.dadosObj.reduce((a, b)=>(+b.qtd +a),0)
      window.localStorage.setItem("dados", JSON.stringify(state.dadosObj));  
    }, 
    changeDataStatus(state, action){ 
      let indice = state.dadosObj.map(d=>d.id).indexOf(action.payload.id)
      state.dadosObj[indice].status = action.payload.value
    },
    retornaTotal(state){
      state.total = state.dadosObj.reduce((a, b)=>(+b.qtd +a),0)
    },     
    dataCreate(state){
      state.dadosObj.push({id:Math.floor(Math.random()*100000), nome:"0-Adicionado", qtd:0, status:"Não"})
    },
    dataRemove(state, action){      
      let indice = state.dadosObj.map(d=>d.id).indexOf(action.payload.id)   
      state.dadosObj.splice(indice, 1)           
      window.localStorage.setItem("dados", JSON.stringify(state.dadosObj));    
    }    
  },
});

export const { changeFilters, changeDataName, changeDataQtd, changeDataStatus, retornaTotal, dataCreate, dataRemove, addLocalstorage} = slice.actions;

export default slice.reducer;

export const selectUniqueStatus = () =>
  (["Sim", "Não"]);