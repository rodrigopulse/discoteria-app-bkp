import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const Carregando = ({ estado }) => {
  return (
    <View style={ estado.carregando ? styles.containerCarregando : styles.carregandoNone}>
      {estado.carregando &&
        <Image
          style={{width: 280, height: 280, resizeMode: "cover"}}
          source={require('../../assets/images/carregando.gif')}
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  containerCarregando: {
    height: "100%",
    width: "100%",
    backgroundColor: "#21242D",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    left:     0,
    top:      0,
  },
  carregandoNone: {
    display: "none"
  }
})
export default connect( state => ({ estado: state }))(Carregando);