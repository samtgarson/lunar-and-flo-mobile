import {
  ONBOARD_USER
} from '../constants';

export function onboardUser(data) {
  return {
    type: ONBOARD_USER,
    payload: data
  };
}
