import React from 'react';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
//Components
import Carregando from '../../components/Carregando';
import TabBar from '../../components/TabBar';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
//Estilos
import Cores from '../../assets/styles/cores';
import GridStyle from '../../assets/styles/grid';
class Disco extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCarregando: true,
      showMenu: false,
      capa: '',
      nome: '',
      artista: '',
      ladoa: [],
      ladob: []
    }
  }
  toggleOpen = (e) => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }
  getDisco = () => {
    const url = `${API_URL}/albuns/id?id=${this.props.route.params.id}`;
    axios({
      url: url,
      method: "GET"
    })
    .then( (res) => {
      this.setState({
        showCarregando: false,
        capa: res.data.data[0].capa,
        nome: res.data.data[0].nome,
        artista: res.data.data[0].artistas[0].nome,
        ladoa: res.data.data[0].ladoa,
        ladob: res.data.data[0].ladob
      })
      console.log(this.state.ladob)
    })
  }
  componentDidMount() {
    this.getDisco()
  }
  render() {
    return (
      <View style={styles.container}>
        { this.state.showCarregando &&
          <Carregando />
        }
        <Header toggleOpen={this.toggleOpen} />
        {this.state.showMenu && <Menu navigation={this.props.navigation} /> }
        {this.state.capa != '' &&
        <ScrollView style={GridStyle.scrollView}>
          <Image
            style={styles.capa}
            source={{
              uri: this.state.capa,
            }}
          />
          <View style={styles.containerContent}>
            <Text style={styles.textoBold}>
              Albúm: <Text style={styles.texto}>{this.state.nome}</Text>
            </Text>
            <Text style={styles.textoBold}>
              Artista: <Text style={styles.texto}>{this.state.artista}</Text>
            </Text>
          </View>
          <View style={styles.musicas}>
            <Text style={styles.textoBold}>Lado A</Text>
           { this.state.ladoa.map( (item, key) =>
            <Text style={styles.texto} key = {key}>
              {item}
            </Text>
           )}
           <Text style={[styles.textoBold, {marginTop: 20}]}>Lado B</Text>
           { this.state.ladob.map( (item, key) =>
            <Text style={styles.texto} key = {key}>
              {item}
            </Text>
           )}
          </View>
        </ScrollView>
        }
        <TabBar navigation={this.props.navigation} />
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
  containerContent: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  capa: {
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1,
    resizeMode: "cover"
  },
  texto: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "400"
  },
  textoBold: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700"
  },
  musicas: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 70
  }
})
export default Disco