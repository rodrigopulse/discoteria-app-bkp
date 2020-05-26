import React from 'react';
import { API_URL, IMAGENS_ALBUNS } from 'react-native-dotenv';
import { View, StyleSheet, Image, Text, TouchableHighlight } from 'react-native';

class Card extends React.Component {
  constructor(props) {
    super(props)
  }
  goDisco = () => {
    this.props.navigation.replace('Disco', {id: this.props.id})
  }
  render() {
    return (
      <View style={styles.card}>
        <TouchableHighlight
        underlayColor = "#efefef"
        onPress = { this.goDisco }>
          <View style={styles.cardContent}>
            <Image
              style={styles.capa}
              source={{
                uri: `${IMAGENS_ALBUNS}/${this.props.capa}`,
              }}
            />
            <View style={styles.cardTextos}>
              <Text style={styles.nomeArtista}>{this.props.artista}</Text>
              <Text style={styles.nomeAlbum}>{this.props.album}</Text>
            </View>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  card: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 20
  },
  cardContent: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  nomeArtista: {
    fontSize: 14,
  },
  nomeAlbum: {
    fontSize: 14,
    fontWeight: "700"
  },
  capa: {
    width: '20%',
    height: undefined,
    aspectRatio: 1 / 1,
    resizeMode: "cover"
  },
  cardTextos: {
    width: '80%',
    paddingLeft: 10
  }
})
export default Card