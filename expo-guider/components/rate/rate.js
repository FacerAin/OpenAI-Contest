import React, { Component } from 'react';
import {createAppContainer} from 'react-navigation';  
import { View, Text, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import styles from './rateStyles';
import Icon from 'react-native-vector-icons/FontAwesome';  
import { LineChart, PieChart } from 'react-native-chart-kit'
import scoring from '../../util/scoring';
import { connect } from'react-redux';

import Styled from 'styled-components/native';
import SQLite from 'react-native-sqlite-storage';

/*
Rating Page 디자인 개선
*/


const chartConfig={
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(78, 183, 172, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 176, 255, ${opacity})`,
  style: {
    borderRadius: 16
  }
}
//score: scoring(this.props.screenProps.return_data)

//<Icon name="line-chart" style={{margin : 0, padding : 0,}} size={20} color={this.props.activeTintColor} />,
class RateScreen extends React.Component {
    constructor(props) {
      console.log('Render rate')
      super(props);
      
      const db = SQLite.openDatabase(
        {
          name: 'score.db',
        },
        () => {},
        error => {
          console.log(error);
        }
      );

      this.state = {
        score: {},
        dataset: {},
        db
      }
      this.props.navigation.setParams({
        done: this.componentDidMount,
      })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if(Object.keys(nextProps.value).length){
          return {score: scoring(nextProps.value.return_data).score, 
            dataset: nextProps.value
      }
    }
      return null
  }

    render() {
      return (
        <>
        {Object.keys(this.state.score).length ? <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} >
        <View style={styles.pieChart}>
        <PieChart
          data={[
            {
              name: "맞춤법 점수",
              score: this.state.score.fix,
              color: "#f4a462",
              legendFontColor: "#000000",
              legendFontSize: 17
            },
            {
              name: "키워드 점수",
              score: this.state.score.key,
              color: "#a7dadc",
              legendFontColor: "#000000",
              legendFontSize: 17
            },
            { 
              name: "",
              score: 100-(this.state.score.fix+this.state.score.key),
              color: "#f4f2bd",
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
          <Text style={styles.desScoreText}>당신의 점수는 <Text style={styles.desScore}>{this.state.score.full}</Text> 점입니다!</Text>
          <Text style={styles.desText}>{this.state.score.msg}</Text>
        </View>
        <View>
          <View style={styles.desContainer}>
            <Text style={styles.desTitle}>다음에는 이렇게 검색해보면 어떨까요?</Text>
            <Text style={styles.desKeyword}>"{this.state.dataset.return_data.keywordText}"</Text>           
          </View>
        <View style={styles.lineChart}>
        <Text style={styles.lineText}>점수 기록</Text>
        <LineChart
          data={{
            labels: [""],
            datasets: [{
              data: [
                10,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                95
              ]
            }]
          }}
          legend={{
            enabled: true,
            textSize: 50,
          }}
          width={Dimensions.get('window').width * 0.90} // from react-native
          height={220}
          chartConfig={{
            backgroundColor: '#ffccd5',
            backgroundGradientFrom: '#ffccd5',
            backgroundGradientTo: '#ffccd5',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            }
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
        </View>
          </View>
          </ScrollView>
        </SafeAreaView> : null}
        </>
    );
  }

  componentDidMount() {
    const { db } = this.state;

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM test;', [], (tx, results) => {
        const rows = results.rows;
        let users = [];

        for (let i = 0; i < rows.length; i++) {
          users.push({
            ...rows.item(i),
          });
        }

        this.setState({ users });
      });
    });
  }

}
RateScreen.navigationOptions = {
  title:'검색점수',
  tabBarIcon: 
  <Icon name="line-chart" style={{margin : 0, padding : 0,color:"#112d4e"}} size={20}/>,
}

let mapStateToProps = (state) => {
  return {
      value : state.processdata.data
  }
}

export default connect(mapStateToProps)(RateScreen)