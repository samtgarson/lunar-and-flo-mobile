import { DEFAULT_ACTION } from '../constants';
import { createSelector } from 'reselect';

function onboardingFormReducer(state = {}, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default onboardingFormReducer;

export const onboardingFormState = createSelector(
  (state) => state.get('onboardingFormReducer'), 
  (onboardingFormReducer) => ({ ...onboardingFormReducer })
)
