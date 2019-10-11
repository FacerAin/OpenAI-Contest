import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
const styles = StyleSheet.create({
    statusBar:{ 
      height: Constants.statusBarHeight,
    },
    searchContainer:{
      marginLeft: 20,
      marginRight: 10
    },
    searchbar:{
      alignItems: "center",
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 50,
      paddingLeft: 10,
      paddingRight: 0,
    },
    searchText:{
      backgroundColor:'white',
      flex: 1,
    },
    searchMic:{
      margin: 10,
    },
    searchBtn:{
      padding: 0,
    },
  })

  export default styles;