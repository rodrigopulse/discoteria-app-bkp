import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import Axios from 'axios';
import { connect } from 'react-redux';
//Actions
import { toggleCarregando } from '../../store/actions/carregando';
//Estilos
import BotoesStyle from '../../assets/styles/botoes';
import FormStyle from '../../assets/styles/forms';
import Cores from '../../assets/styles/cores';
import GridStyle from '../../assets/styles/grid';

class AdicionarDisco1 extends React.Component {
  state = {
    inputBusca: '',
    naoEncontrado: false,
    resultado: []
  }
  buscarArtista = async () => {
    this.props.dispatch(toggleCarregando(true))
    this.setState({
      resultado: [],
    })
    try {
      const url = `${API_URL}/artistas/busca?termo=${this.state.inputBusca}`
      Axios({
        url: url,
        method: 'GET'
      })
      .then( (res) => {
        this.props.dispatch(toggleCarregando(false))
        if(res.data.data.length == 0) {
          this.setState({
            naoEncontrado: true
          })
        } else {
          this.setState({
            resultado: res.data.data,
            naoEncontrado: false
          })
        }
      })
      .catch( () => {
        this.props.dispatch(toggleCarregando(false))
        this.setState({
          naoEncontrado: true
        })
      })
    } catch (error) {
      this.props.dispatch(toggleCarregando(false))
    }
  };
  escolheArtista = (id) => {
    this.props.navigation.replace('AdicionarDisco2', {idArtista: id});
  }

  render() {
    return(
      <View style={GridStyle.container}>

        <View style={styles.containerContent}>
          <Text style={styles.titulo}>Vamos por partes :)</Text>
          <Text style={styles.texto}>Qual artista gravou esse álbum?</Text>
          <TextInput
            returnKeyType="search"
            onSubmitEditing={ this.buscarArtista }
            onChangeText = { ( text => this.setState( { inputBusca: text } ) ) }
            placeholder = "Buscar o artista" style={ [ FormStyle.inputs100, FormStyle.inputMarginBottom ] }
          />
          {this.state.resultado.length > 0 &&
            <Text style={styles.texto}>Encontramos {this.state.resultado.length} artista(s)</Text>
          }
          { this.state.resultado.map( (item, key) =>
            <TouchableHighlight
              key = {key}
              onPress = { () => { this.escolheArtista(item._id) } }
              underlayColor = { Cores.corPrimariaHover }
              style = { this.state.selecionado == item._id ? styles.checkboxSelecionado : styles.checkbox }
            >
              <Text style = { BotoesStyle.textoBotaoPadraoPrimaria } >{item.nome}</Text>
            </TouchableHighlight>
          ) }
          {this.state.naoEncontrado &&
            <View style={styles.containerContent}>
              <Text style={styles.texto}>Artista não encontrado! Você gostaria de adicionar o artista?</Text>
              <TouchableHighlight
                onPress = { () => { this.props.navigation.replace('AdicionarArtista') } }
                underlayColor = { Cores.corPrimariaHover }
                style = { BotoesStyle.botaoPadraoPrimaria }
              >
                <Text style = { BotoesStyle.textoBotaoPadraoPrimaria } >Adicionar Artista</Text>
              </TouchableHighlight>
            </View>
          }
        </View>

      </View>
    )
  }
}
const styles = StyleSheet.create({
  titulo: {
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
  checkbox: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    backgroundColor : "#F0F0F0",
    justifyContent: "center",
    marginBottom: 15
  },
  checkboxSelecionado: {
    height: 40,
    width: '100%',
    borderRadius: 10,
    backgroundColor : "#80B3EE",
    justifyContent: "center",
    marginBottom: 15
  }
});

export default connect( state => ({estado: state}))(AdicionarDisco1);