import * as types from './ActionTypes';


export function setData(data){
    return {
        type: types.SET_DATA,
        data
    }
}