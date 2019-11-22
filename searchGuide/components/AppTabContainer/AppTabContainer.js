import React from 'react';
import { DARK_MAIN,LIGHT_MAIN, WHITE_MAIN} from 'react-native-dotenv';
import {createAppContainer} from 'react-navigation';  
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Home from '../Home/Home';
import Rate from '../Rate/Rate';


const AppTabNavigator = createMaterialTopTabNavigator (
    {
        Home: Home,
        Rate: Rate
    },
    {
        initialRouteName: 'Home',
        tabBarPosition: 'bottom',
        tabBarOptions:{
            activeTintColor: WHITE_MAIN,
            inactiveTintColor: DARK_MAIN,
            indicatorStyle: {
                backgroundColor: WHITE_MAIN,
            },
            style:{
                backgroundColor:LIGHT_MAIN,
                allowFontScaling : 'true'
            },
            showIcon: true,
            tabStyle: {
                height: 60,
            },
            labelStyle :{
                margin : 0, 
                padding : 0,
                fontSize: 15,
            },
            iconStyle :{
                margin : 0, 
                padding : 0,
            }
        },
    }
);
const AppTabContainer = createAppContainer(AppTabNavigator);
export default AppTabContainer;