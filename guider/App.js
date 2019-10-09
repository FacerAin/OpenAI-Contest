import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Dimensions,Image,TextInput,TouchableOpacity } from 'react-native';
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

    render(){
        const { search } = this.state;
        return (
            <>
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
            <Icon name="microphone" size={20} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchBtn} onPressOut={this.sendSearch}>
            <Icon name="search" size={20} color="#000000" />
            </TouchableOpacity>
            </View>
            </View>
            <SafeAreaView style={{flex: 1}}>
                <AppContainer />
            </SafeAreaView>
            </>
        )


    }
}

const styles = StyleSheet.create({
  searchContainer:{
        marginLeft: 20,
        marginRight: 20,
  },
  searchbar:{
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchText:{
    flex: 1,
  },
  searchMic:{
    margin: 5,
  },
  searchBtn:{
    padding: 5,
  },
})
