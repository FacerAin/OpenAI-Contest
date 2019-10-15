import React, { Component } from 'react';
//import keywordSend from './util/datasend'
import { View, Text, StyleSheet, Button,Dimensions,Image,TextInput,TouchableOpacity } from 'react-native';
import {Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createAppContainer,NavigationEvents  } from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';
import SafeAreaView from 'react-native-safe-area-view';
import { isTSConstructSignatureDeclaration } from '@babel/types';
import HomeScreen from './components/home/home';
import RateScreen from './components/rate/rate';
import Searchbar from './components/Searchbar/Searchbar';
import AppContainer from './components/AppContainer/AppContainer';
import Constants from 'expo-constants';
import TestDataset from './test.json'
import styles from './AppStyles.js';
import axios from 'axios';
import { createStore } from 'redux';
import processApp from './reducer';
import { Provider } from 'react-redux';


const store = createStore(processApp);

store.subscribe( () => {
  console.log("State has changed"  + store.getState());
})

  /*

    */


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          search: '',
          dataset: TestDataset,
          fetching: false,
        }
        console.log('Render App')
    }

    render(){
        const { search } = this.state;
        const stateClone = Object.assign({},this.state.dataset)

        return (
            <>
            <Provider store={store}>
            <Searchbar />
            <SafeAreaView style={{flex: 1}}>
                <AppContainer screenProps={this.state.dataset}/>
            </SafeAreaView>
            </Provider>
            </>
        )
  }
}
/*
const mapStateProps = (state) => {
  return {
    data : state.processdata.data
  }
}

const mapDispatchProps = (dispatch) => {
  return {
    handleSetDataset: (data) => {dispatch(actions.setDataset(data))}
  }
}

*/

