import reducer from '../../state/user/reducer';
import * as actions from '../../state/user/actions';
import { UPDATE_USER } from '../../state/constants'
import { expect } from 'chai'

describe('user reducer', () => {
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
    ).to.eql(testUser);
  })

  it('updates the user', () => {
    const state = { name: 'test', email: 'a@b.c' }
    const action = actions.updateUser({ name: 'new' })

    expect(
      reducer(state, action)
    ).to.eql( { name: 'new', email: 'a@b.c' });
  })
});
