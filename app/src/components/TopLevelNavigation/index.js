import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectTopLevelNavigationReducer } from '../../state/topLevelNavigationReducer/reducer';
import styles from './styles';
import MainApplicationNavigation from '../MainApplicationNavigation';

const { View, NavigationExperimental } = ReactNative;
const { CardStack: NavigationCardStack } = NavigationExperimental;

export class TopLevelNavigation extends Component {
  constructor(props) {
    super(props);

    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(props) {
    return {
      mainApplication: <MainApplicationNavigation />,
      // onboarding: <OnboardingNavigation />
    }[props.scene.route.key]
  }

  render() {
    return (
      <NavigationCardStack
        direction={'vertical'}
        style={styles.main}
        navigationState={this.props.TopLevelNavigationReducer}
        renderScene={this.renderScene}
      />
    );
  }
}


TopLevelNavigation.propTypes = {
  TopLevelNavigationReducer: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  createSelector(selectTopLevelNavigationReducer, (TopLevelNavigationReducer) => ({ TopLevelNavigationReducer })),
  mapDispatchToProps
)(TopLevelNavigation);
