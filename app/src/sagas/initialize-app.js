import { takeEvery }                    from 'redux-saga';
import { put, select, call, take }      from 'redux-saga/effects';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import { INITIALIZE_APP, ONBOARD_FORM_COMPLETE, TOP_LEVEL_NAVIGATION_KEY } from '../state/constants'
import userState                        from '../state/user/selector'
import ApiClient                        from '../services/api-client'
import { updateUser }                   from '../state/user/actions'
import { createPack }                   from '../state/pack/actions'
import { showLoader, hideLoader }       from '../state/home-screen/actions'

const { pushRoute, popRoute } = navigationActions;

export default function* initializeApp () {
  yield* takeEvery(INITIALIZE_APP, function* () {
    yield put(showLoader())
    yield* [fetchUser(), bootstrapData()]
    yield put(hideLoader())
  })
}

function* bootstrapData () {

}

function* fetchUser () {
  var user = yield select(userState)

  if (!user.id) user = yield* fetchNewUser()
  if (!user.onboardedAt) yield* runOnboarding(user);
}

function* fetchNewUser () {
  const client = new ApiClient()
  newUser = yield call([client, client.fetchUser])
  yield put(updateUser(newUser))
  return newUser
}

function* runOnboarding (user) {
  const client = new ApiClient(user)
  yield put(pushRoute({ key: 'onboarding' }, TOP_LEVEL_NAVIGATION_KEY))
  const { payload: onboardingData } = yield take(ONBOARD_FORM_COMPLETE)
  const latestPack = yield call([client, client.onboardUser], onboardingData)
  yield put(createPack(latestPack))
  yield put(popRoute(TOP_LEVEL_NAVIGATION_KEY))
}
