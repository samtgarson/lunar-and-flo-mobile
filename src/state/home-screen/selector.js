import { createSelector } from 'reselect';

export default createSelector(
  (state) => state.homeScreenReducer, 
  (HomeScreenReducer) => ({ ...HomeScreenReducer })
)
