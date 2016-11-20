import schema from '../../models';
import { createSelector } from 'reselect';

const dbState = state => state.db;

export default createSelector(
  dbState,
  schema.createSelector((db) => {
    let collection = db.CheckIn
    return collection.all().toRefArray()
  })
);
