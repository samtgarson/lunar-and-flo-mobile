import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectTopLevelNavigationReducer } from '../../state/topLevelNavigationReducer/reducer';
import { fetchUser } from '../../state/topLevelNavigationReducer/actions';
import styles from './styles';
import MainApplicationNavigation from '../MainApplicationNavigation';
import OnboardingScreen from '../OnboardingScreen';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

const {
 popRoute,
 pushRoute
} = navigationActions;

const { View, NavigationExperimental } = ReactNative;
const { CardStack: NavigationCardStack } = NavigationExperimental;

export class TopLevelNavigation extends Component {
  constructor(props) {
    super(props);

    this.renderScene = this.renderScene.bind(this);
  }

  componentDidMount () {
    this.props.dispatch(fetchUser())
  }

  renderScene(props) {
    return {
      mainApplication: <MainApplicationNavigation />,
      onboarding: <OnboardingScreen />
    }[props.scene.route.key]
  }

  render() {
    return (
      <NavigationCardStack
        direction={'vertical'}
        style={styles.main}
        navigationState={this.props.TopLevelNavigationReducer}
        renderScene={this.renderScene}
        onNavigate={() => {}}
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
    dispatch
  };
}

export default connect(
  createSelector(selectTopLevelNavigationReducer, (TopLevelNavigationReducer) => ({ TopLevelNavigationReducer })),
  mapDispatchToProps
)(TopLevelNavigation);
