import { createSelector } from 'reselect';

export default createSelector(
  (state) => state.get('onboardingFormReducer'), 
  (onboardingFormReducer) => ({ ...onboardingFormReducer })
)
