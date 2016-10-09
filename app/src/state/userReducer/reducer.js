import { UPDATE_USER } from '../action-types';

function userReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }
    default:
      return state;
  }
}

export default userReducer;

export function selectUserReducer(state) {
  return state.get('userReducer');
}
