/* eslint-disable object-shorthand, comma-dangle, eol-last, import/imports-first */
import userReducer from './user/reducer';
import onboardingFormReducer from './onboarding-form/reducer';
import homeScreenReducer from './home-screen/reducer';
import mainApplicationNavigationReducer from './main-application-navigation/reducer';
import topLevelNavigationReducer from './top-level-navigation/reducer';
import { combineReducers } from 'redux-immutable';
const applicationReducers = {
  topLevelNavigationReducer: topLevelNavigationReducer,
  mainApplicationNavigationReducer: mainApplicationNavigationReducer,
  homeScreenReducer: homeScreenReducer,
  onboardingFormReducer: onboardingFormReducer,
  userReducer: userReducer
};
export default function createReducer() {
  return combineReducers(applicationReducers);
}
