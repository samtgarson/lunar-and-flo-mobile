import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import { FETCH_USER } from '../state/action-types'
import { selectUserReducer } from  '../state/userReducer/reducer'
import { updateUser } from  '../state/userReducer/actions'
import * as topLevelNav from '../state/topLevelNavigationReducer/actions'
import * as apiClient from '../services/apiClient'

export function* runFetchUser(action) {
  if (yield select(selectUserReducer)) return;

  yield put(topLevelNav.showLoader)
  newUser = yield call(apiClient.fetchUser)
  yield put(updateUser(newUser))
  yield put(topLevelNav.hideLoader)
}

export default function* fetchUser() {
  yield* takeEvery(FETCH_USER, runFetchUser);
}
