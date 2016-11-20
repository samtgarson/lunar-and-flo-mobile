import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import homeScreenState from '../../state/home-screen/selector';
import checkInState from '../../state/db/check-in/selector';
import Pack from '../pack';
import styles from '../styles';

const { View, Text } = ReactNative;

export class HomeScreen extends Component {
  renderMainScreen () {
    const { pack, selectSupplement } = this.props
    return <Pack selectSupplement={selectSupplement} pack={pack} />
  }
  render() {
    const { screen: { showLoader } } = this.props
    return (
      <View style={styles.screen}>
        { showLoader ? <Text>Loading...</Text> : this.renderMainScreen() }
      </View>
    );
  }
}

HomeScreen.propTypes = {
  screen: React.PropTypes.object.isRequired,
  pack: React.PropTypes.object,
  selectSupplement: React.PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    screen: homeScreenState(state)
  }
}

export default connect(
  mapStateToProps
)(HomeScreen);
