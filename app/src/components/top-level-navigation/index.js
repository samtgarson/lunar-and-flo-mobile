import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import topLevelNavigationState from '../../state/top-level-navigation/selector';
import userState from '../../state/user/selector';
import { initializeApp } from '../../state/top-level-navigation/actions';
import styles from '../styles';
import MainApplicationNavigation from '../main-application-navigation';
import { TOP_LEVEL_NAVIGATION_KEY } from '../../state/constants'
import OnboardingForm from '../onboarding-form';
import SupplementModal from '../supplement-modal';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';

const {
 pushRoute,
 popRoute
} = navigationActions;


const { View, Text, NavigationExperimental } = ReactNative;
const { CardStack: NavigationCardStack } = NavigationExperimental;

export class TopLevelNavigation extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount () {
    this.props.initializeApp()
  }

  renderScene(props) {
    const { showSupplement, dismissModal } = this.props
    return {
      mainApplication: <MainApplicationNavigation showSupplement={showSupplement} />,
      onboarding: <OnboardingForm />,
      supplement: <SupplementModal dismiss={dismissModal} id={props.scene.route.id} />
    }[props.scene.route.key]
  }

  navigateBack() {
    ['onboarding'].includes(this.props.topLevelNavigationState.routes[this.props.topLevelNavigationState.routes.length - 1].key) || this.props.dismissModal()
  }

  render() {
    return (
      <NavigationCardStack
        direction={'vertical'}
        style={styles.main}
        navigationState={this.props.topLevelNavigationState}
        renderScene={this.renderScene.bind(this)}
        onNavigateBack={this.navigateBack.bind(this)}
      />
    );
  }
}


TopLevelNavigation.propTypes = {
  topLevelNavigationState: React.PropTypes.object.isRequired,
  initializeApp: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    topLevelNavigationState: topLevelNavigationState(state),
    user: userState(state)
})

const mapDispatchToProps = dispatch => ({
  showSupplement: (id) => dispatch(pushRoute({key: 'supplement', id: id}, TOP_LEVEL_NAVIGATION_KEY)),
  initializeApp: () => dispatch(initializeApp()),
  dismissModal: () => dispatch(popRoute(TOP_LEVEL_NAVIGATION_KEY))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopLevelNavigation);
