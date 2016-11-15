import React, { Component } from 'react';
import ReactNative from 'react-native'
import AwesomeButton from 'react-native-awesome-button'
import styles from '../styles';
import moment from 'moment'
import Step from './step'

const { View, Text, Slider } = ReactNative;

class HowLongIsYourPeriod extends Step {
  constructor(props) {
    super(props)
    this.state = {
      periodLength: this.existing.periodLength || 5
    }
  }
  render () {
    return (
      <View style={styles.modal}>
        <Text>How long is your average period?</Text>
        <Text>{this.state.periodLength} day{this.state.periodLength > 1 ? 's' : ''}</Text>
        <Slider 
          onValueChange={(val) => { this.setState({periodLength: val}) }} 
          step={1} 
          minimumValue={1} 
          maximumValue={10} 
          value={this.state.periodLength} />
        <AwesomeButton states={{
          default: {
            text: 'Done',
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

export default { name: 'How long is your cycle?', component: <HowLongIsYourPeriod index={2} /> }
