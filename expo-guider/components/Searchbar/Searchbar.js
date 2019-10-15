import React, { Component } from 'react';
import { View, TextInput,TouchableOpacity,Keyboard  } from 'react-native';
import SendToApi from '../../util/datasend'
import styles from './SearchBarStyles'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setData} from '../../action'
import {setLoading} from '../../action'
import Voice from 'react-native-voice'


class Searchbar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            dataset: {
              test: "TEST",
            },
            fetching: false,
            recognized: '',
            pitch: '',
            error: '',
            end: '',
            started: '',
            results: [],
            partialResults: [],
        }
    }
    componentWillUnmount() {
      Voice.destroy().then(Voice.removeAllListeners);
    }
    onSpeechStart = e => {
      console.log('onSpeechStart: ', e);
      this.setState({
        started: '√',
      });
    };
    onSpeechEnd = e => {
      console.log('onSpeechEnd: ', e);
      this.setState({
        end: '√',
      });
    };
    onSpeechResults = e => {
      console.log('onSpeechResults: ', e);
      this.setState({
        results: e.value,
      });
    };
    onSpeechPartialResults = e => {
      console.log('onSpeechPartialResults: ', e);
      this.setState({
        partialResults: e.value,
      });
    };
    onSpeechError = e => {
      console.log('onSpeechError: ', e);
      this.setState({
        error: JSON.stringify(e.error),
      });
    };

    updateSearch = search => {
        this.setState({ search });
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
        Keyboard.dismiss()
        this.props.dispatch(setLoading(true))
        let resdata = await SendToApi(this.state.search)
        await this.asyncstate(resdata)
        await this.props.dispatch(setLoading(false))
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
              placeholder = '검색'
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
        value : state.processdata.data,
        isLoading: state.processdata.isLoading
    }
}
export default connect(mapStateToProps)(Searchbar)
