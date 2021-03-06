import { put, select, call, take }      from 'redux-saga/effects';
import userState                        from '../state/user/selector'
import ApiClient                        from '../services/api-client'
import { ONBOARD_FORM_COMPLETE, TOP_LEVEL_NAVIGATION_KEY } from '../state/constants'
import { updateUser }                   from '../state/user/actions'
import { createPack }                   from '../state/pack/actions'
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

const { pushRoute, popRoute } = navigationActions;

export default function* initializeUser () {
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
  yield [put(createPack(latestPack)), put(updateUser({onboardedAt: new Date().toISOString()}))]
  yield put(popRoute(TOP_LEVEL_NAVIGATION_KEY))
}
