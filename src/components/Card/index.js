import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

class Card extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View style={styles.card}>
         <Image
          style={styles.capa}
          source={{
            uri: this.props.capa,
          }}
          />
          <View style={styles.cardContent}>
            <Text style={styles.nomeArtista}>{this.props.artista}</Text>
            <Text style={styles.nomeAlbum}>{this.props.album}</Text>
          </View>
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
    padding: 20
  },
  nomeArtista: {
    fontSize: 14,
  },
  nomeAlbum: {
    fontSize: 14,
    fontWeight: "700"
  },
  capa: {
    width: '100%',
    height: undefined,
    aspectRatio: 1 / 1,
    resizeMode: "cover"
  }
})
export default Card