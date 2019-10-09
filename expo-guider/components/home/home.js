//SearchCard Component 분리

import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Dimensions,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title:'초기화면',
        tabBarIcon: 
        <Icon name="home" style={{margin : 0, padding : 0,}} size={20} color={this.props.activeTintColor} />,
    }
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searchdataset: '',
        }

    }
    updateSearch = search => {
        this.setState({ search });
    }

    render() {
        const { search } = this.state;
        return (
            <> 
                <View style={styles.container}>
                    <View style={styles.ratingcontainer}>
                        <View style={styles.ratingtext}>
                            <Text style={{color: '#fdfcfc'}}>당신의 검색점수는 %d점 입니다.</Text>
                        </View>
                        <View style={styles.ratingspec}>
                            <Text style={{color: '#fdfcfc'}}>자세히 보기</Text>
                        </View>
                        <View style={styles.ratingcancel}>
                            <Text style={{color: '#fdfcfc'}}>X</Text>
                        </View>
                    </View>
                
                    <View style={styles.cardcontainer}>
                        <View style={styles.cardheader}>
                            <Image style={styles.cardlogo}
                                source={require('../img/wiki-logo.png')}
                            />
                            <View style={styles.cardtitle}>
                                <Text>위키백과</Text>
                            </View>
                        </View>
                        <View style={styles.cardbody}>
                            <Text style={styles.cardbodytext}>
                            동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
                            </Text>
                        </View>
                        <View style={styles.cardfooter}>
                            <Text style={styles.cardfooterbt}>바로가기</Text>
                        </View>
                    </View>


                    <View style={styles.cardcontainer}>
                        <View style={styles.cardheader}>
                            <Image style={styles.cardlogo}
                                source={require('../img/wiki-logo.png')}
                            />
                            <View style={styles.cardtitle}>
                                <Text>위키백과</Text>
                            </View>
                        </View>
                        <View style={styles.cardbody}>
                            <Text style={styles.cardbodytext}>
                                동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세
                            </Text>
                        </View>
                        <View style={styles.cardfooter}>
                            <Text style={styles.cardfooterbt}>바로가기</Text>
                        </View>
                    </View>


           
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    },

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

    ratingcontainer:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#5f86c4',
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

    ratingpageheader: {
        backgroundColor: 'black'
    },
})