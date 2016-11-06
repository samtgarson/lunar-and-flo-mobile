import { createSelector } from 'reselect';

export default createSelector(
  (state) => state.get('userReducer'), 
  (userReducer) => ({ ...userReducer })
)
