import { CREATE_PACK } from '../constants'

export const createPack = attrs => {
  return {
    type: CREATE_PACK,
    payload: attrs
  }
}
