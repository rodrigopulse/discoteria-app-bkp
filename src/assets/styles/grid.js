import { StyleSheet, Dimensions } from "react-native";

export default GridStyle = StyleSheet.create({
  scrollView: {
    height: Dimensions.get('window').height - 50,
    zIndex: 0
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  }
})