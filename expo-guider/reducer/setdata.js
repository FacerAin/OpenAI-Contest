import * as types from '../action/ActionTypes';
const initialState = {
    data : {}
};

export default function processdata(state = initialState, action){
    switch(action.type){
        case types.SET_DATASET:
            return Object.assign({},state,{
                value: state.value
            })
        default:
            return state
    }

}

