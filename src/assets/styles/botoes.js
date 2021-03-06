import Cores from './cores';
import { StyleSheet } from "react-native";

export default BotoesStyle = StyleSheet.create({
  botaoPadraoPrimaria: {
    height: 50,
    width: 280,
    borderRadius: 10,
    backgroundColor : Cores.corPrimaria,
    justifyContent: "center",
  },
  textoBotaoPadraoPrimaria: {
    alignSelf: "center",
    color: Cores.corSecundaria,
    fontSize: 16,
  },
  botaoPadraoBranco: {
    height: 50,
    width: 280,
    borderRadius: 10,
    backgroundColor : "#fff",
    justifyContent: "center",
  },
  botao100: {
    width: "100%"
  },
  textoBotaoPadraoBranco: {
    alignSelf: "center",
    color: Cores.corSecundaria,
    fontSize: 16
  },
  botaoLinkBranco: {
    backgroundColor: "transparent"
  },
  textoBotaoLinkBranco: {
    color: "#fff",
    fontWeight: "700"
  },
  textoBotaoLinkPrimaria: {
    color: Cores.corPrimaria
  },
  textoBotaoLinkVermelho: {
    color: Cores.corErro
  }
})