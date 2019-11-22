import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet,View } from 'react-native';

export default PromptSearchRate = () => (
    <View style={{alignItems:'center'}}>
        <Text  style={styles.Text}>아직까지 검색</Text>
        <Text  style={styles.Text}>결과가 없습니다!</Text>
    </View>
)


const styles = StyleSheet.create({
    Text:{
        fontSize: 20,
        color: '#123422'
    },

});