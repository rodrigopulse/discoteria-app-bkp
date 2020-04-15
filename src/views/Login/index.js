import React, { Component } from 'react';
import axios from 'axios';
//import { API_URL } from 'react-native-dotenv'
import { View, Text, Image, TextInput, TouchableHighlight, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
//Estilos
import BotoesStyle from '../../assets/styles/botoes';
import FormStyle from '../../assets/styles/forms';
import Cores from '../../assets/styles/cores';
//Components
import Alert from '../../components/Alert';
class Login extends Component {
  state = {
    email: "",
    senha: "",
    showAlert: false,
    mensagemAlert: ""
  }
  login = async ( email, senha ) => {
    data = {
      "email": email,
      "password": senha
    }
    try {
      const res = await axios.post(`http://192.168.1.103:27017/usuarios/login`, data)
      await AsyncStorage.setItem('@DiscoteriaApp:token', res.data.token)
      //this.props.navigation.navigate( 'Home' )
    } catch(error) {
      this.setState({
        showAlert: true,
        mensagemAlert: "Usuário e/ou senha incorretos"
      })
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
              this.props.navigation.navigate( 'SignUp' )
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
    backgroundColor: '#222222',
    flex: 1,
  },
  imagem: {
    position: "absolute",
    marginRight: 0,
    marginTop: 0,
    opacity: .2
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