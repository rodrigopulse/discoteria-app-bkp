import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { API_URL } from 'react-native-dotenv';
//Componentes
import TabBar from '../../components/TabBar';
import Card from '../../components/Card';
import Header from '../../components/Header';
import Menu from '../../components/Menu';

//Estilos
import Cores from '../../assets/styles/cores';
import GridStyle from '../../assets/styles/grid';
import Axios from 'axios';
class Colecao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      colecao: []
    }
  }
  getColecao = async () => {
    try {
      const idUsuario = await AsyncStorage.getItem('@DiscoteriaApp:id');
      const url = `${API_URL}/colecao/id?id=${idUsuario}`
      Axios({
        url: url,
        method: 'GET'
      })
      .then( (res) => {
        this.setState({ colecao: res.data.data })
      })
    } catch (error) {
      console.log(error)
    }
  };
  toggleOpen = (e) => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }
  componentDidMount() {
    this.getColecao()
  }
  render() {
    return(
      <View style={styles.container}>
        <Header toggleOpen={this.toggleOpen} />
        {this.state.showMenu && <Menu navigation={this.props.navigation} /> }
        <ScrollView style={GridStyle.scrollView}>
          <View style={GridStyle.content}>
            { this.state.colecao.length === 0 ? (
              <Text>Carregando</Text>
            ):(
              <View>
                <Text style = {styles.totalColecao}>Total na coleção: { this.state.colecao[0].albuns.length }</Text>
                { this.state.colecao[0].albuns.map( (item, key) =>
                  <Card
                    capa = {item.capa}
                    album = {item.nome}
                    artista = {item.artistas[0].nome}
                    key = { key }
                  />
                ) }
              </View>
            )}
          </View>
        </ScrollView>
        <TabBar />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Cores.corSecundaria,
    flex: 1,
    zIndex: 1
  },
  totalColecao: {
    color: "#fff",
    marginBottom: 20
  }
})
export default Colecao