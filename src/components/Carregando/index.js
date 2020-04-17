import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Carregando extends React.Component {
  render() {
    return (
      <View style={styles.containerCarregando}>
        <Text style={styles.texto}>
          Carregando
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  containerCarregando: {
    height: "100%",
    width: "100%",
    backgroundColor: "#000",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    left:     0,
    top:      0,
  },
  texto: {
    color: "#fff"
  }
})
export default Carregando;