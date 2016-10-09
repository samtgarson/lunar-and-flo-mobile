import reducer from '../../state/userReducer/reducer';
import * as actions from '../../state/userReducer/actions';
import { UPDATE_USER } from '../../state/action-types'

describe('userReducer reducer', () => {
  it('returns default state', () => {
    expect(
      reducer(undefined, {})
    ).to.eql({});
  });

  it('creates the user', () => {
    const testUser = { name: 'test' }
    const action = actions.updateUser(testUser)

    expect(
      reducer(undefined, action)
    ).to.eql( { user: testUser });
  })

  it('updates the user', () => {
    const state = { user: { name: 'test', email: 'a@b.c' } }
    const action = actions.updateUser({ name: 'new' })

    expect(
      reducer(state, action)
    ).to.eql( { user: { name: 'new', email: 'a@b.c' } });
  })
});
