import React, { Component } from 'react';
import ReactNative from 'react-native'
import styles from './styles';
import moment from 'moment'

const { View, Text, Slider } = ReactNative;

class HowLongSinceYourLastPeriod extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lastPeriod: 7,
      date: moment().subtract(7, 'days')
    }
  }
  dayLabel () {
    const val = this.state.lastPeriod
    const relative = val == 0 ? 'Today' : val == 1 ? 'Yesterday' : `${this.state.lastPeriod} days ago`
    const date = this.state.date.format('Do MMMM')
    return <Text>{relative} <Text style={{opacity: 0.5}}>{date}</Text></Text>
  }
  render () {
    return (
      <View style={styles.container}>
        <Text>How many days since your last period?</Text>
        { this.dayLabel() }
        <Slider 
          onValueChange={(val) => { this.setState({lastPeriod: val, date: moment().subtract(val, 'days')}) }} 
          step={1} 
          minimumValue={0} 
          maximumValue={40} 
          value={7} />
      </View>
    )
  }
}

export default { name: 'How long since your last period?', component: <HowLongSinceYourLastPeriod /> }
