import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Dimensions,Image } from 'react-native';
import { SearchBar,Header  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';
import SafeAreaView from 'react-native-safe-area-view';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { isTSConstructSignatureDeclaration } from '@babel/types';
import Speedometer from 'react-native-speedometer-chart';
import {
    LineChart,
  } from 'react-native-chart-kit'




export default class RateScreen extends React.Component {
    static navigationOptions = {
        title:'검색점수',
        tabBarIcon: 
        <Icon name="line-chart" size={20} color="#000000" />,
    }
    render() {
      return (
        <>
    <View>

    </View>
        <View>
        <Speedometer 
        size={Dimensions.get('window').width}
        value={75} totalValue={100}
        showText
        showLabel
        textStyle= {{fontSize:40}}
        text="75점"/>
        </View>
        <View>
            <Text>검색 제안</Text>
        </View>
        <View>
    <Text>다음에는 이렇게 검색해보면 어떨까요?
    "경희대학교 학생수" 검색단어는 필요한 단어로만 구성하여 간결할 수록 좋습니다!</Text>
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
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#fb8c00',
      backgroundGradientTo: '#ffa726',
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
        </>
      );
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
        backgroundColor: '#b2f2bb',
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
    ratingpageheader:{
        backgroundColor: 'black'
    },
})