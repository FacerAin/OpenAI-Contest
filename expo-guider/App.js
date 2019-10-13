import React, { Component } from 'react';
//import keywordSend from './util/datasend'
import { View, Text, StyleSheet, Button,Dimensions,Image,TextInput,TouchableOpacity } from 'react-native';
import { SearchBar,Header  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer,NavigationEvents  } from 'react-navigation';
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
import axios from 'axios';

import { func } from 'prop-types';

SendToApi = async(searchdata) => {
  return new Promise((resolve,reject) => {
    axios(
      {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        url: 'http://192.168.0.40:3000/api/cliConnection',
        data: {
          data:{
            text: searchdata
          }
        },
        method: "POST",
      }
    )
    .then((response)=>{
      resolve(JSON.stringify(response.data))
    })
  })

  /*
    .then(response => {
      console.log("Success response");
      return JSON.stringify(response.data)
    })
    .catch(error => {
      console.error(error);
    });
    */

  }

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          search: '',
          dataset: TestDataset,
          fetching: false,
        }
    }
    updateSearch = search => {
      this.setState({ search });
      console.log(this.state.search)
    }
    asyncstate = (state) => {
      return new Promise((resolve,reject) => {
        this.setState({dataset:state},resolve)
      }).then(()=>{
        console.log(this.state)
        console.log('done')
      })
    }
    /*
    로딩 구현하기*/
    sendSearch = async() => {
      let resdata = await SendToApi(this.state.search)
      await this.asyncstate(resdata)
    }
    sendVoice = () =>{
      console.log(this.state)
    }
    render(){
        const { search } = this.state;
        const stateClone = Object.assign({},this.state.dataset)

        return (
    
            <>
            <View style={styles.statusBar}/>
            <View style={styles.searchContainer}>
            <View style={styles.searchbar}>
            <TouchableOpacity style={styles.logo}>
            <Icon name="arrow-right" size={30} color="#dbe2ef" />
            </TouchableOpacity>       
              <TextInput
              style = {styles.searchText}
              autoCorrect= {false}
              placeholder = '  검색'
              value = {this.state.search}
              onChangeText={this.updateSearch}
              onSubmitEditing = {this.sendSearch}
              />
            <TouchableOpacity style={styles.searchMic} onPressOut={this.sendVoice}>
            <Icon name="microphone" size={30} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchBtn} onPressOut={this.sendSearch}>
            <Icon name="search" size={30} color="#ffffff" />
            </TouchableOpacity>
            </View>
            </View>
            <SafeAreaView style={{flex: 1}}>
                <AppContainer screenProps={stateClone} tintColor={this.props.tintColor}/>
            </SafeAreaView>
            </>
        )
    
  }
}



