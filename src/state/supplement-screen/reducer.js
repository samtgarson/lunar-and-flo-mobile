import { 
  UPDATE_SEARCH_TERM
} from '../constants';

const initialState = {
  searchTerm: null
}

export default function supplementScreenReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload
      };
    default:
      return state;
  }
}
