import React  from 'react';
import { TouchableOpacity, Text, Dimensions, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
//Actions
import { showAlert } from '../../store/actions/alert';
//Estilos
import Cores from '../../assets/styles/cores';

class Alert extends React.Component{
  constructor(props) {
    super(props)
  }
  render(){
    return (
      <TouchableOpacity
        style = { [
          styles.alert,
          this.props.estado.sucessoAlert == true ? styles.alertSucesso : '',
          this.props.estado.showAlert == true ? styles.alertAtivo : styles.alertNone
        ]}
        onPress = { () => this.props.dispatch(showAlert(false, false, '')) }
      >
        <Text style = { styles.alertText } >
          { this.props.estado.mensagemAlert}
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
    top: 0,
    left: 0,
    zIndex: 10,
    justifyContent: "center",
    position: "absolute",
    zIndex: 20,
  },
  alertSucesso: {
    backgroundColor: Cores.corPrimariaHover,
  },
  alertNone: {
    top: -50
  },
  alertAtivo: {
    top: 0
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
export default connect( state => ({ estado: state }))(Alert);