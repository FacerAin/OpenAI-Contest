
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Dimensions,Image,TextInput,TouchableOpacity } from 'react-native';
import { SearchBar,Header  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer } from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { isTSConstructSignatureDeclaration } from '@babel/types';
import HomeScreen from './components/home/home';
import RateScreen from './components/rate/rate';
import Constants from 'expo-constants';
import TestDataset from './test.json'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit'



const AppTabNavigator = createMaterialTopTabNavigator( {
    Home: { screen : HomeScreen },
    Rate: { screen : RateScreen },
  }, {
    //swipeEnabled: true,
    //animationEnabled: true,
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    barStyle: { backgroundColor: '#000000' },
    //order: ['Home','Rate']
    //shifting:true,
    tabBarOptions:{
        activeTintColor: '#5f86c4',
        inactiveTintColor: '#000000',
        indicatorStyle: {
          backgroundColor: 'black'
        },
        style:{
            backgroundColor:'#f6f8f9',
            height: '8%',
            allowFontScaling : 'true'
        },
        tabStyle: {
          hegith: 30,
        },
        showIcon: true,
        labelStyle :{
          margin : 0, 
          padding : 0,
          fontSize: 10,
        },
        iconStyle :{
          margin : 0, 
          padding : 0,
        }
    },
  });

const AppContainer = createAppContainer(AppTabNavigator);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          search: '',
          dataset: TestDataset,
        }
    }
    updateSearch = search => {
      this.setState({ search });
      console.log(this.state.search)
    }
    sendSearch = search => {
      console.log('sendSearch')
      async function getSearchRate() {
        /*
        try{
          let response = await fetch("http://localhost:3001/search");
          let responseJson = await response.json();
          return responseJson.movies;
        } catch(error) {
          console.error(error);
        }
        */
      }
      
    }
/*App navigator를 통해서 Props를 넘기는 방안은?*/ 
    render(){
      console.log(this.state.dataset.return_data.searchResults)
      console.log(this.state.dataset.return_data.searchResults.length)
        const { search } = this.state;
        return (
            <>
            <View style={styles.statusBar}/>
            <View style={styles.searchContainer}>
            <View style={styles.searchbar}>
              <TextInput
              style = {styles.searchText}
              autoCorrect= {false}
              placeholder = '검색'
              value = {this.state.search}
              onChangeText={this.updateSearch}
              onSubmitEditing = {this.sendSearch}
              />
            <TouchableOpacity style={styles.searchMic} onPressOut={this.sendSearch}>
            <Icon name="microphone" size={30} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchBtn} onPressOut={this.sendSearch}>
            <Icon name="search" size={30} color="#000000" />
            </TouchableOpacity>
            </View>
            </View>
            <SafeAreaView style={{flex: 1}}>
                <AppContainer activeTintColor={this.props.activeTintColor}/>
            </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
  statusBar:{ 
    height: Constants.statusBarHeight,
  },
  searchContainer:{
    marginLeft: 20,
    marginRight: 10
  },
  searchbar:{
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingLeft: 10,
    paddingRight: 0,
  },
  searchText:{
    backgroundColor:'white',
    flex: 1,
  },
  searchMic:{
    margin: 10,
  },
  searchBtn:{
    padding: 0,
  },
})
