// dataReducer.ts
import { SAVE_SEARCH_DATA } from '../actions/actionTypes';
import { SearchData } from '../types/searchData';

const initialState: SearchData = {
  origin: '',
  destination: '',
  travellers: 0,
  date: '',
};

const searchDataReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SAVE_SEARCH_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default searchDataReducer;
