import React, { Component } from 'react';
import { View, Text, Button, Dimensions, Image, Linking } from 'react-native';
import styles from './searchcardStyles';
// #dcefdf 네이버
// #f3f3f2 구글
// #e3e7e8 위키피디아
// #dbe2ef 페이스북
// #e9f1f0 짱무갓키

export default class SearchCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            url: this.props.url,
        }
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
                            <Text style={styles.cardfooterbt} onPress={() => Linking.openURL(this.state.url)}>바로가기</Text>
                        </View>
                    </View>
                    </>
        )
}
}

