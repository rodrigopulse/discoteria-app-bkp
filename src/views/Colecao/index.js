import React from 'react';
import { View, StyleSheet} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//Componentes
import TabBar from '../../components/TabBar';
import Header from '../../components/Header';
import Card from '../../components/Card';

//Estilos
import Cores from '../../assets/styles/cores';
import GridStyle from '../../assets/styles/grid';
class Colecao extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <Header navigation={this.props.navigation}/>
        <ScrollView style={GridStyle.scrollView}>
          <View style={GridStyle.content}>
            <Card
              capa = "https://www.mixfmpoa.com.br/wp-content/uploads/2019/09/A-116-01comp.jpg"
              artista = "The Beatles"
              album = "Abbey Road"
            />
          </View>
        </ScrollView>
        <TabBar />
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
export default Colecao