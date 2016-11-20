import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import homeScreenState from '../../state/home-screen/selector';
import checkInState from '../../state/db/check-in/selector';
import Dashboard from '../dashboard'

function mapStateToProps(state) {
  return {
    ...homeScreenState(state),
    checkIns: checkInState(state)
  }
}

export default connect(
  mapStateToProps
)(Dashboard);
