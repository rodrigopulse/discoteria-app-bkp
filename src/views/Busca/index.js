import React from 'react';
import { View, TextInput, StyleSheet, ScrollView } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import Axios from 'axios';
//Componentes
import Carregando from '../../components/Carregando';
import TabBar from '../../components/TabBar';
import Header from '../../components/Header';
import Card from '../../components/Card';
//Estilos
import BotoesStyle from '../../assets/styles/botoes';
import FormStyle from '../../assets/styles/forms';
import Cores from '../../assets/styles/cores';

class Busca extends React.Component {
  state = {
    showCarregando: false,
    inputBusca: '',
    resultado: []
  }

  buscarDisco = async () => {
    this.setState({
      showCarregando: true
    })
    try {
      const url = `${API_URL}/albuns/busca?termo=${this.state.inputBusca}`
      Axios({
        url: url,
        method: 'GET'
      })
      .then( (res) => {
        this.setState({
          showCarregando: false,
          resultado: res.data.data
        })
        console.log(this.state.resultado)
      })
    } catch (error) {
      console.log(error)
    }
  };
  render(){
    return(
      <View style={styles.container}>
        { this.state.showCarregando &&
          <Carregando />
        }
        <ScrollView style={GridStyle.scrollView}>
          <Header toggleOpen={this.toggleOpen} />
          <TextInput
            autoCapitalize = "none"
            returnKeyType="search"
            onChangeText = { ( text => this.setState( { inputBusca: text } ) ) }
            onSubmitEditing={ this.buscarDisco }
            placeholder = "busque seu disco" style={ [ FormStyle.inputs, styles.inputBusca, FormStyle.inputMarginBottom ] }
          />
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
        <TabBar navigation={this.props.navigation} />
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
  }
})
export default Busca;