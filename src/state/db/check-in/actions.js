import { CREATE_CHECK_IN } from '../../constants'

export const createCheckIn = attrs => {
  return {
    type: CREATE_CHECK_IN,
    payload: attrs
  }
}
