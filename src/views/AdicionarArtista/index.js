import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import Axios from 'axios';
//Componentes
import Carregando from '../../components/Carregando';
import TabBar from '../../components/TabBar';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Alert from '../../components/Alert';
//Estilos
import BotoesStyle from '../../assets/styles/botoes';
import FormStyle from '../../assets/styles/forms';
import Cores from '../../assets/styles/cores';
class AdicionarArtista extends React.Component {
  state = {
    showCarregando: false,
    showAlert: false,
    mensagemAlert: "",
    sucessoAlert: false,
    nome: ''
  }
  toggleOpen = (e) => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }
  closeAlert = e => {
    this.setState({
      showAlert: false
    })
  }
  salvarArtista = () => {
    this.setState({
      showCarregando: true
    })
    const url = `${API_URL}/artistas/cadastra`
    let data = {
      nome: this.state.nome,
    }
    Axios({
      url: url,
      data: data,
      method: "POST"
    })
    .then( (res) => {
      console.log("Cadastrado com sucesso: ", res.data.data._id)
      this.setState({
        showCarregando: false,
        showAlert: true,
        mensagemAlert: 'Cadastrado com sucesso',
        sucessoAlert: true
      })
    })
    .catch( (res) => {
      this.setState({
        showCarregando: false,
        showAlert: true,
        mensagemAlert: 'Cadastro não realizado'
      })
      console.log("Erro: ", res)
    })
  }
  render() {
    return (
      <View style = {styles.container}>
        { this.state.showCarregando &&
          <Carregando />
        }
        { this.state.showAlert &&
          <Alert mensagem = { this.state.mensagemAlert } sucesso = {this.state.sucessoAlert} fecharAlert = { this.closeAlert }/>
        }
        {this.state.showMenu && <Menu navigation = {this.props.navigation} toggleOpen={this.toggleOpen} /> }
        <Header toggleOpen={this.toggleOpen} />

        <View style={GridStyle.content}>

          <Text style={styles.titulo}>Novo Artista</Text>
          <Text style={styles.texto}>Coloque o nome do artista corretamente, vale uma busca no google :)</Text>

          <TextInput
            autoCapitalize = "words"
            placeholder = "nome do artista"
            onChangeText = { ( text => this.setState( { nome: text, showAlert: false } ) ) }
            style={ [ FormStyle.inputs100, FormStyle.inputMarginBottom ] }
          />

          <TouchableHighlight
            onPress = { () => { this.salvarArtista() } }
            underlayColor = { Cores.corPrimariaHover }
            style = { [ BotoesStyle.botaoPadraoPrimaria, BotoesStyle.botao100, { "marginBottom": 40, "marginTop": 30 } ] }
          >
            <Text style = { BotoesStyle.textoBotaoPadraoPrimaria } >Salvar</Text>
          </TouchableHighlight>

        </View>

        <TabBar navigation={this.props.navigation} />
      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Cores.corSecundaria,
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    fontSize: 22,
    color: Cores.corPrimaria,
    marginBottom: 10,
  },
  texto: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center"
  },
  containerContent: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    alignItems: "center"
  },
});
export default AdicionarArtista