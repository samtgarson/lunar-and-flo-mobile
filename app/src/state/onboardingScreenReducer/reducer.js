import { DEFAULT_ACTION } from '../constants';

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
