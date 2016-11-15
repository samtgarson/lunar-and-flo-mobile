import React, { Component } from 'react';
import ReactNative from 'react-native'
import AwesomeButton from 'react-native-awesome-button'
import styles from '../styles';
import moment from 'moment'
import Step from './step'

const { View, Text, Slider } = ReactNative;

class HowLongIsYourCycle extends Step {
  constructor(props) {
    super(props)
    this.state = {
      cycleLength: this.existing.cycleLength || 28
    }
  }
  render () {
    return (
      <View style={styles.modal}>
        <Text>How long is your average cycle?</Text>
        <Text>{this.state.cycleLength} days</Text>
        <Slider 
          onValueChange={(val) => { this.setState({cycleLength: val}) }} 
          step={1} 
          minimumValue={20} 
          maximumValue={40} 
          value={this.state.cycleLength} />
        <AwesomeButton states={{
          default: {
            text: 'Next',
            onPress: this.continue.bind(this),
            backgroundColor: '#cccccc'
          }
         }} />
         <AwesomeButton states={{
          default: {
            text: 'Back',
            onPress: this.props.prevFn,
            backgroundColor: '#dddddd'
          }
         }} />
      </View>
    )
  }
}

export default { name: 'How long is your cycle?', component: <HowLongIsYourCycle index={1} /> }
