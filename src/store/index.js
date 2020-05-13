import { createStore } from 'redux';

const ESTADO_INICIAL = {
  carregando: false,
  showAlert: false,
  sucessoAlert: false,
  mensagemAlert: 'Teste',
  logado: false
}

function reducer( state = ESTADO_INICIAL, action) {
  if(action.type === 'TOGGLE_CARREGANDO') {
    return {...state, carregando: action.carregando}
  }
  if(action.type === 'SHOW_ALERT') {
    return {
      ...state,
      showAlert: action.showAlert,
      sucessoAlert: action.sucessoAlert,
      mensagemAlert: action.mensagemAlert
    }
  }
  if(action.type === 'LOGIN') {
    return {
      ...state,
      logado: action.logado
    }
  }
  return state
}

const store = createStore(reducer);

export default store;