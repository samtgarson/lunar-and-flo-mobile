import ReactNative from 'react-native';
import packFixture from '../test/fixtures/pack.json'
import changeCase from 'change-case-keys'

const ENDPOINT = 'http://private-1adab-lunarandflo.apiary-mock.com';

export default class ApiClient {
  fetchUser () {
    const response = {
      id: 1,
      onboarded_at: null
    }
    return changeCase(response, 'camelize')
  }
  onboardUser () {
    return packFixture
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
