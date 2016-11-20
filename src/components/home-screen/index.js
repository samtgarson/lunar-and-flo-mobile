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
    const { pack, selectSupplement, checkIns } = this.props
    return (<View>
      <Pack selectSupplement={selectSupplement} pack={pack} />
      { checkIns.map(c => <Text>{c.score}</Text>) }
    </View>)
  }
  render() {
    const { showLoader } = this.props
    return (
      <View style={styles.screen}>
        { showLoader ? <Text>Loading...</Text> : this.renderMainScreen() }
      </View>
    );
  }
}

HomeScreen.propTypes = {
  showLoader: React.PropTypes.bool.isRequired,
  pack: React.PropTypes.object,
  selectSupplement: React.PropTypes.func.isRequired,
  checkIns: React.PropTypes.array
};

function mapStateToProps(state) {
  return {
    ...homeScreenState(state),
    checkIns: checkInState(state)
  }
}

export default connect(
  mapStateToProps
)(HomeScreen);
