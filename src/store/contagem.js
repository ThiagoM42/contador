import { createSlice } from '@reduxjs/toolkit';
import getLocalStorage from '../helper/getLocalStorage';
import sanitizeData from '../helper/sanitizeData';
import removeDuplicator from '../helper/removeDuplicator';
import orderAsc from '../helper/orderAsc';

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
      let dadosJoin = [...getLocalStorage('dados'), ...dadosWithsanitizeData];      
      window.localStorage.setItem("dados", JSON.stringify(orderAsc(dadosJoin)));
      state.dadosObj =getLocalStorage('dados');
    },
    changeFilters(state, action) {   
      state.filters[action.payload.name] = action.payload.value;
    },
    changeDataName(state, action){    
      let indice = state.dadosObj.map(d=>d.id).indexOf(action.payload.id)
      state.dadosObj[indice].nome = action.payload.nome       
      window.localStorage.setItem("dados", JSON.stringify(state.dadosObj));      
      setTimeout( 
        window.localStorage.setItem("dados", JSON.stringify(orderAsc(state.dadosObj))),
        6000
      )
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
      window.localStorage.setItem("dados", JSON.stringify(state.dadosObj));  
    },
    retornaTotal(state){
      state.total = state.dadosObj.reduce((a, b)=>(+b.qtd +a),0)
    },     
    dataCreate(state){
      state.dadosObj.unshift({id:Math.floor(Math.random()*1000000), nome:"", qtd:1, status:"N??o"})
    },
    dataRemove(state, action){      
      let indice = state.dadosObj.map(d=>d.id).indexOf(action.payload.id)   
      state.dadosObj.splice(indice, 1)           
      window.localStorage.setItem("dados", JSON.stringify(state.dadosObj));    
    },
    removeAll(state){      
      state.dadosObj = [];  
      window.localStorage.setItem("dados", JSON.stringify(state.dadosObj));          
    }        
  },
});

export const { changeFilters, changeDataName, changeDataQtd, changeDataStatus, retornaTotal, dataCreate, dataRemove, addLocalstorage, removeAll} = slice.actions;

export default slice.reducer;

export const selectUniqueStatus = () =>
  (["Sim", "N??o"]);