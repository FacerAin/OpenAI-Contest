import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    cardcontainer:{
        backgroundColor: '#e9f1f0',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
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
})

export default styles;