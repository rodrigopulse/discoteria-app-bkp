import React from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Cores from '../../assets/styles/cores';
class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }
  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  }
  overlay = () => {
    this.setState({ open: !this.state.open });
  }
  deslogar = async () => {
    console.log('deslogar')
    try {
      const token = await AsyncStorage.removeItem('@DiscoteriaApp:token');
      this.props.navigation.navigate( 'Login' )
    } catch(error) {
      console.log(error)
    }
  }
  render() {
    return(
      <View style={styles.header}>
        <TouchableHighlight
          style={{width: 25, height: 25}}
          onPress = { () => { this.setState({ open: !this.state.open }) } }>
          <Image
            style={{width: 25, height: 25, resizeMode: "cover"}}
            source={require('../../assets/images/icons/baseline_menu_black_24dp.png')}/>
        </TouchableHighlight>
        {this.state.open &&
          <View style={styles.menu}>
            <View style={styles.menuContent}>
              <TouchableHighlight
                style={styles.botaoFechar}
                onPress = { () => { this.setState({ open: !this.state.open }) } }>
                <Image
                  style={{width: 25, height: 25, resizeMode: "cover"}}
                  source={require('../../assets/images/icons/baseline_cancel_black_18dp.png')}/>
              </TouchableHighlight>
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
                onPress = { () => { this.deslogar() }}>
                <Text style={styles.botaoSair}>Sair</Text>
              </TouchableHighlight>
            </View>
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    backgroundColor: Cores.corPrimaria,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "center",
    zIndex: 50,
    top: 0,
    paddingTop: 0
  },
  menu: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: "absolute",
    left: 0,
    top: 0,
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
    zIndex: 2
  },
  itemMenu: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  botaoSair: {
    color: Cores.corErro,
  },
  botaoFechar: {
    alignSelf: "flex-end"
  }
})

export default Header