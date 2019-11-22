import React,{ useState } from 'react';
import { Surface, Text } from 'react-native-paper';
import { StyleSheet,View } from 'react-native';
import {connect} from 'react-redux';
import PromptSearchRate from '../PromptSearch/PromptSearchRate';

const SentenceInfo = (props) => (
    <View>
        <Text style={[styles.infoText,{color:props.color}]} >{props.info}</Text>
        <Text style={[styles.Text,{color:props.color}]}>{props.Text}</Text>
    </View> 
)

const RateSentence = ({originalText, fixedText, keywordText }) => {
    const [ count,setCount ] = useState(0);

    const calCount = () => {
        if(count > 1 || !keywordText) setCount(0);
        else setCount(count+1);
    }

    return (
        <Surface style={styles.surface} onTouchStart={calCount} >
            { keywordText ?
                <>
                <View>
                    {count == 0 && ( <SentenceInfo Text={originalText} info={'원래 검색  문장'} color={'#B71C1C'} />) }
                    {count == 1 && ( <SentenceInfo Text={fixedText} info={'맞춤법 교정 문장'} color={'#2196F3'} />) }
                    {count == 2 && ( <SentenceInfo Text={keywordText} info={'키워드 교정 문장'} color={'#00a676'} />) }
                </View> 
                <View style={{flexDirection:'column-reverse', height:50}}>
                <Text >눌러서 변화 과정을 지켜보세요!</Text>
                </View>
                
                </>
                : <PromptSearchRate />
            }
            
        </Surface>
    )
}

 const styles = StyleSheet.create({
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
        textAlign:'center'
    },
    infoText:{
        fontSize: 20,
        textAlign:'center'
    }
});


const RateSentenceContainer = ( {originalText, fixedText, keywordText } ) => (
    <RateSentence originalText={originalText} fixedText={fixedText} keywordText={keywordText} />
);

export default connect(
    ({search})=>({
        originalText: search.result.return_data.originalText,
        fixedText: search.result.return_data.fixedText,
        keywordText: search.result.return_data.keywordText
    })
)(RateSentenceContainer);