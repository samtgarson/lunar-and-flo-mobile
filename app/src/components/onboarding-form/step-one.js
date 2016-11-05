import React, { Component } from 'react';
import ReactNative from 'react-native'
import AwesomeButton from 'react-native-awesome-button'
import styles from './styles';
import moment from 'moment'
import Step from './step'

const { View, Text, Slider } = ReactNative;

class HowLongSinceYourLastPeriod extends Step {
  constructor (props) {
    super(props)
    this.state = {
      lastPeriod: moment().diff(moment(this.existing.lastPeriod), 'days') || 7
    }
  }
  dayLabel () {
    const val = this.state.lastPeriod
    const relative = val == 0 ? 'Today' : val == 1 ? 'Yesterday' : `${this.state.lastPeriod} days ago`
    const date = moment().subtract(this.state.lastPeriod, 'days')
    return <Text>{relative} <Text style={{opacity: 0.5}}>{date.format('Do MMMM')}</Text></Text>
  }
  continue () {
    const date = moment().subtract(this.state.lastPeriod, 'days')
    this.props.saveState(0, { lastPeriod: date.format('YYYY-MM-DD') })
    this.props.nextFn()
  }
  render () {
    return (
      <View style={styles.container}>
        <Text>How many days since your last period?</Text>
        { this.dayLabel() }
        <Slider 
          onValueChange={(val) => { this.setState({lastPeriod: val}) }} 
          step={1} 
          minimumValue={0} 
          maximumValue={40} 
          value={this.state.lastPeriod} />
        <AwesomeButton states={{
          default: {
            text: 'Next',
            onPress: this.continue.bind(this),
            backgroundColor: '#cccccc'
          }
         }} />
      </View>
    )
  }
}

export default { name: 'How long since your last period?', component: <HowLongSinceYourLastPeriod index={0} /> }
