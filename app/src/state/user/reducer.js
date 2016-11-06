import { createSelector } from 'reselect';
import { UPDATE_USER } from '../constants';

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

export const userState = createSelector(
  (state) => state.get('userReducer'), 
  (userReducer) => ({ ...userReducer })
)