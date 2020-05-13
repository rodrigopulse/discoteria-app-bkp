export function showAlert(showAlert, sucessoAlert, mensagemAlert) {
  return {
    type: "SHOW_ALERT",
    showAlert,
    sucessoAlert,
    mensagemAlert
  }
}