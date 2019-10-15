import * as types from '../action/ActionTypes';
import { combineReducers } from'redux';

const initialState = {
    data : {},
};
/*Object.assign({},state,{
    data: action.data
})
*/
//return {...state, data:action.data}
const processdata = (state = initialState, action) => {
    switch(action.type){
        case types.SET_DATA:
            return {...state, data:JSON.parse(action.data)}
        default:
            return state;
    }
}
/*
console.log(processdata(initialState,{
    "data": "test",
    "type": "SET_DATA",
  }))
*/
const processApp = combineReducers({
    processdata
});

export default processApp;