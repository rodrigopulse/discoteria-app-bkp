import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, ScrollView, Image } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import Axios from 'axios';
//Componentes
import Carregando from '../../components/Carregando';
import TabBar from '../../components/TabBar';
import Header from '../../components/Header';
//Estilos
import BotoesStyle from '../../assets/styles/botoes';
import FormStyle from '../../assets/styles/forms';
import Cores from '../../assets/styles/cores';

class AdicionarDisco2 extends React.Component {
  state = {
    inputLadoA: [],
    inputLadoB: [],
    musicasLadoA: [],
    musicasLadoB: [],
    showCarregando: false,
    idArtista: this.props.route.params.idArtista,
    //capaAtiva para colocar o estilo de qual foi selecionada
    capaAtiva: 80,
    //Enviar a url para a api
    capaAlbum: '',
    titulo: '',
    capaAlbumApi: []
  }
  constructor(props) {
    super(props)
  }
  toggleOpen = (e) => {
    this.setState({
      showMenu: !this.state.showMenu
    });
  }
  addLadoA = (key) => {
    let textInput = this.state.inputLadoA;
    textInput.push(
      <TextInput
        key={key}
        onEndEditing = {(e) => this.state.musicasLadoA.splice(key, 1, e.nativeEvent.text)}
        style={ [ FormStyle.inputs100, FormStyle.inputMarginBottom ] }
      />
    );
    this.setState({ textInput })
  }
  addLadoB = (key) => {
    let textInput = this.state.inputLadoB;
    textInput.push(
      <TextInput
        key={key}
        onEndEditing = {(e) => this.state.musicasLadoB.splice(key, 1, e.nativeEvent.text)}
        style={ [ FormStyle.inputs100, FormStyle.inputMarginBottom ] }
      />
    );
    this.setState({ textInput })
  }
  salvarDisco = () => {
    console.log('salvar disco');
    console.log(this.state.musicasLadoA);
    console.log(this.state.musicasLadoB);
    const url = `${API_URL}/albuns/cadastra`
    let data = {
      nome: this.state.titulo,
      ladoa: this.state.musicasLadoA,
      ladob: this.state.musicasLadoB,
      artistas: [this.state.idArtista],
      capa: this.state.capaAlbum
    }
    Axios({
      url: url,
      data: data,
      method: "POST"
    })
    .then( (res) => {
      console.log("Cadastrado com sucesso: ", res)
    })
    .catch( (res) => {
      console.log("Erro: ", res)
    })
  }
  getCoverAlbum = () => {
    Axios({
      url: `http://ws.audioscrobbler.com/2.0/?method=album.search&album=${this.state.titulo}&limit=5&api_key=d4cec9807eef062df88539eed5f01da2&format=json`,
      method: "GET"
    })
    .then( (res) => {
      console.log(res.data.results.albummatches.album)
      this.setState({
        capaAlbumApi: res.data.results.albummatches.album
      })
    })
  }
  capa = (uri, index) => {
    this.setState({
      capaAtiva: index,
      capaAlbum: uri
    })
  }
  render() {
    return (
      <View style={styles.container}>
        { this.state.showCarregando &&
          <Carregando />
        }
        <ScrollView style={GridStyle.scrollView}>
          <Header toggleOpen={this.toggleOpen} />
          <View style={GridStyle.content}>
            <Text style={styles.label}>Título do Álbum</Text>
            <TextInput
              onChangeText = { ( text => this.setState( { titulo: text, showAlert: false } ) ) }
              style={ [ FormStyle.inputs100, FormStyle.inputMarginBottom ] }
            />
            <Text style={styles.label}>Músicas Lado A</Text>
            {this.state.inputLadoA.map((value, index) => {
              return value
            })}
            <TouchableHighlight
              onPress={() => this.addLadoA(this.state.inputLadoA.length)}
              style={[BotoesStyle.botaoPadraoPrimaria, styles.botaoAdd,]}
              underlayColor={Cores.corPrimariaHover}
            >
              <Text style={BotoesStyle.textoBotaoLinkBranco, styles.botaoAddTexto}>+</Text>
            </TouchableHighlight>
            <Text style={styles.label}>Músicas Lado B</Text>
            {this.state.inputLadoB.map((value, index) => {
              return value
            })}
            <TouchableHighlight
              onPress={() => this.addLadoB(this.state.inputLadoB.length)}
              style={[BotoesStyle.botaoPadraoPrimaria, styles.botaoAdd,]}
              underlayColor={Cores.corPrimariaHover}
            >
              <Text style={BotoesStyle.textoBotaoLinkBranco, styles.botaoAddTexto}>+</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress = { () => { this.getCoverAlbum() } }
              underlayColor = { Cores.corPrimariaHover }
              style = { [ BotoesStyle.botaoPadraoPrimaria, BotoesStyle.botao100, { "marginBottom": 40, "marginTop": 30 } ] }
            >
              <Text style = { BotoesStyle.textoBotaoPadraoPrimaria } >Procurar Capa</Text>
            </TouchableHighlight>
            <View style={styles.containerCapa}>
              {this.state.capaAlbumApi.map((res, index) =>
                <TouchableHighlight
                  style={this.state.capaAtiva == index ? styles.botaoCapaAtivo : styles.botaoCapa}
                  onPress = { () => { this.capa(res.image[3]['#text'], index) } }
                  underlayColor = ''
                >
                  <Image
                    style={styles.capa}
                    source={{
                      uri: res.image[3]['#text'],
                    }}
                  />
                </TouchableHighlight>
              )}
            </View>
            <TouchableHighlight
              onPress = { () => { this.salvarDisco() } }
              underlayColor = { Cores.corPrimariaHover }
              style = { [ BotoesStyle.botaoPadraoPrimaria, BotoesStyle.botao100, { "marginBottom": 40, "marginTop": 30 } ] }
            >
              <Text style = { BotoesStyle.textoBotaoPadraoPrimaria } >Salvar</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
        <TabBar navigation={this.props.navigation} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Cores.corSecundaria,
    flex: 1,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10
  },
  capa: {
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1,
    resizeMode: "cover"
  },
  botaoCapa: {
    width: '20%'
  },
  botaoCapaAtivo: {
    borderColor: Cores.corPrimariaHover,
    borderWidth: 2,
    width: '20%'
  },
  containerCapa: {
    flexDirection: 'row',
    alignContent: "stretch",
    flex: 1
  },
  botaoAdd: {
    width: '100%',
    height: 30,
    backgroundColor: Cores.corPrimaria,
    marginBottom: 15
  },
  botaoAddTexto: {
    textAlign: 'center'
  }
})
export default AdicionarDisco2