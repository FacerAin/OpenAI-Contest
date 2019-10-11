import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Dimensions,Image } from 'react-native';
import styles from './rateStyles';
import Icon from 'react-native-vector-icons/FontAwesome';  
import Speedometer from 'react-native-speedometer-chart';
import {
    LineChart,
  } from 'react-native-chart-kit'
  
/*
Rating Page 디자인 개선
*/


//<Icon name="line-chart" style={{margin : 0, padding : 0,}} size={20} color={this.props.activeTintColor} />,
export default class RateScreen extends React.Component {
    render() {
      return (
        <>
        <View style={styles.container} >
        <View>
        <Speedometer 
        size={Dimensions.get('window').width}
        value={75} totalValue={100}
        showText
        showLabel
        textStyle= {{fontSize:40, color:"#072964"}}
        internalColor="#5f86c4"
        text="75점"/>
        </View>
        <View>
    <View style={styles.descontainer}>
      <Text style={styles.destitle}>다음에는 이렇게 검색해보면 어떨까요?</Text>
      <Text style={styles.deskeyword}>"경희대학교 학생수"</Text>
      <Text style={styles.destext}>검색단어는 필요한 단어로만 구성하여 간결할수록 좋습니다!</Text>
    </View>
  <LineChart
    data={{
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100
        ]
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    yAxisLabel={''}
    chartConfig={{
      backgroundColor: '##a4abb6',
      backgroundGradientFrom: '#babec5',
      backgroundGradientTo: '#828ea6',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
    </View>
    </View>
        </>
      );
    }
  }

RateScreen.navigationOptions = {
  title:'검색점수',
  tabBarIcon: 
  <Icon name="line-chart" style={{margin : 0, padding : 0,color:"#112d4e"}} size={20}/>,
}
