import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, Button, Dimensions, Image } from 'react-native';
import styles from './rateStyles';
import Icon from 'react-native-vector-icons/FontAwesome';  
import Speedometer from 'react-native-speedometer-chart';
import { LineChart, PieChart } from 'react-native-chart-kit'
const scoring = require('../../util/scoring');
  
/*
Rating Page 디자인 개선
*/
const chartConfig={
  backgroundColor: "#e26a00",
  backgroundGradientFrom: "#fb8c00",
  backgroundGradientTo: "#ffa726",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255 ${opacity})`,
  style: {
    borderRadius: 16
  }
}
//score: scoring(this.props.screenProps.return_data)

//<Icon name="line-chart" style={{margin : 0, padding : 0,}} size={20} color={this.props.activeTintColor} />,
export default class RateScreen extends React.Component {
    constructor(props) {
      console.log('Render SearchCard')
      super(props);
      this.state = {
        //score: this.props.screenProps.return_data
      }
      console.log(this.state)
    }
    render() {
      return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} >
        <View>
        <PieChart
          data={[
            {
              name: "맞춤법 점수",
              score: 20, //this.state.score.fixScore
              color: "#03A9F4",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
            {
              name: "키워드 점수",
              score: 30, //this.state.score.keywordScore,
              color: "#AB47BC",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15
            },
            { 
              name: "",
              score: 70, //100-(this.state.score.fixScore+this.state.score.keywordScore),
              color: "#BDBDBD",
              legendFontSize: 0
            }
          ]}
          width={Dimensions.get('window').width}
          height={200}
          chartConfig={chartConfig}
          accessor="score"
          backgroundColor="transparent"
          absolute
        />
        </View>
        <View>
          <View style={styles.descontainer}>
            <Text style={styles.destitle}>다음에는 이렇게 검색해보면 어떨까요?</Text>
            <Text style={styles.deskeyword}>"경희대학 학생수"</Text>
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
          </ScrollView>
        </SafeAreaView>
    );
  }
}
RateScreen.navigationOptions = {
  title:'검색점수',
  tabBarIcon: 
  <Icon name="line-chart" style={{margin : 0, padding : 0,color:"#112d4e"}} size={20}/>,
}
