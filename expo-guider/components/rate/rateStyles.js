import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#f8f6f6",
    },
    cardcontainer:{
        backgroundColor: '#F7F7F7',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#b5cdfc',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
  
        height: 200,
        margin: 10,
        flexDirection: 'column'
    },
    cardheader:{
        flex : 1.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardbody:{
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardbodytext:{
        padding: 15
    },
    cardfooter:{
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'center'
    },
    cardfooterbt:{
        padding: 10
    },
    cardlogo:{
        margin: 5,
        padding: 10,
        width: 50,
        height: 50,
        borderRadius:50/2
    },
    cardtitle:{
        flex: 4,
        padding: 10,
        justifyContent: 'center'
    },
    cardtext:{
  
    },
  
    ratingcontainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#b2f2bb',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    ratingtext:{
        padding: 10,
        height: 50,
        flex: 5,
        justifyContent: 'center',
    },
    ratingspec:{
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        flex: 1.8,
    },
    ratingcancel: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        flex: 1,
    },
    ratingpageheader:{
        backgroundColor: 'black'
    },
    descontainer:{
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        margin: 20,      
    },
    destitle:{
        fontWeight: 'bold',
        fontSize: 15,
        padding: 20,
    },
    deskeyword:{
        fontWeight: 'bold',
        fontSize: 30,
    },
    destext:{
        margin: 10,
        textAlign: 'center',
    },
})
  
export default styles;