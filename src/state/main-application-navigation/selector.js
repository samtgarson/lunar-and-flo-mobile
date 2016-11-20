import { createSelector } from 'reselect';

export default createSelector(
  (state) => state.mainApplicationNavigationReducer, 
  (MainApplicationNavigation) => ({ ...MainApplicationNavigation })
)
