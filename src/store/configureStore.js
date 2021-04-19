import { combineReducers, configureStore } from '@reduxjs/toolkit';
import contagem from './contagem';

const reducer = combineReducers({ contagem });
const store = configureStore({ reducer});

export default store;