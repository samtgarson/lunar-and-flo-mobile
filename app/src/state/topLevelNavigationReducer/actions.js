import {
  SHOW_TOP_LEVEL_LOADER,
  HIDE_TOP_LEVEL_LOADER,
  FETCH_USER
} from '../action-types';

export function hideLoader() {
  return {
    type: HIDE_TOP_LEVEL_LOADER,
  };
}

export function showLoader() {
  return {
    type: SHOW_TOP_LEVEL_LOADER,
  };
}

export function fetchUser() {
  return {
    type: FETCH_USER
  };
}
