import ReactNative from 'react-native';
import packFixture from '../test/fixtures/pack.json'
import symptomFixture from '../test/fixtures/symptoms.json'
import supplementFixture from '../test/fixtures/supplements.json'
import effectFixture from '../test/fixtures/effects.json'
import symptomGroupFixture from '../test/fixtures/symptom-groups.json'
import changeCase from 'change-case-keys'

const ENDPOINT = 'http://private-1adab-lunarandflo.apiary-mock.com';
const resourceFixtures = {
  Symptom: symptomFixture,
  Supplement: supplementFixture,
  Effect: effectFixture,
  SymptomGroup: symptomGroupFixture,
}

export default class ApiClient {
  fetchUser () {
    const response = {
      id: 1,
      onboarded_at: null
    }
    return changeCase(response, 'camelize')
  }
  onboardUser (data) {
    return changeCase(packFixture, 'camelize')
  }
  fetchResource (resource) {
    return changeCase(resourceFixtures[resource], 'camelize')
  }

  _get (url, opts) {
    const getOpts = {
      ...opts,
      method: 'GET'
    }
    _call(url, getOpts)
  }

  _post () {
    const postOpts = {
      ...opts,
      method: 'POST'
    }
    _call(url, postOpts)
  }

  _call (url, opts) {
    fetch(ENPOINT + url, opts)
  }
}
