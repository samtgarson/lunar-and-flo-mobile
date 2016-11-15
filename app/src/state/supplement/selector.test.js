import supplementSelector from './selector'
import schema from '../models';
import moment from 'moment'
import { SupplementFactory, SymptomFactory, EffectFactory } from '../../test/support/factory'
import { expect } from 'chai'

describe('supplementSelector', () => {
  let dbState;
  let session;
  let state;
  let subject;

  beforeEach(() => {
    dbState = schema.getDefaultState()
    session = schema.withMutations(dbState)

    const effects = EffectFactory.buildList(3).map(e => {
      session.Symptom.create(e.symptom)
      session.Supplement.create(e.supplement)
      return session.Effect.create({
        ...e, 
        supplement: e.supplement.id,
        symptom: e.symptom.id
      })
    })
    session = schema.from(dbState)
    state = { db: dbState }
    subject = supplementSelector(state)
  })

  it('selects all the supplements', () => {
    expect(subject).to.have.lengthOf(3)
  })

  it('includes supplement attributes', () => {
    subject.forEach(s => {
      expect(s).to.include.keys('description', 'name', 'id')
    })
  })

  it('includes symptom attributes', () => {
    subject.forEach(s => {
      expect(s.symptoms[0]).to.include.keys('description', 'name', 'id')
    })
  })
})
