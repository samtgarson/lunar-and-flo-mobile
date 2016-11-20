import ApiClient from '../services/api-client'
import schema from '../state/models'
import { call, put }        from 'redux-saga/effects';
import { createSymptom } from '../state/symptom/actions'
import { createSupplement } from '../state/supplement/actions'
import { createEffect } from '../state/effect/actions'
import { createSymptomGroup } from '../state/symptom-group/actions'

const client = new ApiClient()

const fetchers = [ 
  ['Symptom', createSymptom],
  ['Supplement', createSupplement],
  ['Effect', createEffect],
  ['SymptomGroup', createSymptomGroup]
].map(callResource)

function callResource ([model, creator]) {
  return call(function* () {
    const data = yield call([client, client.fetchResource], model)
    yield data.map((attrs) => { return put(creator(attrs)) })
  })
}

export default function* bootstrapData () {
  yield fetchers
}
