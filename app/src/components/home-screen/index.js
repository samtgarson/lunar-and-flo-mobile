import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import homeScreenState from '../../state/home-screen/selector';
import packState from '../../state/pack/selector';
import Pack from '../pack';
import styles from './styles';
import { TOP_LEVEL_NAVIGATION_KEY } from '../../state/constants'
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

const {
 popRoute,
 pushRoute
} = navigationActions;

const { View, Text } = ReactNative;

export class HomeScreen extends Component {
  renderMainScreen () {
    const { pack, pushRoute } = this.props
    if (pack.effects) return <Pack selectSupplement={id => pushRoute({key: 'supplement', id: id})} pack={pack} />
  }
  render() {
    const { screen: { showLoader } } = this.props
    return (
      <View style={styles.container}>
        { showLoader ? <Text>Loading...</Text> : this.renderMainScreen() }
      </View>
    );
  }
}

HomeScreen.propTypes = {
  screen: React.PropTypes.object.isRequired,
  pack: React.PropTypes.object,
  pushRoute: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    pushRoute: (options) => dispatch(pushRoute(options, TOP_LEVEL_NAVIGATION_KEY)),
  };
}

function mapStateToProps(state) {
  return {
    screen: homeScreenState(state),
    pack: packState(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
