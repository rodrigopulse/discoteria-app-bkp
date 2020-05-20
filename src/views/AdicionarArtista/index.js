import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import Axios from 'axios';
import { connect } from 'react-redux';
//Actions
import { toggleCarregando } from '../../store/actions/carregando';
import { showAlert } from '../../store/actions/alert';
//Estilos
import BotoesStyle from '../../assets/styles/botoes';
import FormStyle from '../../assets/styles/forms';
import Cores from '../../assets/styles/cores';
import GridStyle from '../../assets/styles/grid';
class AdicionarArtista extends React.Component {
  state = {
    nome: ''
  }
  salvarArtista = () => {
    this.props.dispatch(toggleCarregando(true))
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
      this.props.dispatch(toggleCarregando(false))
      this.props.dispatch(showAlert(true, true, 'cadastrado com sucesso'))
    })
    .catch( (res) => {
      this.props.dispatch(toggleCarregando(false))
      this.props.dispatch(showAlert(true, false, 'cadastro não realizado'))
    })
  }
  render() {
    return (
      <View style = {GridStyle.container}>
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

      </View>
    )
  }

}
const styles = StyleSheet.create({
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

export default connect( state => ({estado: state}))(AdicionarArtista);