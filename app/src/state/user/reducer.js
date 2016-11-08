import { UPDATE_USER } from '../constants';

export default function user(state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}
