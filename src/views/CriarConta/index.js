import React from 'react';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'
import { View, Text, TouchableHighlight, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//Components
import Alert from '../../components/Alert';
import Carregando from '../../components/Carregando';

//Estilos
import BotoesStyle from '../../assets/styles/botoes';
import FormStyle from '../../assets/styles/forms';
import Cores from '../../assets/styles/cores';

class CriarConta extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCarregando: true,
      nome: "",
      email: "",
      senha: "",
      senhaRepete: "",
      showAlert: false,
      mensagemAlert: "",
    }
  }
  mensagemErro = (mensagem) => {
    console.log('erro')
    this.setState({
      showAlert: true,
      mensagemAlert: mensagem
    })
  }
  closeAlert = e => {
    this.setState({
      showAlert: false
    })
  }
  fechaCarregando = () => {
    this.setState({
      showCarregando: false
    })
  }
  criarConta = async () => {
    this.state = {
      showCarregando: true
    }
    // Validações
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(this.state.nome == "") {
      this.mensagemErro('Preencha o seu nome')
      this.fechaCarregando()
      return false
    }
    if(this.state.email == "" || reg.test(this.state.email) === false) {
      this.mensagemErro('Preencha um e-mail válido')
      this.fechaCarregando()
      return false
    }
    if(this.state.senha == "") {
      this.mensagemErro('Preencha uma senha')
      this.fechaCarregando()
      return false
    }
    if(this.state.senha != this.state.senhaRepete) {
      this.mensagemErro('As senhas precisam ser iguais')
      this.fechaCarregando()
      return false
    }
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
        this.mensagemErro('Usuário já existe')
        this.fechaCarregando()
      } else {
        this.mensagemErro('Ocorreu um erro')
        this.fechaCarregando()
      }
    }
  }
  verificaToken = async () => {
    try {
      const token = await AsyncStorage.getItem('@DiscoteriaApp:token')
      if(token != null || token) {
        this.props.navigation.navigate( 'Home' )
      } else {
        this.fechaCarregando();
      }
    }
    catch(error) {
      this.fechaCarregando()
    }
  }
  componentDidMount() {
    this.verificaToken();
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
          <Text style = { styles.titulo } >Criar Conta</Text>
          <TextInput
            onChangeText = { ( text => this.setState( { nome: text, showAlert: false } ) ) }
            placeholder = "seu nome" style={ [ FormStyle.inputs, FormStyle.inputMarginBottom ] }
          />
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
          <TextInput
            placeholder="repita a senha"
            autoCapitalize = "none"
            onChangeText = { ( text => this.setState( { senhaRepete: text, showAlert: false } ) ) }
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
              this.props.navigation.navigate( 'Login' )
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
export default CriarConta
