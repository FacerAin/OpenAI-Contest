import React from 'react';
import { View, Text} from 'react-native';
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome';
import RateSentence from '../RateSentence/RateSentence';
import RateBar from '../RateBar/RateBar';
import RateLine from '../RateLine/RateLine';
import scoring from '../../lib/scoring';

const Rate = ({score}) => {
    return(
        <View style={{flex: 1, backgroundColor:'#eee', margin:0,padding:0, justifyContent:'center',alignItems:'center'}}>
            <RateSentence />
            <RateBar score={score}/>
            <RateLine />
        </View>
    )
}

const RateContainer = ({score}) => {
    return(<Rate score={score} />)
}

RateContainer.navigationOptions={
    title:'평가',
   tabBarIcon: ({tintColor})=> (<Icon name="bar-chart-o" color={tintColor}   style={{marginLeft:0.5}} size={20} />),
}

export default connect(
    ({search})=>({
        score: scoring(search.result.return_data)
    })
)(RateContainer);