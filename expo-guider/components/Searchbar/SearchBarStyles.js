import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
const styles = StyleSheet.create({
    statusBar:{ 
      height: Constants.statusBarHeight,
    },
    searchContainer:{
      backgroundColor: "#112d4e",
      margin: 0,
      padding: 0,
    },
    searchbar:{
      alignItems: "center",
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 70,
      paddingLeft: 0,
      paddingRight: 0,
    },
    searchText:{
      borderRadius:5,
      backgroundColor:'white',
      height:45,
      fontSize:20,
      flex: 1,
      paddingLeft: 15,
    },
    logo:{
      marginRight:10,
      marginLeft:10,
      borderWidth: 0,
      borderRadius: 12,
      padding:5,
      borderColor: "#ffffd2",
    },
    searchMic:{
      margin: 10,
    },
    searchBtn:{
      marginRight: 10,
    },
  })

  export default styles;