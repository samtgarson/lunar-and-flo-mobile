import { createSelector } from 'reselect';

export default createSelector(
  (state) => state.onboardingFormReducer, 
  (onboardingFormReducer) => ({ ...onboardingFormReducer })
)
