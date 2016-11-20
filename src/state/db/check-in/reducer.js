import { CREATE_CHECK_IN} from '../../constants'

export default function reducer (state, action, CheckIn, session) {
  const { type, payload } = action
  switch (type) {
  case CREATE_CHECK_IN:
    CheckIn.createOrUpdate(payload)
    break;
  }
}
