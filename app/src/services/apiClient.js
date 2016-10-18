import ReactNative from 'react-native';
const { AdSupportIOS } = ReactNative;

const ENDPOINT = 'http://private-1adab-lunarandflo.apiary-mock.com';

export default class ApiClient {
  constructor() {
    this.deviceId = new Promise(this._setDeviceId)
  }

  fetchUser () {
    return this.deviceId.then((deviceId) => {
      _post('/users', { 
        body: JSON.stringify({device_id: deviceId})
      })
      return {
        device_id: deviceId,
        onboarded_at: null
      }
    })
  }

  _get(url, opts) {
    const getOpts = {
      ...opts,
      method: 'GET'
    }
    _call(url, getOpts)
  }

  _post() {
    const postOpts = {
      ...opts,
      method: 'POST'
    }
    _call(url, postOpts)
  }

  _call(url, opts) {
    fetch(ENPOINT + url, opts)
  }

  _setDeviceId(resolve, reject) {
    AdSupportIOS.getAdvertisingId(
      resolve, reject
    )
  }
}
