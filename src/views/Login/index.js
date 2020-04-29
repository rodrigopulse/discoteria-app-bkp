import React from 'react';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//Estilos
import BotoesStyle from '../../assets/styles/botoes';
import FormStyle from '../../assets/styles/forms';
import Cores from '../../assets/styles/cores';

//Components
import Alert from '../../components/Alert';
import Carregando from '../../components/Carregando';
class Login extends React.Component {
  state = {
    email: "",
    senha: "",
    showAlert: false,
    mensagemAlert: "",
    showCarregando: false
  }
  login = async ( email, senha ) => {
    this.state = {
      showCarregando: true
    }
    let data = {
      "email": email,
      "senha": senha
    }
    try {
      const res = await axios.post(`${API_URL}/usuarios/login`, data);
      await AsyncStorage.setItem('@DiscoteriaApp:token', res.data.token);
      await AsyncStorage.setItem('@DiscoteriaApp:id', res.data.id);
      this.props.navigation.navigate( 'Colecao' )
    } catch(error) {
      this.setState({
        showAlert: true,
        showCarregando: false,
        mensagemAlert: "Usuário e/ou senha incorretos"
      })
      console.log("Erro: ", error)
    }
  }
  closeAlert = e => {
    this.setState({
      showAlert: false
    })
  }
  render() {
    return(
      <View style = { styles.container } >
        { this.state.showCarregando &&
          <Carregando />
        }
        { this.state.showAlert &&
          <Alert mensagem = { this.state.mensagemAlert } fecharAlert = { this.closeAlert }/>
        }
        <View style = { styles.conteudoContainer }>
          <Text style = { styles.titulo } >Login</Text>
          <TextInput
            keyboardType = "email-address"
            autoCapitalize = "none"
            onChangeText = { ( text => this.setState( { email: text, showAlert: false } ) ) }
            placeholder = "seu e-mail" style={ [ FormStyle.inputs, FormStyle.inputMarginBottom ] }
          />
          <TextInput
            placeholder="sua senha"
            autoCapitalize = "none"
            onChangeText = { ( text => this.setState( { senha: text, showAlert: false } ) ) }
            secureTextEntry = { true }
            style = { [ FormStyle.inputs, FormStyle.inputMarginBottom ] }
          />
          <TouchableHighlight
            onPress = { () => { this.login( this.state.email, this.state.senha ) } }
            underlayColor = { Cores.corPrimariaHover }
            style = { [ BotoesStyle.botaoPadraoPrimaria, { "marginBottom": 15 } ] }
          >
            <Text style = { BotoesStyle.textoBotaoPadraoPrimaria } >Entrar</Text>
          </TouchableHighlight>
          <TouchableHighlight style = { [ BotoesStyle.botaoLinkBranco, { "marginBottom": 15 } ] }>
            <Text style = { BotoesStyle.textoBotaoLinkBranco } >Esqueci minha senha</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style = { [ BotoesStyle.botaoLinkBranco, { "marginBottom": 15 } ] }
            onPress = { () =>
              this.props.navigation.navigate( 'CriarConta' )
            }
          >
            <Text style = { BotoesStyle.textoBotaoLinkBranco } >Criar uma conta</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Cores.corSecundaria,
    flex: 1,
  },
  conteudoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingBottom: 20
  },
  titulo: {
    fontSize: 42,
    color: Cores.corPrimaria,
    alignSelf: "center",
    fontWeight: "700",
    marginBottom: 40
  },
})
export default Login