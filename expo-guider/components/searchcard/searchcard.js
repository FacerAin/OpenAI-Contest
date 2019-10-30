import React, { Component } from 'react';
import { View, Text, Image, Linking } from 'react-native';
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
            confidence: this.props.confidence,
            site: this.props.site,
        }
    }
    render(){
        switch(this.props.site) {
            case 'naver.com':
                return (
                    <>
                    <View style={[styles.cardcontainer ,{backgroundColor: "#dcefdf"}]}>
                        <View style={styles.cardheader}>
                            <Image style={styles.cardlogo}
                            source={require('../img/naver-logo.png')}
                            />
                            <View style={styles.cardtitle}>
                                <Text style={styles.cardtitlesite}>네이버</Text>                       
                            </View>      
                            <Text style={styles.cardtitleconfidence}>정확도 : {Math.round(this.props.confidence*100)}%</Text>
                        </View>
                        <View style ={styles.cardtitlebox}>
                            <Text style={styles.cardtitletext}>· {this.props.title}</Text>
                        </View>
                        <View style={styles.cardbody}>
                            <Text style={styles.cardbodytext}>
                            {this.props.description}
                            </Text>
                        </View>
                        <View style={styles.cardfooter}>
                            <Text style={styles.cardfooterbt} onPress={() => Linking.openURL(this.props.url)}>바로가기</Text>
                        </View>
                    </View>
                    </>
                )
            case 'google.com':
                return (
                    <>
                    <View style={[styles.cardcontainer ,{backgroundColor: "#f3f3f2"}]}>
                        <View style={styles.cardheader}>
                            <Image style={styles.cardlogo}
                            source={require('../img/google-logo.png')}
                            />
                            <View style={styles.cardtitle}>
                                <Text style={styles.cardtitlesite}>구글</Text>                       
                            </View>      
                            <Text style={styles.cardtitleconfidence}>정확도 : {Math.round(this.props.confidence*100)}%</Text>
                        </View>
                        <View style ={styles.cardtitlebox}>
                            <Text style={styles.cardtitletext}>· {this.props.title}</Text>
                        </View>
                        <View style={styles.cardbody}>
                            <Text style={styles.cardbodytext}>
                            {this.props.description}
                            </Text>
                        </View>
                        <View style={styles.cardfooter}>
                            <Text style={styles.cardfooterbt} onPress={() => Linking.openURL(this.props.url)}>바로가기</Text>
                        </View>
                    </View>
                    </>
                )
            case 'namu.wiki':
                return (
                    <>
                    <View style={[styles.cardcontainer ,{backgroundColor : "#e9f1f0"}]}>
                        <View style={styles.cardheader}>
                            <Image style={styles.cardlogo}
                            source={require('../img/namu-logo.png')}
                            />
                            <View style={styles.cardtitle}>
                                <Text style={styles.cardtitlesite}>나무위키</Text>                       
                            </View>    
                            <Text style={styles.cardtitleconfidence}>정확도 : {Math.round(this.props.confidence*100)}%</Text>
                        </View>
                        <View style ={styles.cardtitlebox}>
                            <Text style={styles.cardtitletext}>· {this.props.title}</Text>
                        </View>
                        <View style={styles.cardbody}>
                            <Text style={styles.cardbodytext}>
                            {this.props.description}
                            </Text>
                        </View>
                        <View style={styles.cardfooter}>
                            <Text style={styles.cardfooterbt} onPress={() => Linking.openURL(this.props.url)}>바로가기</Text>
                        </View>
                    </View>
                    </>
                )
            
            case 'facebook.com':
                return (
                    <>
                    <View style={[styles.cardcontainer ,{backgroundColor: "#dbe2ef"}]}>
                        <View style={styles.cardheader}>
                            <Image style={styles.cardlogo}
                            source={require('../img/facebook-logo.png')}
                            />
                            <View style={styles.cardtitle}>
                                <Text style={styles.cardtitlesite}>페이스북</Text>                       
                            </View>      
                            <Text style={styles.cardtitleconfidence}>정확도 : {Math.round(this.props.confidence*100)}%</Text>
                        </View>
                        <View style ={styles.cardtitlebox}>
                            <Text style={styles.cardtitletext}>· {this.props.title}</Text>
                        </View>
                        <View style={styles.cardbody}>
                            <Text style={styles.cardbodytext}>
                            {this.props.description}
                            </Text>
                        </View>
                        <View style={styles.cardfooter}>
                            <Text style={styles.cardfooterbt} onPress={() => Linking.openURL(this.props.url)}>바로가기</Text>
                        </View>
                    </View>
                    </>
                )
    
            case 'ko.wikipedia.org':
                return (
                    <>
                    <View style={[styles.cardcontainer ,{backgroundColor: "#e3e7e8"}]}>
                        <View style={styles.cardheader}>
                            <Image style={styles.cardlogo}
                            source={require('../img/wiki-logo.png')}
                            />
                            <View style={styles.cardtitle}>
                                <Text style={styles.cardtitlesite}>위키피디아</Text>                       
                            </View> 
                            <Text style={styles.cardtitleconfidence}>정확도 : {Math.round(this.props.confidence*100)}%</Text>
                        </View>
                        <View style ={styles.cardtitlebox}>
                            <Text style={styles.cardtitletext}>· {this.props.title}</Text>
                        </View>
                        <View style={styles.cardbody}>
                            <Text style={styles.cardbodytext}>
                            {this.props.description}
                            </Text>
                        </View>
                        <View style={styles.cardfooter}>
                            <Text style={styles.cardfooterbt} onPress={() => Linking.openURL(this.props.url)}>바로가기</Text>
                        </View>
                    </View>
                    </>
                )
            case 'youtube.com':
                return (
                <>
                <View style={[styles.cardcontainer ,{backgroundColor: "#fee1e1"}]}>
                    <View style={styles.cardheader}>
                        <Image style={styles.cardlogo}
                        source={require('../img/youtube-logo.png')}
                        />
                        <View style={styles.cardtitle}>
                            <Text style={styles.cardtitlesite}>유튜브</Text>                       
                        </View> 
                        <Text style={styles.cardtitleconfidence}>정확도 : {Math.round(this.props.confidence*100)}%</Text>
                    </View>
                    <View style ={styles.cardtitlebox}>
                        <Text style={styles.cardtitletext}>· {this.props.title}</Text>
                    </View>
                    <View style={styles.cardbody}>
                        <Text style={styles.cardbodytext}>
                        {this.props.description}
                        </Text>
                    </View>
                    <View style={styles.cardfooter}>
                        <Text style={styles.cardfooterbt} onPress={() => Linking.openURL(this.state.url)}>바로가기</Text>
                    </View>
                </View>
                </>
            )
            default:
                return (
                    <>
                    <View style={[styles.cardcontainer ,{backgroundColor : "#e9f1f0"}]}>
                        <View style={styles.cardheader}>
                            <Image style={styles.cardlogo}
                            source={require('../img/etc-logo.png')}
                            />
                            <View style={styles.cardtitle}>
                                <Text style={styles.cardtitlesite}>기타 사이트</Text>                       
                            </View>   
                            <Text style={styles.cardtitleconfidence}>정확도 : {Math.round(this.props.confidence*100)}%</Text>
                        </View>
                        <View style ={styles.cardtitlebox}>
                            <Text style={styles.cardtitletext}>· {this.props.title}</Text>
                        </View>
                        <View style={styles.cardbody}>
                            <Text style={styles.cardbodytext}>
                            {this.props.description}
                            </Text>
                        </View>
                        <View style={styles.cardfooter}>
                            <Text style={styles.cardfooterbt} onPress={() => Linking.openURL(this.props.url)}>바로가기</Text>
                        </View>
                    </View>
                    </>
                )
        }
    }
}

