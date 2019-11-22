import React,{ useState } from 'react';
import { Surface, Text ,HelperText} from 'react-native-paper';
import { StyleSheet,View } from 'react-native';
import { StackedBarChart  } from 'react-native-svg-charts';
import PromptSearchRate from '../PromptSearch/PromptSearchRate';

export default RateBar = (props) => {
    const [ click,setClick ] = useState(0);

    return (
        <Surface style={styles.surface}>
            
            {props.score.msg.length ?
            <>
            <View style={styles.container}>
                <Text style={styles.Text}>총 점수 : {props.score.full}</Text>
                <View style={styles.colorContainer}>
                    <View style={styles.textContainer}>
                        <View style={styles.colorA}></View><Text>키워드 점수</Text>
                    </View>
                    <View style={styles.textContainer}>
                        <View style={styles.colorB}></View><Text>맞춤법 점수</Text>
                    </View>
                </View>
            </View>
            <StackedBarChart  
            data={ [{
                keyword: {
                    value: props.score.key,
                    svg: {
                        onPressIn: () => {setClick(1)},
                        onPressOut: ()=>{setClick(0)}
                    },
                },
                korean: {
                    value: props.score.fix,
                    svg: {
                        onPressIn: () => {setClick(2)},
                        onPressOut: ()=>{setClick(0)}
                    },
                }, 
                rest: {
                    value: (100-(props.score.key+props.score.fix)),
                }
            }]} 
            style={{height:50, width:'90%'}}
            keys={['keyword','korean','rest']} 
            colors={['#ffaa5a','#2cc3c2','#ffffff']}
            showGrid={ false }
            horizontal={ true }
            contentInset={ { top: 10 } }  
            valueAccessor={({ item, key }) => item[key].value}
            /> 
            <View style={styles.infoContainer}>
                <HelperText type={'info'} visible={click==1} style={{fontSize:20}}>키워드 : {props.score.key}</HelperText>
                <HelperText type={'info'} visible={click==2} style={{fontSize:20}}>맞춤법 : {props.score.fix}</HelperText>
            </View>
            <Text>눌러서 각각의 점수를 알아보세요!</Text>
            </>
            : <PromptSearchRate />}
        </Surface>
        
     );
}



const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection:'row',
        justifyContent:'center',
    },
    colorContainer:{
        position:"absolute",
        right:0,
    },
    colorA:{
        backgroundColor:'#ffaa5a',
        height: 7,
        width: 7,
        marginRight: 5,
    },
    colorB:{
        backgroundColor:'#2cc3c2',
        height: 7,
        width: 7,
        marginRight: 5,
    },
    textContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    infoContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        width: '100%'
    },
    surface: {
        padding: 8,
        flex: 0.3,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        marginTop: 10
    },
    Text:{
        fontSize: 25,
    },
});
