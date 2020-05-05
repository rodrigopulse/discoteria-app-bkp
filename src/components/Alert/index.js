import React, { Component } from 'react';
import { TouchableOpacity, Text, Dimensions, StyleSheet, Image } from 'react-native';
//Estilos
import Cores from '../../assets/styles/cores';

export default class Alert extends Component {
  constructor( props ) {
    super( props )
  }
  close = () => {
    this.props.fecharAlert && this.props.fecharAlert();
  }
  render() {
    return (
      <TouchableOpacity style = { this.props.sucesso == true ? styles.alertSucesso : styles.alert } onPress = { () => this.close() } >
        <Text style = { styles.alertText } >
          { this.props.mensagem }
        </Text>
        <Image
          source = { require('../../assets/images/icons/baseline_close_white_18dp.png') }
          style = { styles.iconeAlert }
        >
        </Image>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  alert: {
    width: Dimensions.get( 'window' ).width,
    height: 50,
    backgroundColor: Cores.corErro,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    justifyContent: "center",
    display: "flex"
  },
  alertSucesso: {
    width: Dimensions.get( 'window' ).width,
    height: 50,
    backgroundColor: Cores.corPrimariaHover,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10,
    justifyContent: "center",
    display: "flex"
  },
  alertText: {
    width: "100%",
    fontSize: 16,
    textAlign: "center",
    padding: 0,
    color: "#fff"
  },
  iconeAlert: {
    width: 14,
    height: 14,
    alignSelf: "flex-end",
    right: 20,
    position: "absolute"
  }
})