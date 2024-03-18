import { SAVE_SEARCH_DATA } from './actionTypes';
import { SearchData } from '../types/searchData';

export const saveSearchData = (data: SearchData) => ({
  type: SAVE_SEARCH_DATA,
  payload: data,
});
