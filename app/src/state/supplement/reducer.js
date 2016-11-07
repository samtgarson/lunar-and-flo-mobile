import { CREATE_SUPPLEMENT } from '../constants'

export default function reducer (state, action, Supplement, session) {
  const { type, payload } = action
  switch (type) {
  case CREATE_SUPPLEMENT:
    Supplement.create(payload)
    break;
  }
}
