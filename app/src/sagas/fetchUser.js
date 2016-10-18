import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import { FETCH_USER } from '../state/action-types'
import { selectUserReducer } from  '../state/userReducer/reducer'
import { updateUser } from  '../state/userReducer/actions'
import * as topLevelNav from '../state/topLevelNavigationReducer/actions'
import apiClient from '../services/apiClient'

export function* runFetchUser(action) {
  let existingUser = yield select(selectUserReducer)
  if (existingUser.deviceId) return;

  const client = new apiClient
  yield put(topLevelNav.showLoader())
  newUser = yield call(client.fetchUser)
  yield put(updateUser(newUser))
  yield put(topLevelNav.hideLoader())
}

export default function* fetchUser() {
  yield* takeEvery(FETCH_USER, runFetchUser);
}
