import { CREATE_EFFECT } from '../constants'

export default function reducer (state, action, Effect, session) {
  const { type, payload } = action
  switch (type) {
  case CREATE_EFFECT:
    Effect.create({
      ...payload,
      supplement: payload.supplementId,
      symptom: payload.symptomId
    })
    break;
  }
}
