import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Cores from '../../assets/styles/cores';
import { connect } from 'react-redux';
import * as RootNavigation from '../../../RootNavigation.js';
//Actions
import { showMenu } from '../../store/actions/menu';
import { logado } from '../../store/actions/logado';
class Menu extends React.Component {
  constructor(props) {
    super(props)
  }
  deslogar = async () => {
    try {
      await AsyncStorage.removeItem('@DiscoteriaApp:token');
      this.fecharMenu();
      this.props.dispatch(logado(false));
      RootNavigation.navigate('Login');
    } catch(error) {
      console.log(error)
    }
  }
  fecharMenu = () => {
    this.props.dispatch(showMenu(false))
  }
  render() {
    return (
      <View style={ this.props.estado.showMenu ? styles.menu : styles.menuNone}>
        <TouchableHighlight
          style={styles.overlay}
          onPress = { () => { this.fecharMenu() } }
          underlayColor = ""
        >
          <View style={styles.overlay}></View>
        </TouchableHighlight>
        <View style={styles.menuContent}>

          <TouchableHighlight
            style={styles.itemMenu}
            onPress = { () => {
              this.fecharMenu();
              RootNavigation.navigate('Busca');
            } }
            underlayColor = "#efefef">
            <Text>Buscar</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.itemMenu}>
            <Text>Meu Perfil</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.itemMenu}
            onPress = { () => {
              this.fecharMenu();
              //this.props.navigation.replace('Colecao');
              RootNavigation.navigate('Colecao');
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
              this.fecharMenu();
              RootNavigation.navigate('AdicionarDisco1');
            } }
            underlayColor = "#efefef">
            <Text>Adicionar Disco</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.itemMenu}
            onPress = { () => {
              this.fecharMenu();
              RootNavigation.navigate('AdicionarArtista');
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
    left: 0,
    paddingTop: 0,
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, .8)"
  },
  menuNone: {
    display: "none"
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
export default connect( state => ({estado: state}))(Menu);