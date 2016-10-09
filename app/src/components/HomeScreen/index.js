import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectHomeScreenReducer } from '../../state/homeScreenReducer/reducer';
import styles from './styles';

const { View, Text } = ReactNative;

export class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>HomeScreen</Text>
      </View>
    );
  }
}

HomeScreen.propTypes = {
  HomeScreenReducer: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  createSelector(selectHomeScreenReducer, (HomeScreenReducer) => ({ HomeScreenReducer })),
  mapDispatchToProps
)(HomeScreen);
