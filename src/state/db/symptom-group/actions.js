import { CREATE_SYMPTOM_GROUP } from '../../constants'

export const createSymptomGroup = attrs => {
  return {
    type: CREATE_SYMPTOM_GROUP,
    payload: attrs
  }
}
