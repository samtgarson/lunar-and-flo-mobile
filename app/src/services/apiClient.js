import ReactNative from 'react-native';

const ENDPOINT = 'http://private-1adab-lunarandflo.apiary-mock.com';

export default class ApiClient {
  fetchUser () {
    return {
      id: 1,
      onboarded_at: null
    }
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
