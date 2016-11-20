import { CREATE_SYMPTOM } from '../constants'

export const createSymptom = attrs => {
  return {
    type: CREATE_SYMPTOM,
    payload: attrs
  }
}
