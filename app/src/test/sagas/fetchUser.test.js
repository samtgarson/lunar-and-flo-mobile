import { runFetchUser } from '../../sagas/fetchUser'
import { userState } from  '../../state/userReducer/reducer'
import { select, put } from 'redux-saga/effects';
import { showLoader, hideLoader } from '../../state/topLevelNavigationReducer/actions'
import { updateUser } from  '../../state/userReducer/actions'
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import { TOP_LEVEL_NAVIGATION_KEY } from '../state/constants'
import apiClient from '../../services/apiClient'
import sinon from 'sinon'
import testSaga from 'redux-saga-test-plan';

var server;
before(() => { server = sinon.fakeServer.create(); });
after(() => { server.restore(); });

describe('runFetchUser', () => {
  var generator;
  beforeEach (() => { 
    generator  = testSaga(runFetchUser)
  });

  it('requests local user', () => {
    generator.next().select(userState);
  })

  it('does nothing if user is present', () => {
    generator.next()

    generator.next({ id: '123' }).isDone()
  })

  it('fetches from the api', () => {
    generator
      .next()
      .next({}).put(showLoader)
      .next().call((new apiClient).fetchUser)
      .next({id: '123'}).put(updateUser({id: '123'}))
      .next().put(hideLoader)
      .next().put(pushRoute({ key: 'onboarding' }, TOP_LEVEL_NAVIGATION_KEY))
  })
})
