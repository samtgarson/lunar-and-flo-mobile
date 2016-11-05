import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { homeScreenState } from '../../state/home-screen/reducer';
import styles from './styles';

const { View, Text } = ReactNative;

export class HomeScreen extends Component {
  render() {
    const { showLoader } = this.props
    return (
      <View style={styles.container}>
        { showLoader ? <Text>Loading...</Text> : <Text>HomeScreen</Text> }
      </View>
    );
  }
}

HomeScreen.propTypes = {
  showLoader: React.PropTypes.bool.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

function mapStateToProps(state) {
  return {
    ...homeScreenState(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
