import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectOnboardingScreenReducer } from '../../state/onboardingScreenReducer/reducer';
import styles from './styles';

const { View, Text } = ReactNative;

export class OnboardingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>OnboardingScreen</Text>
      </View>
    );
  }
}

OnboardingScreen.propTypes = {
  onboardingScreenReducer: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  createSelector(selectOnboardingScreenReducer, (onboardingScreenReducer) => ({ onboardingScreenReducer })),
  mapDispatchToProps
)(OnboardingScreen);
