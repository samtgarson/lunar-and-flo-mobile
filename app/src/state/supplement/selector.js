import schema from '../models';
import { createSelector } from 'reselect';

const dbState = state => state.db;

export default createSelector(
  dbState,
  schema.createSelector((db) => {
    return db.Supplement.map(supplement => ({
      ...supplement.ref,
      symptoms: supplement.effects.map(effect => effect.symptom.ref)
    }))
  })
);
