import { takeEvery } from 'redux-saga';
import { put, select, call } from 'redux-saga/effects';

import { FETCH_USER } from '../state/constants'
import { userState } from  '../state/userReducer/reducer'
import { updateUser } from  '../state/userReducer/actions'
import * as homeScreen from '../state/homeScreenReducer/actions'
import ApiClient from '../services/apiClient'
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import { TOP_LEVEL_NAVIGATION_KEY } from '../state/constants'

const {
  popRoute,
  pushRoute
} = navigationActions;

export function* runFetchUser(action) {
  let existingUser = yield select(userState)
  if (existingUser.id) return;

  const client = new ApiClient()
  yield put(homeScreen.showLoader())
  newUser = yield call([client, client.fetchUser])
  yield put(updateUser(newUser))
  yield put(homeScreen.hideLoader())

  yield put(pushRoute({ key: 'onboarding' }, TOP_LEVEL_NAVIGATION_KEY))
}

export default function* fetchUser() {
  yield* takeEvery(FETCH_USER, runFetchUser);
}
