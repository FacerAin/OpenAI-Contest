import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import search from './search';
 
const store = combineReducers({ search }); 
 
export default createStore(store, applyMiddleware(ReduxThunk) );