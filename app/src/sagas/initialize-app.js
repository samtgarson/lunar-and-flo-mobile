import { put, call, take }        from 'redux-saga/effects';
import { INITIALIZE_APP }         from '../state/constants'
import { showLoader, hideLoader } from '../state/home-screen/actions'
import initializeUser             from './initialize-user'
import bootstrapData              from './bootstrap-data'
import { REHYDRATE }              from 'redux-persist/constants';


export default function* initializeApp () {
  yield take(INITIALIZE_APP)
  yield put(showLoader())
  yield take(REHYDRATE)
  yield [call(initializeUser), call(bootstrapData)]
  yield put(hideLoader())
}
