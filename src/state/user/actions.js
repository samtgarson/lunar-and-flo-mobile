import {
  UPDATE_USER
} from '../constants';

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  };
}
