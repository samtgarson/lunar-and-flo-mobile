import { CREATE_SUPPLEMENT } from '../../constants'

export const createSupplement = attrs => {
  return {
    type: CREATE_SUPPLEMENT,
    payload: attrs
  }
}
