import { createSelector } from 'reselect';

export default createSelector(
  (state) => state.supplementScreenReducer, 
  (SupplementScreenReducer) => ({ ...SupplementScreenReducer })
)
