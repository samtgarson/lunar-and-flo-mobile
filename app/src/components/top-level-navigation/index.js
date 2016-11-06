import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import topLevelNavigationState from '../../state/top-level-navigation/selector';
import { fetchUser } from '../../state/top-level-navigation/actions';
import userState from '../../state/user/selector';
import styles from './styles';
import MainApplicationNavigation from '../main-application-navigation';
import OnboardingForm from '../onboarding-form';
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
  }

  componentDidMount () {
    this.props.fetchUser()
  }

  renderScene(props) {
    return {
      mainApplication: <MainApplicationNavigation />,
      onboarding: <OnboardingForm />
    }[props.scene.route.key]
  }

  render() {
    return (
      <NavigationCardStack
        direction={'vertical'}
        style={styles.main}
        navigationState={this.props.topLevelNavigationState}
        renderScene={this.renderScene.bind(this)}
        onNavigate={() => {}}
      />
    );
  }
}


TopLevelNavigation.propTypes = {
  topLevelNavigationState: React.PropTypes.object.isRequired,
  fetchUser: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    topLevelNavigationState: topLevelNavigationState(state),
    user: userState(state)
  };
}

export default connect(
  mapStateToProps,
  { fetchUser }
)(TopLevelNavigation);
