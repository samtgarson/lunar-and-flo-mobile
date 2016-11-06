import { createSelector } from 'reselect';

export default createSelector(
  (state) => state.get('homeScreenReducer'), 
  (HomeScreenReducer) => ({ ...HomeScreenReducer })
)
