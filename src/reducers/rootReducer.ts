import { combineReducers } from 'redux';
import searchDataReducer from './searchDataReducer';

const rootReducer = combineReducers({
  data: searchDataReducer,
});

export default rootReducer;
