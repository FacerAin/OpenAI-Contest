import React from 'react';
import {View,Alert} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { connect } from 'react-redux';
import {change, submit} from '../../reducers/search';


const voiceRecognition = () => {
    Alert.alert(
        '음성 인식',
        '아직 구현 못함',
        [
            {text: '확인', onPress: () => {}},
        ],
    )
};

const SearchBar = ({ query, change, submit }) => {
    return(
        <>
        <View>
            <Searchbar
            placeholder="검색할 질문을 입력하세요."
            onChangeText={change}
            value={query}
            icon='microphone'
            onIconPress={voiceRecognition}
            onSubmitEditing={submit}
            />
        </View>
        </>
    )
};


const SearchBarContainer = ({ query, change, submit }) => {
    return(<SearchBar query={query} change={change} submit={submit}  />)
};

export default connect(
    ({search})=> ({
        query: search.query
    }),
    {
        change,submit
    }
)(SearchBarContainer);