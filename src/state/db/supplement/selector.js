import schema from '../../models';
import { createSelector } from 'reselect';
import supplementScreenState from '../../supplement-screen/selector'

const dbState = state => state.db;

export default createSelector(
  dbState,
  schema.createSelector((db) => {
    let collection = db.Supplement
    return serialize(collection)
  })
);

export const filtered = createSelector(
  dbState,
  supplementScreenState,
  schema.createSelector((db, { searchTerm }) => {
    let collection = db.Supplement
    if (searchTerm.length) collection = collection.filter(s => s.name.match(new RegExp(searchTerm, 'gi')))

    return serialize(collection)
  })
);

const serialize = (collection) => (
  collection.map(supplement => ({
    ...supplement.ref,
    symptoms: supplement.effects.map(effect => effect.symptom.ref)
  }))
)
