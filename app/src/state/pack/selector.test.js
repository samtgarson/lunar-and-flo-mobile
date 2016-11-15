import packSelector from './selector'
import schema from '../models';
import moment from 'moment'
import { PackFactory } from '../../test/support/factory'
import { expect } from 'chai'

describe('packSelector', () => {
  let dbState;
  let session;
  let state;

  beforeEach(() => {
    dbState = schema.getDefaultState()
    session = schema.withMutations(dbState)
  })

  it('selects the latest pack', () => {
    const packs = [2, 1, 3].map((i) => {
      const attrs = PackFactory.attributes({
        id: i,
        createdAt: moment().subtract(i, 'd').format('YYYY-MM-DD'),
        effects: []
      })
      return session.Pack.create(attrs)
    })
    session = schema.from(dbState)
    state = { db: dbState }

    const result = packSelector(state)
    const expected = moment().subtract(1, 'd').format('YYYY-MM-DD')
    expect(result.createdAt).to.equal(expected)
  })
})
