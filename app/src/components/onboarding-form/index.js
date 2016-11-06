import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import stepOne from './step-one'
import stepTwo from './step-two'
import stepThree from './step-three'
import MultiStep from 'react-native-multistep-wizard'
import { onboardUser } from '../../state/onboarding-form/actions';

import { createSelector } from 'reselect';
import styles from './styles';

const { View, Text } = ReactNative;

const steps = [stepOne, stepTwo, stepThree]

export class OnboardingForm extends Component {
  finish (formState) {
    const data = formState.reduce((d, step) => Object.assign({}, d, step), {})
    this.props.completeOnboarding(data)
  }
  render () {
    return (
      <View style={styles.container}>
        <MultiStep steps={steps} onFinish={this.finish.bind(this)}/>
      </View>
    );
  }
}

OnboardingForm.propTypes = {
  completeOnboarding: React.PropTypes.func.isRequired,
};

export default connect(
  () => {return {}},
  { completeOnboarding: onboardUser }
)(OnboardingForm);
