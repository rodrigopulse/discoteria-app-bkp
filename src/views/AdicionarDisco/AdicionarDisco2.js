import React from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableHighlight, ScrollView, Image, Icon } from 'react-native';
import { API_URL } from 'react-native-dotenv';
import Axios from 'axios';
import { connect } from 'react-redux';
//Componentes
import {Picker} from '@react-native-community/picker';
//Actions
import { toggleCarregando } from '../../store/actions/carregando';
//Estilos
import BotoesStyle from '../../assets/styles/botoes';
import FormStyle from '../../assets/styles/forms';
import Cores from '../../assets/styles/cores';

class AdicionarDisco2 extends React.Component {
  state = {
    inputLadoA: [],
    inputLadoB: [],
    chaveLadoA: 0,
    chaveLadoB: 0,
    musicasLadoA: [],
    musicasLadoB: [],
    idArtista: this.props.route.params.idArtista,
    //capaAtiva para colocar o estilo de qual foi selecionada
    capaAtiva: 80,
    //Enviar a url para a api
    capaAlbum: '',
    titulo: '',
    ano: '',
    genero: '',
    capaAlbumApi: []
  }
  constructor(props) {
    super(props)
  }

  addLadoA = (key) => {
    let textInput = this.state.inputLadoA;
    textInput.push(
      <TextInput
        key={key}
        onEndEditing = {(e) => this.state.musicasLadoA.splice(this.state.chaveLadoA, 1, e.nativeEvent.text)}
        style={ [ FormStyle.inputs100, FormStyle.inputMarginBottom ] }
      />
    );
    this.setState({ textInput, chaveLadoA: this.state.chaveLadoA + 1 })
    console.log(this.state.chaveLadoA)
  }
  removeLadoA = () => {
    let textInput = this.state.inputLadoA;
    textInput.splice(this.state.inputLadoA.length - 1 , 1)
    this.setState({ textInput, chaveLadoA: this.state.chaveLadoA - 1 })
    this.state.musicasLadoA.splice(this.state.chaveLadoA - 1, 1)
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
  removeLadoB = () => {
    let textInput = this.state.inputLadoB;
    textInput.splice(this.state.inputLadoB.length - 1 , 1)
    this.setState({ textInput, chaveLadoB: this.state.chaveLadoB - 1 })
    this.state.musicasLadoB.splice(this.state.chaveLadoB - 1, 1)
  }
  salvarDisco = () => {
    this.props.dispatch(toggleCarregando(true))
    const url = `${API_URL}/albuns/cadastra`
    let data = {
      nome: this.state.titulo,
      ladoa: this.state.musicasLadoA,
      ladob: this.state.musicasLadoB,
      artistas: [this.state.idArtista],
      capa: this.state.capaAlbum,
      ano: this.state.ano,
      genero: this.state.genero
    }
    Axios({
      url: url,
      data: data,
      method: "POST"
    })
    .then( (res) => {
      this.props.dispatch(toggleCarregando(false))
      this.props.navigation.replace('Disco', {id: res.data.data._id})
    })
    .catch( (res) => {
      this.props.dispatch(toggleCarregando(false))
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
        <ScrollView style={GridStyle.scrollView}>

          <KeyboardAvoidingView style={GridStyle.content}>
            <Text style={styles.label}>Título do Álbum</Text>
            <TextInput
              autoCapitalize = "words"
              onChangeText = { ( text => this.setState( { titulo: text } ) ) }
              style={ [ FormStyle.inputs100, FormStyle.inputMarginBottom ] }
            />
            <Text style={styles.label}>Ano de Lançamento</Text>
            <TextInput
              keyboardType = 'numeric'
              maxLength = {4}
              placeholder = 'Exemplo: 1970'
              onChangeText = { ( text => this.setState( { ano: text } ) ) }
              style={ [ FormStyle.inputs100, FormStyle.inputMarginBottom ] }
            />
            <Text style={styles.label}>Gênero</Text>
            <View style={[FormStyle.inputMarginBottom, { borderRadius: 10, overflow: "hidden", backgroundColor: "#fff", paddingLeft: 20 }]}>
              <Picker
                selectedValue={ this.state.genero }
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ genero: itemValue })
                }>
                <Picker.Item label="Selecione" value="Selecione" />
                <Picker.Item label="Rock" value="Rock" />
                <Picker.Item label="Blues" value="Blues" />
                <Picker.Item label="Jazz" value="Jazz" />
                <Picker.Item label="MPB" value="MPB" />
                <Picker.Item label="Samba" value="Samba" />
              </Picker>
            </View>

            <Text style={styles.label}>Músicas Lado A</Text>
            {this.state.inputLadoA.map((value, index) => {
              return value
            })}

            <TouchableHighlight
              onPress={() => this.removeLadoA(this.state.inputLadoA.length)}
              style={[BotoesStyle.botaoPadraoPrimaria, styles.botaoRemove,]}
              underlayColor={Cores.corPrimariaHover}
            >
              <Text style={BotoesStyle.textoBotaoLinkBranco, styles.botaoAddTexto}>-</Text>
            </TouchableHighlight>

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
              onPress={() => this.removeLadoB(this.state.inputLadoB.length)}
              style={[BotoesStyle.botaoPadraoPrimaria, styles.botaoRemove,]}
              underlayColor={Cores.corPrimariaHover}
            >
              <Text style={BotoesStyle.textoBotaoLinkBranco, styles.botaoAddTexto}>-</Text>
            </TouchableHighlight>

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
                  key = {index}
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
          </KeyboardAvoidingView>
        </ScrollView>

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
  botaoRemove: {
    width: '100%',
    height: 30,
    backgroundColor: Cores.corErro,
    marginBottom: 15
  },
  botaoAddTexto: {
    textAlign: 'center'
  }
})

export default connect( state => ({estado: state}))(AdicionarDisco2);