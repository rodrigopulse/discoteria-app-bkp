import {combineReducers} from 'redux';

//import carregando from './carregando';

//Reducers
const ESTADO_INICIAL = {
  carregando: false
}
export default function carregando( state = ESTADO_INICIAL, action) {
  if(action.type === 'TOGGLE_CARREGANDO') {
    return {...state, carregando: action.carregando}
  }
  console.log(action)
  return state
}