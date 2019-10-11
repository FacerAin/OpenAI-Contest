import React from 'react';  
import {StyleSheet, Text, View,Button} from 'react-native';  
import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';  
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import HomeScreen from '../home/home';
import RateScreen from '../rate/rate';

const AppTabNavigator = createMaterialTopTabNavigator( 
    {
        Home: HomeScreen,
        Rate: RateScreen 
    }, 
    {
    //swipeEnabled: true,
    //animationEnabled: true,
    initialRouteName: 'Home',
    tabBarPosition: 'bottom',
    barStyle: { backgroundColor: '#ffffff' },
    //order: ['Home','Rate']
    //shifting:true,
    tabBarOptions:{
        activeTintColor: '#5f86c4',
        inactiveTintColor: '#000000',
        indicatorStyle: {
          backgroundColor: 'black'
        },
        style:{
            backgroundColor:'#f8f6f6',
            height: '10%',
            fontSize: 10,
            allowFontScaling : 'true'
        },
        tabStyle: {
          hegith: 30,
        },
        showIcon: true,
        labelStyle :{
          margin : 0, 
          padding : 0,
          fontSize: 10,
        },
        iconStyle :{
          margin : 0, 
          padding : 0,
        }
    },
});
const AppContainer = createAppContainer(AppTabNavigator);
export default AppContainer;  