import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Cores from '../../assets/styles/cores';

class Menu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  deslogar = async () => {
    try {
      await AsyncStorage.removeItem('@DiscoteriaApp:token');
      this.props.toggleOpen && this.props.toggleOpen();
      this.props.navigation.navigate('Login')
    } catch(error) {
      console.log(error)
    }
  }
  fecharMenu = () => {
    this.props.toggleOpen && this.props.toggleOpen();
  }
  render() {
    return (
      <View style={styles.menu}>
        <TouchableHighlight
          style={styles.overlay}
          onPress = { () => { this.fecharMenu() } }
          underlayColor = ""
        >
          <View style={styles.overlay}></View>
        </TouchableHighlight>
        <View style={styles.menuContent}>

          <TouchableHighlight
            style={styles.itemMenu}>
            <Text>Meu Perfil</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.itemMenu}
            onPress = { () => {
              this.props.toggleOpen && this.props.toggleOpen();
              this.props.navigation.replace('Colecao');
            } }
            underlayColor = "#efefef">
            <Text>Minha Coleção</Text>
          </TouchableHighlight>

          <TouchableHighlight
            underlayColor = "#efefef"
            style={styles.itemMenu}>
            <Text>Lista de Desejos</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.itemMenu}
            onPress = { () => {
              this.props.toggleOpen && this.props.toggleOpen();
              this.props.navigation.replace('AdicionarDisco1');
            } }
            underlayColor = "#efefef">
            <Text>Adicionar Disco</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.itemMenu}
            onPress = { () => {
              this.props.toggleOpen && this.props.toggleOpen();
              this.props.navigation.replace('AdicionarArtista');
            } }
            underlayColor = "#efefef">
            <Text>Adicionar Artista</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.itemMenu}
            onPress = { this.deslogar }
            underlayColor = "#efefef" >
            <Text style={styles.botaoSair}>Sair</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  menu: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 20,
    top: 0,
    paddingTop: 0,
    backgroundColor: "rgba(0, 0, 0, .8)"
  },
  overlay: {
    width: Dimensions.get('window').width - 250,
    height: Dimensions.get('window').height,
    position: 'absolute',
    right: 0,
    top: 0
  },
  menuContent: {
    width: 250,
    height: Dimensions.get('window').height,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingRight: 10,
    position: "absolute",
    left: 0,
    top: 0,
  },
  itemMenu: {
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
  },
  botaoSair: {
    color: Cores.corErro,
  },
  botaoFechar: {
    alignSelf: "flex-end",
    width: 35,
    height: 35,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center"
  }
})
export default Menu