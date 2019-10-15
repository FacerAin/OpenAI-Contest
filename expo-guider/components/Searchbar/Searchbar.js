import React, { Component } from 'react';
import { View, Text, StyleSheet, Button,Dimensions,Image,TextInput,TouchableOpacity } from 'react-native';
import SendToApi from '../../util/datasend'
import styles from './SearchBarStyles'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setData} from '../../action'

class Searchbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            dataset: {
              test: "TEST",
            },
            fetching: false,
        }
    }
    updateSearch = search => {
        this.setState({ search });
        console.log(this.state.search)
      }
      asyncstate = (res) => {
        return new Promise((resolve,reject)=>{
          this.setState({
            dataset: res
          })
          resolve();
        })
      }
      sendSearch = async() => {
        console.log('sendSearch')
        let resdata = await SendToApi(this.state.search)
        await this.asyncstate(resdata)
        await this.props.dispatch(setData(this.state.dataset))
      }
      sendVoice = () =>{
        console.log(this.props.value)
      }

      render(){
          return(
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
              </>
          )
      }
}
let mapStateToProps = (state) => {
    return {
        value : state.processdata.data
    }
}
export default connect(mapStateToProps)(Searchbar)
