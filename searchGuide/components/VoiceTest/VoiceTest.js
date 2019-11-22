import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import Voice from 'react-native-voice';
import * as Permissions from "expo-permissions";

/*
순수 react native 프로젝트로 변경후 업뎃 필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/
class VoiceTest extends Component {
  constructor(props) {
    super(props)
    Voice.onSpeechStart = this.onSpeechStartHandler;
    Voice.onSpeechEnd = this.onSpeechEndHandler;
    Voice.onSpeechResults = this.onSpeechResultsHandler;
    this.state = {
      showRecordButton: false,
      result: []
    }
  }

  async componentDidMount() {
    const { status, expires, permissions } = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING
    );
    if (status !== "granted") {
      //Permissions not granted. Don't show the start recording button because it will cause problems if it's pressed.
      this.setState({showRecordButton: false});
    } else {
      this.setState({showRecordButton: true});
    }
  }
  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
  onSpeechStartHandler = e => {
    console.log('onSpeechStart: ', e);
  };
  onSpeechEndHandler = e => {
    console.log('onSpeechEnd: ', e);
  };
  onSpeechResultsHandler = e => {
    console.log('onSpeechResults: ', e);
    this.setState({
      results: e.value,
    });
  }

  _startRecognizing = async () => {
    try {
      await Voice.start('ko-KR', {
        "RECOGNIZER_ENGINE": "GOOGLE",
         "EXTRA_PARTIAL_RESULTS": true
      });
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _cancelRecognizing = async () => {
    try {
      await Voice.cancel();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };

  _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };
  render(){
    return(
      <View>
        <TouchableHighlight onPress={this._startRecognizing}>
        <Text>Start Recognizing</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._stopRecognizing}>
          <Text>Stop Recognizing</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._cancelRecognizing}>
          <Text>Cancel</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._destroyRecognizer}>
          <Text>Destroy</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

export default VoiceTest;