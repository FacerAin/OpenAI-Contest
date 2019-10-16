import React, { Component } from 'react';
import { View, TextInput,TouchableOpacity,Keyboard,TouchableHighlight,Text  } from 'react-native';
import SendToApi from '../../util/datasend'
import styles from './SearchBarStyles'
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {setData} from '../../action'
import {setLoading} from '../../action'
import * as Permissions from 'expo-permissions'
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

class Searchbar extends React.Component{
    constructor(props) {
        super(props);
        this.recording = null;
        this.state = {
            search: '',
            dataset: {
              test: "TEST",
            },
            isRecording: false,
            recordingDuration: null, 
            volume: 1.0,
            rate: 1.0,
        }
        this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY))
    }
    componentDidMount() {
      this._askForPermissions()
    }    
    _askForPermissions = async () => {
      const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      this.setState({
        haveRecordingPermissions: response.status === 'granted',
      });
    };

    _updateScreenForRecordingStatus = status => {
      if (status.canRecord) {
        this.setState({
          isRecording: status.isRecording,
          recordingDuration: status.durationMillis,
        });
      } else if (status.isDoneRecording) {
        this.setState({
          isRecording: false,
          recordingDuration: status.durationMillis,
        });
        if (!this.state.isLoading) {
          this._stopRecordingAndEnablePlayback()
        }
      }
    };


    async _stopPlaybackAndBeginRecording() {
      this.setState({
        isLoading: true,
      });
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      });
      if (this.recording !== null) {
        this.recording.setOnRecordingStatusUpdate(null)
        this.recording = null
      }
  
      const recording = new Audio.Recording()
      await recording.prepareToRecordAsync(this.recordingSettings)
      recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus)
  
      this.recording = recording;
      await this.recording.startAsync()
      this.setState({
        isLoading: false,
      });
    }
    async _stopRecordingAndEnablePlayback() {
      this.setState({
        isLoading: true,
      });
      try {
        await this.recording.stopAndUnloadAsync()
      } catch (error) {
        // Do nothing -- we are already unloaded.
      }
      const info = await FileSystem.getInfoAsync(this.recording.getURI());
      console.log(`FILE INFO: ${JSON.stringify(info)}`)
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        playsInSilentLockedModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: true,
      })

      const { sound, status } = await this.recording.createNewLoadedSoundAsync(
        {
          isLooping: true,
          isMuted: this.state.muted,
          volume: this.state.volume,
          rate: this.state.rate,
          shouldCorrectPitch: this.state.shouldCorrectPitch,
        },
        this._updateScreenForSoundStatus
      );
      this.sound = sound;
      this.setState({
        isLoading: false,
      });
    }

    _onRecordPressed = () => {
      if (this.state.isRecording) {
        this._stopRecordingAndEnablePlayback();
      } else {
        this._stopPlaybackAndBeginRecording();
      }
    };

    _getMMSSFromMillis(millis) {
      const totalSeconds = millis / 1000;
      const seconds = Math.floor(totalSeconds % 60);
      const minutes = Math.floor(totalSeconds / 60);
  
      const padWithZero = number => {
        const string = number.toString();
        if (number < 10) {
          return '0' + string;
        }
        return string;
      };
      return padWithZero(minutes) + ':' + padWithZero(seconds);
    }

    _getRecordingTimestamp() {
      if (this.state.recordingDuration != null) {
        return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
      }
      return `${this._getMMSSFromMillis(0)}`;
    }

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
        this.props.dispatch(setLoading(false))
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

            <TouchableHighlight
              onPress={this._onRecordPressed}
              disabled={this.state.isLoading}>
              <Text>Recording</Text>
            </TouchableHighlight>
              <Text>
                {this.state.isRecording ? 'LIVE' : ''}
              </Text>
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
