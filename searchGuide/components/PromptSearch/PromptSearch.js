import React from 'react';
import { View,Text, StyleSheet, Button,Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import { DARK_MAIN,LIGHT_MAIN, WHITE_MAIN} from 'react-native-dotenv';

const FirstSlide = () => (
    <View style={styles.slide1} >
        <Icon name='search' style={styles.icon} size={50} />
        <Text style={styles.text}>당신이 궁금해하는</Text>
        <Text style={styles.text}>질문을 검색하세요</Text>
        <Text style={styles.subtext}>길잡이가 당신의</Text>
        <Text style={styles.subtext}>질문을 이해할거에요</Text>
    </View>
)
const SecondSlide = () => (
    <View style={styles.slide2} >
        <Icon name='question' style={styles.icon} size={50} />
        <Text style={styles.text}>길잡이가 수정한</Text>
        <Text style={styles.text}>검색 문장을 확인하세요</Text>
        <Text style={styles.subtext}>길잡이는 항상 최적의</Text>
        <Text style={styles.subtext}>검색키워드를 제안합니다</Text>
    </View>
)
const ThirdSlide = () => (
    <View style={styles.slide3} >
        <Icon name='bar-chart' style={styles.icon} size={50} />
        <Text style={styles.text}>검색 점수와 그래프로</Text>
        <Text style={styles.text}>검색능력을 체크하세요</Text>
        <Text style={styles.subtext}>길잡이는 당신의</Text>
        <Text style={styles.subtext}>검색능력 향상시킵니다</Text>
    </View>
)
const LastSlide = () => (
    <View style={styles.slide4} >
        <Text style={styles.text}>내 손 안의 검색 도우미</Text>
        <Text style={styles.text}>길잡이에서</Text>
        <Text style={styles.subtext}>검색을 시작하세요!</Text>
    </View>
)

export default PromptSearch = () => {
    return(
        <>
        <Swiper style={styles.wrapper} 
        showsButtons={true} 
        loop={false} height={400}
        activeDotColor={LIGHT_MAIN}
        nextButton={<Text style={{color:'#3BAD87', fontSize:60}}>›</Text>}
        prevButton={<Text style={{color:'#3BAD87', fontSize:60}}>‹</Text>}
        >
            <FirstSlide />
            <SecondSlide />
            <ThirdSlide />
            <LastSlide />
        </Swiper>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'center',
      justifyContent:'center',
    },
    text:{
        marginBottom: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color:'#696969',
    },
    icon: {
        marginBottom: 20,
        color: '#696969'
    },
    subtext:{
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color:'#999999',
    },
    wrapper: {
        flex:1,
    },
    slide1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
    },
    slide2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
    },
    slide3: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#eee',
    },
    slide4: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
      },
  });