import {
  SHOW_HOME_SCREEN_LOADER,
  HIDE_HOME_SCREEN_LOADER
} from '../constants';

export function hideLoader() {
  return {
    type: HIDE_HOME_SCREEN_LOADER,
  };
}

export function showLoader() {
  return {
    type: SHOW_HOME_SCREEN_LOADER,
  };
}
