import React from 'react';
import { View, StyleSheet, Text, Button} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from 'react-native-dotenv';
import Axios from 'axios';
import { connect } from 'react-redux';
//Componentes
import Card from '../../components/Card';
//Actions
import { toggleCarregando } from '../../store/actions/carregando';

//Estilos
import Cores from '../../assets/styles/cores';
import GridStyle from '../../assets/styles/grid';

class Colecao extends React.Component {
  state = {
    showMenu: false,
    colecao: [],
    nenhumDisco: false
  }
  constructor(props) {
    super(props);
  }
  getColecao = async () => {
    this.props.dispatch(toggleCarregando(true))
    try {
      const idUsuario = await AsyncStorage.getItem('@DiscoteriaApp:id');
      const url = `${API_URL}/colecao/id?id=${idUsuario}`
      Axios({
        url: url,
        method: 'GET'
      })
      .then( (res) => {
        this.props.dispatch(toggleCarregando(false))
        this.setState({
          colecao: res.data.data
        })
      })
      .catch( () => {
        this.props.dispatch(toggleCarregando(false))
        this.setState({
          nenhumDisco: true
        })
      })
    } catch (error) {
      this.props.dispatch(toggleCarregando(false))
      this.setState({
        nenhumDisco: true
      })
    }
  };
  componentDidMount() {
    this.getColecao()
  }

  render() {
    return(
      <View style={GridStyle.container}>
        { this.state.nenhumDisco ? (
          <ScrollView style={GridStyle.scrollView}>
            <View style={GridStyle.content}>
              <Text style = {styles.totalColecao}>Nenhum disco na sua coleção</Text>
            </View>
          </ScrollView>
        ) : (
          <ScrollView style={GridStyle.scrollView}>
            <View style={GridStyle.content}>
              { this.state.colecao.length === 0 ? (
                null
              ):(
                <View>
                  <Text style = {styles.totalColecao}>Total na coleção: { this.state.colecao[0].albuns.length }</Text>
                  { this.state.colecao[0].albuns.map( (item, key) =>
                    <Card
                      capa = {item.capa}
                      album = {item.nome}
                      id = {item._id}
                      artista = {item.artistas[0].nome}
                      navigation={this.props.navigation}
                      key = { key }
                    />
                  ) }
                </View>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  totalColecao: {
    color: "#fff",
    marginBottom: 20
  }
})
export default connect( state => ({estado: state}))(Colecao);