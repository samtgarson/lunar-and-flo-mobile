import { CREATE_SYMPTOM } from '../../constants'

export default function reducer (state, action, Symptom, session) {
  const { type, payload } = action
  switch (type) {
  case CREATE_SYMPTOM:
    Symptom.createOrUpdate({
      ...payload,
      symptomGroup: payload.symptomGroupId
    })
    break;
  }
}
