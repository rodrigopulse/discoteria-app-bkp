import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Cores from '../../assets/styles/cores';
class Carregando extends React.Component {
  render() {
    return (
      <View style={styles.containerCarregando}>
        <Image style={{width: 280, height: 280, resizeMode: "cover"}} source={require('../../assets/images/carregando.gif')}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  containerCarregando: {
    height: "100%",
    width: "100%",
    backgroundColor: "#21242D",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    left:     0,
    top:      0,
  },
})
export default Carregando;