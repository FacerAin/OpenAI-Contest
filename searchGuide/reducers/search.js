import {sendSearch} from '../lib/api'
import {Alert} from 'react-native'
import {readTest} from '../lib/readTest';
import sqlite from '../lib/sqlite';

const LOAD = 'search/LOAD';
const CHANGE = 'search/CHANGE';
const SUCCESS = 'search/SUCCESS';
const FAILURE = 'search/FAILURE';
const START = 'search/START';

export const change = (text) => ({ 
    type: CHANGE,
    text,
})

export const load = () => async (dispatch) =>{
    let past = await sqlite.select();
    past = await past.map( elem => elem.score );
    dispatch({type:LOAD, past: past})
}

export const submit = (text) => async (dispatch) => { 
    dispatch( {type:START});
    try{
        const response = await sendSearch(text.nativeEvent.text);
        let tempScore = scoring(response.return_data).full;
        await sqlite.insert(tempScore);
        let past = await sqlite.select();
        past = past.map( elem => elem.score );
        //dispatch( { type:SUCCESS, result:response }
        dispatch( { type:SUCCESS, result:response, past: past})
    }
    catch(err){
        console.log(err);
        /* Alert.alert(
            'error',
            [
                {text: '확인', onPress: () => {}},
            ],
        ) */
        dispatch({ type:FAILURE })
    }
}


const initialState = {
    query: '',
    result: {
        return_data: {
            searchResults: []
        }   
    },
    isLoading: false,
    pastScore: [10,10,10,10,10,10],
};
   
export default ToggleLoading = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE:
            return {...state, query: action.text};
        case SUCCESS:
            return {...state, isLoading:false,result: action.result, pastScore: action.past};
        case FAILURE:
            return {...state, isLoading:false};
        case START:
            return {...state, query:'',isLoading:true}
        case LOAD:
            return {...state,pastScore: action.past}
        default:
            return state;
    }
}


