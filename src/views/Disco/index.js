import React from 'react';
import Axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { View, Image, Text, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
//Actions
import { toggleCarregando } from '../../store/actions/carregando';
import { showAlert } from '../../store/actions/alert';
//Estilos
import Cores from '../../assets/styles/cores';
import GridStyle from '../../assets/styles/grid';

class Disco extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idColecao: '',
      showMenu: false,
      capa: '',
      nome: '',
      artista: '',
      ladoa: [],
      ladob: [],
      ano: '',
      genero: '',
      adicionado: false,
    }
  }

  getDisco = async () => {
    this.props.dispatch(toggleCarregando(true))
    let url = `${API_URL}/colecao/idalbum?id=${this.props.route.params.id}`
    Axios({
      url: url,
      method: "GET"
    })
    .then( (res) => {
      this.props.dispatch(toggleCarregando(false))
      this.setState({
        adicionado: true,
        capa: res.data.data[0].albuns.capa,
        nome: res.data.data[0].albuns.nome,
        ano: res.data.data[0].albuns.ano,
        genero: res.data.data[0].albuns.genero,
        artista: res.data.data[0].albuns.artistas[0].nome,
        ladoa: res.data.data[0].albuns.ladoa,
        ladob: res.data.data[0].albuns.ladob,
        idColecao: res.data.data[0]._id
      })
    })
    .catch( () => {
      this.props.dispatch(toggleCarregando(false))
      let url = `${API_URL}/albuns/id?id=${this.props.route.params.id}`;
      Axios({
        url: url,
        method: "GET"
      })
      .then( (res) => {
        this.props.dispatch(toggleCarregando(false))
        this.setState({
          capa: res.data.data[0].capa,
          nome: res.data.data[0].nome,
          ano: res.data.data[0].ano,
          genero: res.data.data[0].genero,
          artista: res.data.data[0].artistas[0].nome,
          ladoa: res.data.data[0].ladoa,
          ladob: res.data.data[0].ladob,
          idColecao: res.data.data[0]._id
        })
        console.log(res.data.data[0].ano)
      })
    })
  }
  removerColecao = async () => {
    this.props.dispatch(toggleCarregando(true))
    try {
      const url = `${API_URL}/colecao/delete/${this.state.idColecao}`
      Axios({
        url: url,
        method: "POST"
      })
      .then( (res) => {
        this.props.dispatch(toggleCarregando(false))
        this.props.dispatch(showAlert(true, true, 'disco removido da Coleção'))
        this.setState({
          adicionado: false,
        })

      })
    } catch(erro) {
      this.props.dispatch(toggleCarregando(false))
      this.props.dispatch(showAlert(true, false, 'ocorreu um erro'))
    }
  }
  adicionarColecao = async () => {
    this.props.dispatch(toggleCarregando(true))
    console.log('adicionar coleção')
    try {
      const idUsuario = await AsyncStorage.getItem('@DiscoteriaApp:id');
      const albumId = this.props.route.params.id;
      const url = `${API_URL}/colecao/cadastra`
      let data = {
        idUsuario: idUsuario,
        "album": albumId,
        "albuns": albumId
      }
      Axios({
        url: url,
        data: data,
        method: "POST"
      })
      .then( (res) => {
        this.props.dispatch(toggleCarregando(false))
        this.props.dispatch(showAlert(true, true, 'disco adicionado'))
        this.setState({
          adicionado: true,
        })
      })
    } catch(erro) {
      this.props.dispatch(toggleCarregando(false))
      this.props.dispatch(showAlert(true, false, 'ocorreu um erro'))
    }
  }
  componentDidMount() {
    this.getDisco()
  }
  render() {
    return (
      <View style={styles.container}>

        {this.state.capa != '' &&
        <ScrollView style={GridStyle.scrollView}>
          <Image
            style={styles.capa}
            source={{
              uri: this.state.capa,
            }}
          />
          <View style={styles.containerContent}>
            {!this.state.adicionado &&
              <TouchableHighlight
                onPress = { () => { this.adicionarColecao() } }
                underlayColor = ""
                style = { [ BotoesStyle.botaoLinkBranco, { "marginBottom": 20 } ] }
              >
                <Text style = { BotoesStyle.textoBotaoLinkPrimaria } >Adicionar na Coleção</Text>
              </TouchableHighlight>
            }
            <Text style={styles.textoBold}>
              Albúm: <Text style={styles.texto}>{this.state.nome}</Text>
            </Text>
            <Text style={styles.textoBold}>
              Artista: <Text style={styles.texto}>{this.state.artista}</Text>
            </Text>
            <Text style={styles.textoBold}>
              Ano de Lançamento: <Text style={styles.texto}>{this.state.ano}</Text>
            </Text>
            <Text style={styles.textoBold}>
              Gênero: <Text style={styles.texto}>{this.state.genero}</Text>
            </Text>
          </View>
          <View style={styles.musicas}>
            <Text style={styles.textoBold}>Lado A</Text>
           { this.state.ladoa.map( (item, key) =>
            <Text style={styles.texto} key = {key}>
              { key + 1 }. { item }
            </Text>
           )}
           <Text style={[styles.textoBold, {marginTop: 20}]}>Lado B</Text>
           { this.state.ladob.map( (item, key) =>
            <Text style={styles.texto} key = {key}>
              { key + 1 }. { item }
            </Text>
           )}
          </View>
          {this.state.adicionado &&
            <View style={styles.botaoRemoverContainer}>
              <TouchableHighlight
                onPress = { () => { this.removerColecao() } }
                underlayColor = ""
                style = { [ BotoesStyle.botaoLinkBranco, { "marginBottom": 20 } ] }
              >
                <Text style = { BotoesStyle.textoBotaoLinkVermelho } >Remover da Coleção</Text>
              </TouchableHighlight>
            </View>
          }
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
  },
  botaoRemoverContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 70
  }
})
export default connect( state => ({estado: state}))(Disco);