import { createSelector } from 'reselect';

export default createSelector(
  (state) => state.topLevelNavigationReducer, 
  (topLevelNavigationReducer) => ({ ...topLevelNavigationReducer })
)
