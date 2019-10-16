import React, { Component } from 'react';
//import keywordSend from './util/datasend'
import SafeAreaView from 'react-native-safe-area-view';
import Searchbar from './components/Searchbar/Searchbar';
import AppContainer from './components/AppContainer/AppContainer';
import TestDataset from './test.json'
import { createStore } from 'redux';
import processApp from './reducer';
import { Provider } from 'react-redux';
import * as Permissions from 'expo-permissions'

const store = createStore(processApp);

store.subscribe( () => {
  console.log("State has changed"  + store.getState());
})

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
