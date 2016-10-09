/* eslint-disable object-shorthand, comma-dangle, eol-last, import/imports-first */
import userReducer from './userReducer/reducer';
import onboardingScreenReducer from './onboardingScreenReducer/reducer';
import homeScreenReducer from './homeScreenReducer/reducer';
import mainApplicationNavigationReducer from './mainApplicationNavigationReducer/reducer';
import topLevelNavigationReducer from './topLevelNavigationReducer/reducer';
import { combineReducers } from 'redux-immutable';
const applicationReducers = {
  topLevelNavigationReducer: topLevelNavigationReducer,
  mainApplicationNavigationReducer: mainApplicationNavigationReducer,
  homeScreenReducer: homeScreenReducer,
  onboardingScreenReducer: onboardingScreenReducer,
  userReducer: userReducer
};
export default function createReducer() {
  return combineReducers(applicationReducers);
}