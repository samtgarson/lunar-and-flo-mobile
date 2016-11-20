import schema from '../../models';
import { createSelector } from 'reselect';
import moment from 'moment'

const dbState = state => state.db;

export default createSelector(
  dbState,
  schema.createSelector((db) => {
    let collection = db.CheckIn.all().toRefArray()
    collection.sort((a, b) => moment(a.createdAt).isBefore(moment(b.createdAt)))
    return collection
  })
);
