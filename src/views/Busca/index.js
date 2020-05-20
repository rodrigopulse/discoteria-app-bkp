import React from 'react';
import { View, TextInput, StyleSheet, ScrollView, TouchableHighlight, Text} from 'react-native';
import { API_URL } from 'react-native-dotenv';
import Axios from 'axios';
import { connect } from 'react-redux';
//Componentes
import Card from '../../components/Card';
//Actions
import { toggleCarregando } from '../../store/actions/carregando';
//Estilos
import BotoesStyle from '../../assets/styles/botoes';
import FormStyle from '../../assets/styles/forms';
import Cores from '../../assets/styles/cores';

class Busca extends React.Component {
  state = {
    inputBusca: '',
    resultado: [],
    adicionar: false
  }

  buscarDisco = async () => {
    this.props.dispatch(toggleCarregando(true))
    try {
      const url = `${API_URL}/albuns/busca?termo=${this.state.inputBusca}`
      Axios({
        url: url,
        method: 'GET'
      })
      .then( (res) => {
        this.props.dispatch(toggleCarregando(false))
        if( res.data.data.length <= 0 ) {
          console.log('resultado não encontrado')
          this.setState({
            adicionar: true
          })
        }
        this.setState({
          resultado: res.data.data
        })
      })
    } catch (error) {
      this.props.dispatch(toggleCarregando(false))
      console.log(error)
    }
  };
  adicionar = () => {
    console.log('adicionar');
  }

  render(){
    return(
      <View style={styles.container}>
        <ScrollView style={GridStyle.scrollView}>

          <TextInput
            autoCapitalize = "none"
            returnKeyType="search"
            onChangeText = { ( text => this.setState( { inputBusca: text } ) ) }
            onSubmitEditing={ this.buscarDisco }
            placeholder = "busque seu disco" style={ [ FormStyle.inputs, styles.inputBusca, FormStyle.inputMarginBottom ] }
          />
          {this.state.adicionar &&
            <View style={styles.containerNaoEncontrado}>
              <Text style={styles.textoNaoEncontrado}>Resultado não encontrado</Text>
              <TouchableHighlight
                onPress = { () => { this.props.navigation.replace('AdicionarDisco1'); } }
                underlayColor = { Cores.corPrimariaHover }
                style = { [ BotoesStyle.botaoPadraoPrimaria, { "marginBottom": 15 } ] }
              >
                <Text style = { BotoesStyle.textoBotaoPadraoPrimaria } >Adicionar Novo Disco</Text>
              </TouchableHighlight>
            </View>
          }
          { this.state.resultado.map( (item, key) =>
            <Card
              capa = {item.capa}
              album = {item.nome}
              id = {item._id}
              artista = {item.artistas[0].nome}
              navigation={this.props.navigation}
              key = { key }
            />
          ) }
        </ScrollView>

      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Cores.corSecundaria,
    flex: 1,
  },
  inputBusca: {
    width: "100%",
    borderRadius: 0
  },
  containerNaoEncontrado: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  textoNaoEncontrado: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 15
  }
})
export default connect( state => ({estado: state}))(Busca);