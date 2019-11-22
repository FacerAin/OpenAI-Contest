import React from 'react';
import {View,ActivityIndicator,StyleSheet,Dimensions, Modal} from 'react-native'

const Loading = () => {
    return (
        <Modal transparent={true} animationType={'none'}>
            <View style={styles.container}><ActivityIndicator size={80} color="#ffffff" style={styles.icon} /></View>
        </Modal>
      )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    height: Dimensions.get('window').height + 50,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'rgba(15,15,15,0.7)',
  },
  icon:{
    paddingBottom: 100,
  }
});


export default Loading;