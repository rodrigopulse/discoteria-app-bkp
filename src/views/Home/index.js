import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//Componentes
import TabBar from '../../components/TabBar';
//Estilos
import BotoesStyle from '../../assets/styles/botoes';
import Cores from '../../assets/styles/cores';
class Home extends React.Component {
  deslogar = async () => {
    try {
      const token = await AsyncStorage.removeItem('@DiscoteriaApp:token');
      this.props.navigation.navigate( 'Login' )
    } catch(error) {
      console.log(error)
    }
  }
  render() {
    return(
      <View style={styles.container}>
        <TabBar />
        <TouchableHighlight
          onPress = { () => { this.deslogar() } }
          underlayColor = { Cores.corPrimariaHover }
          style = { [ BotoesStyle.botaoPadraoPrimaria, { "marginBottom": 15 } ] }
        >
          <Text style = { BotoesStyle.textoBotaoPadraoPrimaria } >Deslogar</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Cores.corSecundaria,
    flex: 1,
  },
})
export default Home