import {
  UPDATE_SEARCH_TERM
} from '../constants';

export function updateSearchTerm(term) {
  return {
    type: UPDATE_SEARCH_TERM,
    payload: term
  };
}
