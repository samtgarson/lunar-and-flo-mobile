import { DEFAULT_ACTION } from '../action-types';

function onboardingScreenReducer(state = {}, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default onboardingScreenReducer;

export function selectOnboardingScreenReducer(state) {
  return state.get('onboardingScreenReducer');
}
