import React, { Component } from 'react';
import keywordSend from './util/datasend'
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
import AppContainer from './components/AppContainer/AppContainer';
import Constants from 'expo-constants';
import TestDataset from './test.json'
import styles from './AppStyles.js';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from 'react-native-chart-kit'

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
    sendSearch = () => {
      console.log('search')
      /*
      keywordSend(this.state.search)
      */
      }
    
      
    
    render(){
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
                <AppContainer screenProps={this.state.dataset} tintColor={this.props.tintColor}/>
            </SafeAreaView>
            </>
        )
    
  }
}



