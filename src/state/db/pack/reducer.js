import { CREATE_PACK } from '../../constants'

export default function reducer (state, action, Pack, session) {
  const { type, payload } = action
  switch (type) {
  case CREATE_PACK:
    Pack.createOrUpdate({
      ...payload,
      effects: payload.effectIds
    })
    break;
  }
}
