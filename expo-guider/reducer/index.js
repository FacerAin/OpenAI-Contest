import * as types from '../action/ActionTypes';
import { combineReducers } from'redux';

const initialState = {
    data : {},
};
            //return {...state, data:action.data}
const processdata = (state = initialState, action) => {
    console.log(action.data)
    console.log('SET DATA!')
    console.log(typeof action.data)

    switch(action.type){
        case types.SET_DATA:
            return Object.assign({},state,{
                data: action.data
            })
        default:
            return state
    }
}

const processApp = combineReducers({
    processdata
});

export default processApp;