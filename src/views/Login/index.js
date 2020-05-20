import React from 'react';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { View, Text, TextInput, TouchableHighlight, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
//Estilos
import BotoesStyle from '../../assets/styles/botoes';
import FormStyle from '../../assets/styles/forms';
import Cores from '../../assets/styles/cores';
//Actions
import { toggleCarregando } from '../../store/actions/carregando';
import { showAlert } from '../../store/actions/alert';
import { logado } from '../../store/actions/logado';
class Login extends React.Component {
  state = {
    email: "",
    senha: "",
  }
  login = async ( email, senha ) => {
    this.props.dispatch(toggleCarregando(true))
    let data = {
      "email": email,
      "senha": senha
    }
    try {
      const res = await axios.post(`${API_URL}/usuarios/login`, data);
      await AsyncStorage.setItem('@DiscoteriaApp:token', res.data.token);
      await AsyncStorage.setItem('@DiscoteriaApp:id', res.data.id);
      this.props.dispatch(toggleCarregando(false))
      this.props.dispatch(logado(true))
      this.props.navigation.navigate( 'Colecao' )
    } catch(error) {
      this.props.dispatch(toggleCarregando(false))
      this.props.dispatch(showAlert(true, false, 'usuário e/ou senha incorretos'))
    }
  }
  closeAlert = e => {
    this.props.dispatch(showAlert(false, false, ''))
  }
  render() {
    return(
      <View style = { styles.container } >
        <View style = { styles.conteudoContainer }>
          <Text style = { styles.titulo } >Login</Text>
          <TextInput
            keyboardType = "email-address"
            autoCapitalize = "none"
            onChangeText = { ( text => {
              this.closeAlert();
              this.setState( { email: text } )
            } ) }
            placeholder = "seu e-mail" style={ [ FormStyle.inputs, FormStyle.inputMarginBottom ] }
          />
          <TextInput
            placeholder="sua senha"
            autoCapitalize = "none"
            onChangeText = { ( text => {
              this.closeAlert();
              this.setState( { senha: text } )
            } ) }
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
export default connect( state => ({estado: state}))(Login);