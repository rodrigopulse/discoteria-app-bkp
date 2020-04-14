import Cores from './cores';
import { StyleSheet } from "react-native";

export default BotoesStyle = StyleSheet.create({
  botaoPadraoVerde: {
    height: 50,
    width: 280,
    borderRadius: 100,
    backgroundColor : Cores.corPrimaria,
    justifyContent: "center",
  },
  textoBotaoPadraoVerde: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 16,
  },
  botaoPadraoBranco: {
    height: 50,
    width: 280,
    borderRadius: 100,
    backgroundColor : "#fff",
    justifyContent: "center",
  },
  textoBotaoPadraoBranco: {
    alignSelf: "center",
    color: Cores.corPrimaria,
    fontSize: 16
  },
  botaoLinkBranco: {
    backgroundColor: "transparent"
  },
  textoBotaoLinkBranco: {
    color: "#fff",
    fontWeight: "700"
  }
})