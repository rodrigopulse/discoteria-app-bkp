import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight, ScrollView, Button } from 'react-native';
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
    showCarregando: false,
    idArtista: this.props.route.params.idArtista,
    titulo: ''
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
    textInput.push(<TextInput key={key} style={ [ FormStyle.inputs100, FormStyle.inputMarginBottom ] }/>);
    this.setState({ textInput })
  }
  addLadoB = (key) => {
    let textInput = this.state.inputLadoB;
    textInput.push(<TextInput key={key} style={ [ FormStyle.inputs100, FormStyle.inputMarginBottom ] }/>);
    this.setState({ textInput })
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