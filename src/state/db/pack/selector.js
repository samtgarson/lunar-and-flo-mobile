import schema from '../../models';
import { createSelector } from 'reselect';

import userState from '../../user/selector'

const dbState = state => state.db;

export default createSelector(
  dbState,
  schema.createSelector((db) => {
    if (db.Pack.count() == 0) return {}
    const pack = db.Pack.all().orderBy(['createdAt'], false).last() 

    return {
      ...pack.ref,
      effects: pack.effects.map(effect => {
        return {
          ...effect.ref,
          supplement: effect.supplement.ref,
          symptom: effect.symptom.ref
        }
      })
    }
  })
);
