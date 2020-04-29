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
  toggleOpen = () => {
    console.log("abreMenu");
    this.setState({ open: !this.state.open });
  }
  overlay = () => {
    this.setState({ open: !this.state.open });
  }
  deslogar = async () => {
    try {
      await AsyncStorage.removeItem('@DiscoteriaApp:token');
      this.props.navigation.navigate( 'Login' )
    } catch(error) {
      console.log(error)
    }
  }
  render() {
    return (
      <View style={styles.menu}>
        <View style={styles.menuContent}>
          <TouchableHighlight
            style={styles.itemMenu}>
            <Text>Meu Perfil</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.itemMenu}>
            <Text>Minha Coleção</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.itemMenu}>
            <Text>Lista de Desejos</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.itemMenu}>
            <Text>Adicionar Disco</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.itemMenu}
            onPress = { this.deslogar }>
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
    backgroundColor: "#000"
  },
  menuContent: {
    width: 250,
    height: Dimensions.get('window').height,
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 10,
    position: "absolute",
    left: 0,
    top: 0,
  },
  itemMenu: {
    width: "100%",
    paddingTop: 20,
    paddingBottom: 20,
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