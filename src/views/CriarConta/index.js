import React from 'react';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'
import { View, Text, TouchableHighlight, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

//Actions
import { toggleCarregando } from '../../store/actions/carregando';
import { showAlert } from '../../store/actions/alert';

//Estilos
import BotoesStyle from '../../assets/styles/botoes';
import FormStyle from '../../assets/styles/forms';
import Cores from '../../assets/styles/cores';

class CriarConta extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: "",
      email: "",
      senha: "",
      senhaRepete: "",
    }
  }
  closeAlert = e => {
    this.props.dispatch(showAlert(false, false, ''))
  }
  criarConta = async () => {
    // Validações
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.state.nome == "") {
      this.props.dispatch(showAlert(true, false, 'preencha o seu nome'))
      return false
    }
    if(this.state.email == "" || reg.test(this.state.email) === false) {
      this.props.dispatch(showAlert(true, false, 'preencha um e-mail válido'))
      return false
    }
    if(this.state.senha == "") {
      this.props.dispatch(showAlert(true, false, 'preencha uma senha'))
      return false
    }
    if(this.state.senha != this.state.senhaRepete) {
      this.props.dispatch(showAlert(true, false, 'as senhas precisam ser iguais'))
      return false
    }
    this.props.dispatch(toggleCarregando(true))
    try {
      data = {
        "nome": this.state.nome,
        "email": this.state.email,
        "senha": this.state.senha
      }
      await axios.post(`${API_URL}/usuarios/criar`, data)
      this.props.navigation.navigate( 'Login' )
    }
    catch(error) {
      if(error.response.data.code == '11000') {
        this.props.dispatch(showAlert(true, false, 'usuário já existe'))
        this.props.dispatch(toggleCarregando(false))
      } else {
        this.props.dispatch(showAlert(true, false, 'ocorreu um erro'))
        this.props.dispatch(toggleCarregando(false))
      }
    }
  }
  render() {
    return(
      <View style = { styles.container } >
        <View style = { styles.conteudoContainer }>
          <Text style = { styles.titulo } >Criar Conta</Text>
          <TextInput
            autoCapitalize = "words"
            onChangeText = { ( text => {
              this.closeAlert();
              this.setState( { nome: text } )
            } ) }
            placeholder = "seu nome" style={ [ FormStyle.inputs, FormStyle.inputMarginBottom ] }
          />
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
          <TextInput
            placeholder="repita a senha"
            autoCapitalize = "none"
            onChangeText = { ( text => {
              this.closeAlert();
              this.setState( { senhaRepete: text } )
            } ) }
            secureTextEntry = { true }
            style = { [ FormStyle.inputs, FormStyle.inputMarginBottom ] }
          />
          <TouchableHighlight
            onPress = { () => { this.criarConta( this.state.email, this.state.senha ) } }
            underlayColor = { Cores.corPrimariaHover }
            style = { [ BotoesStyle.botaoPadraoPrimaria, { "marginBottom": 15 } ] }
          >
            <Text style = { BotoesStyle.textoBotaoPadraoPrimaria } >Criar Conta</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style = { [ BotoesStyle.botaoLinkBranco, { "marginBottom": 15 } ] }
            onPress = { () =>
              this.props.navigation.replace( 'Login' )
            }
          >
            <Text style = { BotoesStyle.textoBotaoLinkBranco } >Fazer Login</Text>
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
export default connect( state => ({estado: state}))(CriarConta)
