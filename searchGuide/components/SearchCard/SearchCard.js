import React from 'react';
import { DARK_MAIN,LIGHT_MAIN, WHITE_MAIN} from 'react-native-dotenv';
import { Avatar, Button, Card, Title, Paragraph, Text } from 'react-native-paper';
import {Linking, Image, StyleSheet } from 'react-native';

const SearchIcon = (props) => {
  switch(props.site){
    case 'naver.com':
      return(<Image source={require('../../assets/img/naver-logo.png')} style={styles.image}/>)
    case 'google.com':
      return(<Image source={require('../../assets/img/google-logo.png')} style={styles.image}/>)
    case 'namu.wiki':
      return(<Image source={require('../../assets/img/namu-logo.png')} style={styles.image}/>)
    case 'facebook.com':
      return(<Image source={require('../../assets/img/facebook-logo.png')} style={styles.image}/>)
    case 'ko.wikipedia.org':
      return(<Image source={require('../../assets/img/wiki-logo.png')} style={styles.image}/>)
    case 'youtube.com':
      return(<Image source={require('../../assets/img/youtube-logo.png')} style={styles.image}/>)
    default:
      return(<Image source={require('../../assets/img/etc-logo.png')} style={styles.image}/>)
  }
}
  


const SearchCard = (props) => (
  <Card style={{marginTop:10, marginLeft:10, marginRight:10}}>
    <Card.Title title={props.title}
    left={ () => ( <SearchIcon site={props.site} /> ) } />
    <Card.Content>
      <Paragraph>{props.content}</Paragraph>
    </Card.Content>
    <Card.Actions style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text style={{marginTop:7, marginLeft: 10,fontStyle:'italic'}}>정확도 : {props.metric}%</Text>
        <Button mode='contained' color= {LIGHT_MAIN} labelStyle={{color:WHITE_MAIN}} onPress={()=>{Linking.openURL(props.url)}}>
        자세히보기
        </Button>
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  image:{
    width: 45,
    height: 45,
    borderRadius: 100
  }
});


export default SearchCard;