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
import HomeScreen from './components/home/home';
import RateScreen from './components/rate/rate'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit'
const AppTabNavigator = createMaterialTopTabNavigator({
    Home: { screen: HomeScreen },
    Rate:{screen: RateScreen},
  }, {
    //swipeEnabled: true,
    //animationEnabled: true,
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    barStyle: { backgroundColor: '#694fad' },
    //order: ['Home','Rate']
    //shifting:true,
    tabBarOptions:{
        activeTintColor: 'orange',
        inactiveTintColor: 'grey',
        style:{
            backgroundColor:'#f2f2f2'
        },
        showIcon: true,
    },

    

  });



const AppContainer = createAppContainer(AppTabNavigator);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          search: '',
        }
    }
    updateSearch = search => {
      this.setState({ search });
    }
    render(){
        const { search } = this.state;
        return (
            <>
            <SearchBar
            placeholder="검색"
            onChangeText={this.updateSearch}
            value={search}
            
          />
            <SafeAreaView style={{flex: 1}}>
                <AppContainer />
            </SafeAreaView>
            </>
        )


    }
}

