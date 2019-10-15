import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    cardheader:{
        flex : 1.3,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardcontainer:{
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    
        height: 250,
        margin: 10,
        flexDirection: 'column'
    },
    cardbody:{
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardtitlebox:{
        margin:10,
        borderBottomWidth:1,
        borderBottomColor:"#84899a"
    },
    cardtitle:{
        flex: 4,
        margin: 10,
        justifyContent: 'center'
    },
    cardtitleconfidence: {
        margin: 10,
    },
    cardtitlesite:{
        lineHeight: 25,
        fontSize: 23
    },
    cardtitletext:{
        lineHeight: 27,
        fontSize: 23,
        fontWeight: 'bold',
        paddingLeft: 10,
        marginBottom: 10,
    },
    cardbodytext:{
        lineHeight: 20,
        fontSize: 15,
        paddingLeft: 20,
        paddingRight: 10,
    },

    cardfooter:{
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'center'
    },

    cardfooterbt:{
        margin: 3,
        marginRight : 6,
        padding: 3,
        fontWeight : 'bold',
        fontSize: 15,
        backgroundColor: 'rgba(217, 227, 221, 0.5)',
    },

    cardlogo:{
        margin: 5,
        padding: 10,
        width: 50,
        height: 50,
        borderRadius:50/2
    },

})

export default styles;