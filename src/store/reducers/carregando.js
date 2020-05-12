const ESTADO_INICIAL = {
  carregando: false
}
function reducer( state = ESTADO_INICIAL, action) {
  if(action.type === 'TOGGLE_CARREGANDO') {
    return {...state, carregando: action.carregando}
  }
  return state
}