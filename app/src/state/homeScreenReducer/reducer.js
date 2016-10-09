import { DEFAULT_ACTION } from '../action-types';

function homeScreenReducer(state = {}, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default homeScreenReducer;

export function selectHomeScreenReducer(state) {
  return state.get('homeScreenReducer');
}
