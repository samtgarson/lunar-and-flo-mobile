import React, { Component }                       from 'react';
import { ListView, Text, View, TouchableOpacity } from 'react-native';
import { filtered as filteredSupplementState }    from '../../state/db/supplement/selector'
import { updateSearchTerm }                       from '../../state/supplement-screen/actions'
import supplemenetScreenState                     from '../../state/supplement-screen/selector'
import { connect }                                from 'react-redux';
import styles                                     from '../styles'
import SupplementList                             from '../supplement-list'

const mapStateToProps = state => ({
  supplements: filteredSupplementState(state),
  ...supplemenetScreenState(state)
})

const mapDispatchToProps = { 
  updateSearchTerm
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplementList);
