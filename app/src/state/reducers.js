/* eslint-disable object-shorthand, comma-dangle, eol-last, import/imports-first */
import topLevelNavigationReducer from './topLevelNavigationReducer/reducer';
import { combineReducers } from 'redux-immutable';

const applicationReducers = {
  topLevelNavigationReducer: topLevelNavigationReducer
};
export default function createReducer() {
  return combineReducers(applicationReducers);
}
