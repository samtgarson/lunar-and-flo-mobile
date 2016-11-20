import { CREATE_EFFECT } from '../../constants'

export const createEffect = attrs => {
  return {
    type: CREATE_EFFECT,
    payload: attrs
  }
}
