import packSelector from './selector'
import schema from '../models';
import packFixture from '../../test/fixtures/pack';
import moment from 'moment'

describe('packSelector', () => {
  let dbState;
  let session;
  let state;
  let Pack;

  beforeEach(() => {
    dbState = schema.getDefaultState()
    session = schema.withMutations(dbState)
    Pack = session.Pack
  })

  it('selects the latest pack', () => {
    const packs = [2, 1, 3].map((i) => {
      return Pack.create({
        ...packFixture,
        id: i,
        createdAt: moment().subtract(i, 'd').format('YYYY-MM-DD')
      })
    })
    session = schema.from(dbState)
    state = { db: dbState }

    const result = packSelector(state)
    const expected = moment().subtract(1, 'd').format('YYYY-MM-DD')
    expect(result.createdAt).to.equal(expected)
  })
})
