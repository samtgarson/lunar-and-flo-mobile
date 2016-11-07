import { CREATE_SYMPTOM_GROUP } from '../constants'

export default function reducer (state, action, SymptomGroup, session) {
  const { type, payload } = action
  switch (type) {
  case CREATE_SYMPTOM_GROUP:
    SymptomGroup.create(payload)
    break;
  }
}
