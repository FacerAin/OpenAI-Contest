import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Dimensions,Image } from 'react-native';
export default class SearchCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
        }

        console.log(this.state.description)
    }
    render(){
        return (
            <>
                    <View style={styles.cardcontainer}>
                        <View style={styles.cardheader}>
                            <Image style={styles.cardlogo}
                                source={require('../img/wiki-logo.png')}
                            />
                            <View style={styles.cardtitle}>
                                <Text>위키백과</Text>
                                <Text>{this.state.title}</Text>
                            </View>
                        </View>
                        <View style={styles.cardbody}>
                            <Text style={styles.cardbodytext}>
                            {this.state.description}
                            </Text>
                        </View>
                        <View style={styles.cardfooter}>
                            <Text style={styles.cardfooterbt}>바로가기</Text>
                        </View>
                    </View>
                    </>
        )
}
}

const styles = StyleSheet.create({

    cardcontainer:{
        backgroundColor: '#F7F7F7',
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