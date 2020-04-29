import React from 'react';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
//Components
import Carregando from '../../components/Carregando';
//Estilos
import Cores from '../../assets/styles/cores';
import GridStyle from '../../assets/styles/grid';
class Disco extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCarregando: true,
      capa: '',
      nome: '',
      artista: ''
    }
  }
  getDisco = () => {
    const url = `${API_URL}/albuns/id?id=${this.props.route.params.id}`;
    axios({
      url: url,
      method: "GET"
    })
    .then( (res) => {
      console.log(res.data.data[0].capa)
      this.setState({
        showCarregando: false,
        capa: res.data.data[0].capa,
        nome: res.data.data[0].nome,
        artista: res.data.data[0].artistas[0].nome
      })
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
        </ScrollView>
        }
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
    paddingTop: 20
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
  }
})
export default Disco