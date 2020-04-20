import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

//Estilos
import Cores from '../../assets/styles/cores';
import { TouchableHighlight } from 'react-native-gesture-handler';

class TabBar extends React.Component {
  render() {
    return (
      <View style={styles.tabBar}>
        <TouchableHighlight style={styles.botaoTabBar}>
          <View style={styles.viewTabItem}>
            <Image
              style={{width: 25, height: 25, resizeMode: "cover"}}
              source={require('../../assets/images/icons/baseline_album_black_24dp.png')}/>
            <Text style={styles.textoBotao}>Coleção</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight>
          <View style={styles.viewTabItem}>
            <Image
              style={{width: 25, height: 25, resizeMode: "cover"}}
              source={require('../../assets/images/icons/baseline_list_black_24dp.png')}/>
            <Text style={styles.textoBotao}>Desejos</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.botaoTabBar}>
          <View style={styles.viewTabItem}>
            <Image
              style={{width: 25, height: 25, resizeMode: "cover"}}
              source={require('../../assets/images/icons/baseline_add_black_24dp.png')}/>
            <Text style={styles.textoBotao}>Adicionar</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.botaoTabBar}>
          <View style={styles.viewTabItem}>
            <Image
              style={{width: 25, height: 25, resizeMode: "cover"}}
              source={require('../../assets/images/icons/baseline_search_black_24dp.png')}/>
            <Text style={styles.textoBotao}>Buscar</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  tabBar: {
    width: "100%",
    //flex: 1,
    height: 50,
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    left: 0,
    backgroundColor: Cores.corPrimaria,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    //paddingTop: 10,
    //paddingBottom: 10
  },
  textoBotao: {
    fontSize: 12
  },
  viewTabItem: {
    alignItems: "center"
  }
})
export default TabBar