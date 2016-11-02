import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import stepOne from './step-one'
import MultiStep from 'react-native-multistep-wizard'

import { createSelector } from 'reselect';
import { onboardingFormState } from '../../state/onboardingFormReducer/reducer';
import styles from './styles';

const { View, Text } = ReactNative;

const steps = [stepOne]

export class OnboardingForm extends Component {
  finish (formState) {
    console.log(formState)
  }
  render () {
    return (
      <View style={styles.container}>
        <MultiStep steps={steps} onFinish={this.finish}/>
      </View>
    );
  }
}

OnboardingForm.propTypes = {
  onboardingFormState: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    onboardingFormState: onboardingFormState(state)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnboardingForm);
