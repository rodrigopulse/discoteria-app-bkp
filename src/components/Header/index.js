import React from 'react';
import { View, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Cores from '../../assets/styles/cores';
class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log("estado: ", this.props.estado);
    return(
      <View style={styles.header}>
        <TouchableHighlight
          style={{width: 35, height: 35, borderRadius: 100, justifyContent: "center", alignItems: "center"}}
          onPress = { this.toggleOpen }
          underlayColor = {Cores.corPrimariaHover}
        >
          <Image
            style={{width: 25, height: 25, resizeMode: "cover"}}
            source={require('../../assets/images/icons/baseline_menu_black_24dp.png')}/>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 50,
    backgroundColor: Cores.corPrimaria,
    paddingLeft: 10,
    paddingRight: 20,
    justifyContent: "center",
    position: "absolute",
    zIndex: 10,
    top: 0,
    paddingTop: 0
  }
})

export default connect( state => ({estado: state}))(Header);