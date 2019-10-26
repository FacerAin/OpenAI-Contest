import React, { Component } from 'react'; 
import { View, Text, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import styles from './rateStyles';
import Icon from 'react-native-vector-icons/FontAwesome';  
import { LineChart, PieChart } from 'react-native-chart-kit'
import scoring from '../../util/scoring';
import { connect } from'react-redux';
const sqlite = require("../../util/sqlite");

class RateScreen extends React.Component {
    constructor(props) {
      console.log('Render rate');
      super(props);
      this.state = {
        score:  {full: 0, key:0, fix:0, msg:""},
        dataset: {return_data:{keywordText:""}},
        pastScore: [0,0,0,0,0],
      }
    }

    dbReload = async () => {
      console.log("dbReload 실행");
      let temp = await sqlite.select();
      return(temp.map( elem => elem.score ));
    }

    /* static getDerivedStateFromProps = async (nextProps, prevState) => {
      console.log("getderived 들어옴")
      if( Object.keys(nextProps.value).length){
        let tempScore = scoring(nextProps.value.return_data).score;
        await sqlite.insert(tempScore.full);
        return { score: tempScore, dataset: nextProps.value, pastScore : temp }
      }
      return null;
    } */
    
    componentDidMount = async ()=>{
      let temp = await this.dbReload();
      this.setState({ pastScore : temp });
    }

    componentDidUpdate = async (prevProps) => {
      if (this.props.value.return_data !== prevProps.value.return_data) {
        let tempScore = scoring(this.props.value.return_data).score;
        await sqlite.insert(tempScore.full);
        let temp = await this.dbReload();
        this.setState({ score: tempScore, dataset: this.props.value, pastScore : temp })
    
      }
    }
    
    render = () => {
      return (
        <>
        {this.state.pastScore.length ? <SafeAreaView style={styles.container}>
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
          accessor="score"
          backgroundColor="transparent"
          absolute
          chartConfig={{
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(78, 183, 172, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 176, 255, ${opacity})`,
            style: { 
              borderRadius: 16
          }}}
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
                data: this.state.pastScore,
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
              },
              
            }}
            fromZero={true}
            style={{
              marginVertical: 8,
              borderRadius: 16,
              
            }}
          />
          </View>
          </View>
          </ScrollView>
        </SafeAreaView> : null}
        </>
    );
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