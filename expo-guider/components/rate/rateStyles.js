import { StyleSheet,Dimensions } from 'react-native';

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: '#f8f6f6',
    },
    container:{
        flex: 1,
    },
    pieChart:{
        padding:10,
        margin: 10,
        borderRadius:10,
        alignItems: "center",
        backgroundColor : "#f4f2bd"
    },
    lineChart: {
        backgroundColor: "#ffccd5",
        borderRadius:10,
        alignItems: "center",
        margin :10,
    },
    wordList:{
        flex: 1,
        backgroundColor: "#ffffff",
    },
    lineText: {
        color: "#4b5b68",
        fontSize: 25,
        fontWeight: "bold",
        padding:10
    },
    desContainer:{
        margin: 10,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: "#dbe2ef",
        paddingTop :10,
        paddingBottom :5,
        borderRadius :10,
    },
    errorText:{
        padding: 10,
    },
    desScoreText:{
        textAlign: 'center',
        color: "#4b5b68",
        paddingTop: 10,
        fontSize: 23,
    },
    desScore:{
        fontSize: 35,
        fontWeight: "bold",
        color: '#5f86c4',
    },
    desText:{
        textAlign: 'center',
        padding: 5,
        lineHeight: 30,
        fontSize: 25,
        fontWeight: 'bold',
    },
    desTitle:{
        color: "#4b5b68",
        fontSize: 20,
    },
    desKeyword:{
        textAlign: 'center',
        lineHeight: 35,
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
    },
})
  
export default styles;