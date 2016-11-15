import {
  ONBOARD_FORM_COMPLETE
} from '../constants';

export function completeOnboardForm(data) {
  return {
    type: ONBOARD_FORM_COMPLETE,
    payload: data
  };
}
