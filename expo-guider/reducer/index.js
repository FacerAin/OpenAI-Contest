import * as types from '../action/ActionTypes';
import { combineReducers } from'redux';

const initialState = {
    data : {},
    isLoading: false,
};

const processdata = (state = initialState, action) => {
    switch(action.type){
        case types.SET_DATA:
            return {...state, data:JSON.parse(action.data)}
        case types.SET_LOADING:
            return {...state, isLoading:action.isLoading}
        default:
            return state;
    }
}

const processApp = combineReducers({
    processdata
});

export default processApp;