import React from 'react';
import Axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import { View, Image, Text, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
//Components
import Carregando from '../../components/Carregando';
import TabBar from '../../components/TabBar';
import Header from '../../components/Header';
import Menu from '../../components/Menu';
import Alert from '../../components/Alert';
//Estilos
import Cores from '../../assets/styles/cores';
import GridStyle from '../../assets/styles/grid';

class Disco extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idColecao: '',
      showCarregando: true,
      showMenu: false,
      capa: '',
      nome: '',
      artista: '',
      ladoa: [],
      ladob: [],
      adicionado: false,
      showAlert: false,
      mensagemAlert: '',
      sucessoAlert: false
    }
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
  getDisco = async () => {
    let url = `${API_URL}/colecao/idalbum?id=${this.props.route.params.id}`
    Axios({
      url: url,
      method: "GET"
    })
    .then( (res) => {
      this.setState({
        showCarregando: false,
        adicionado: true,
        capa: res.data.data[0].albuns.capa,
        nome: res.data.data[0].albuns.nome,
        artista: res.data.data[0].albuns.artistas[0].nome,
        ladoa: res.data.data[0].albuns.ladoa,
        ladob: res.data.data[0].albuns.ladob,
        idColecao: res.data.data[0]._id
      })
    })
    .catch( () => {
      let url = `${API_URL}/albuns/id?id=${this.props.route.params.id}`;
      Axios({
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
          ladob: res.data.data[0].ladob,
          idColecao: res.data.data[0]._id
        })
      })
    })
  }
  removerColecao = async () => {
    this.setState({
      showCarregando: true
    })
    console.log('adicionar coleção')
    try {
      const url = `${API_URL}/colecao/delete/${this.state.idColecao}`
      Axios({
        url: url,
        method: "POST"
      })
      .then( (res) => {
        this.setState({
          adicionado: false,
          showAlert: true,
          mensagemAlert: "Disco removido da Coleção",
          sucessoAlert: true,
          showCarregando: false
        })
      })
    } catch(erro) {
      this.setState({
        showAlert: true,
        mensagemAlert: "Ocorreu um erro",
        showCarregando: false
      })
    }
  }
  adicionarColecao = async () => {
    this.setState({
      showCarregando: true
    })
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
        this.setState({
          adicionado: true,
          showAlert: true,
          mensagemAlert: "Disco adicionado",
          showCarregando: false,
          sucessoAlert: true,
        })
      })
    } catch(erro) {
      this.setState({
        showAlert: true,
        mensagemAlert: "Ocorreu um erro",
        showCarregando: false
      })
    }
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
        { this.state.showAlert &&
          <Alert mensagem = { this.state.mensagemAlert } sucesso = {this.state.sucessoAlert} fecharAlert = { this.closeAlert }/>
        }
        {this.state.capa != '' &&
        <ScrollView style={GridStyle.scrollView}>
          {this.state.showMenu && <Menu navigation = {this.props.navigation} toggleOpen={this.toggleOpen} /> }
          <Header toggleOpen={this.toggleOpen} />
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
        <TabBar navigation={ this.props.navigation } />
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
export default Disco