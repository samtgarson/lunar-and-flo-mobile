import initializeApp              from './initialize-app'
import { 
  INITIALIZE_APP, 
  SHOW_HOME_SCREEN_LOADER,
  HIDE_HOME_SCREEN_LOADER 
}                                 from '../state/constants'
import { REHYDRATE }              from 'redux-persist/constants';
import initializeUser             from './initialize-user'
import bootstrapData              from './bootstrap-data'
import { put, call, take }        from 'redux-saga/effects';
import chai, { expect }           from 'chai'
import sagaMatchers               from '../test/support/saga-matchers.js'
chai.use(sagaMatchers)


describe('initializeApp', () => {
  let generator;
  beforeEach (() => { 
    generator = initializeApp()
  });

  it('fetches user and bootstraps in parallel', () => {
    expect(generator).to.yield('TAKE').withArgs(INITIALIZE_APP)
    expect(generator).to.yield('PUT').withArgs(SHOW_HOME_SCREEN_LOADER)
    expect(generator).to.yield('TAKE').withArgs(REHYDRATE)
    expect(generator).to.yield('PUT').withArgs(HIDE_HOME_SCREEN_LOADER)
    expect(generator).to.parallel('CALL').withArgs([initializeUser, bootstrapData])
  })
})
