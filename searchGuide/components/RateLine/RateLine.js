import React, {useEffect} from 'react';
import { Surface, Text,Divider} from 'react-native-paper';
import { View,StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import {load } from '../../reducers/search';
import PromptSearchRate from '../PromptSearch/PromptSearchRate';


const RateLine = ({load,pastScore }) => {
    useEffect(()=>{
        const get = async () => {
            await load();
        }
        get();
    }, [load]);

    return (
        <Surface style={styles.surface}>
            {pastScore.length ? 
            <>
                <Text style={styles.info}>최근 점수</Text>
                <View style={styles.scoreContainer}>
                {pastScore.map((elem,index)=> (
                    <Text key={index} style={styles.score}>{elem}</Text>
                ))} 
                </View>
                <View style={styles.detail}><Text style={styles.new}>최근</Text><Text></Text></View>
                <Text>당신의 최근 점수 트렌드입니다</Text>
            </>
             : <PromptSearchRate />
            }
        </Surface>
    );
}



const styles = StyleSheet.create({
    surface: {
        padding: 8,
        flex: 0.4,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        marginTop: 10,
        marginBottom: 10,
    },
    info:{
        fontSize:25,
        fontWeight:'bold',
        marginBottom: 15
    },
    score:{
        fontSize:20
    },
    scoreContainer:{
        flexDirection:'row',
        justifyContent: 'space-around',
        width:'100%'
    },
    detail:{
        width:'100%',
        justifyContent:'space-around',
       
    },
    new:{
        fontSize: 18,
        marginLeft: 20,
        color:'#995432'
    }
});

const RateLineContainer = ( {load,pastScore } ) => (
    <RateLine load={load} pastScore={pastScore} />
);

export default connect(
    ({search})=>({
        pastScore:search.pastScore
    }),
    {
        load
    }
)(RateLineContainer);