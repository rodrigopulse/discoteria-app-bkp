import { StyleSheet, Dimensions } from "react-native";
import Cores from './cores.js';
export default GridStyle = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 50,
    zIndex: 0,
  },
  container: {
    paddingTop: 50,
    backgroundColor: Cores.corSecundaria,
    flex: 1,
    zIndex: 1
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})