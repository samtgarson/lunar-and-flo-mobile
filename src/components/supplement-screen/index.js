import React, { Component }                       from 'react';
import { ListView, Text, View, TouchableOpacity } from 'react-native';
import supplementState                            from '../../state/supplement/selector'
import { updateSearchTerm }                       from '../../state/supplement-screen/actions'
import supplemenetScreenState                     from '../../state/supplement-screen/selector'
import { connect }                                from 'react-redux';
import styles                                     from '../styles'
import SupplementList                             from '../supplement-list'

const mapStateToProps = state => ({
  supplements: supplementState(state),
  ...supplemenetScreenState(state)
})

const mapDispatchToProps = { 
  updateSearchTerm
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplementList);
