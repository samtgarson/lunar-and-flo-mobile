import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import topLevelNavigationState from '../../state/top-level-navigation/selector';
import userState from '../../state/user/selector';
import { initializeApp } from '../../state/top-level-navigation/actions';
import styles from './styles';
import MainApplicationNavigation from '../main-application-navigation';
import OnboardingForm from '../onboarding-form';
import SupplementModal from '../supplement-modal';

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
    return {
      mainApplication: <MainApplicationNavigation />,
      onboarding: <OnboardingForm />,
      supplement: <SupplementModal id={props.scene.route.id} />
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
  initializeApp: React.PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    topLevelNavigationState: topLevelNavigationState(state),
    user: userState(state)
  };
}

export default connect(
  mapStateToProps,
  { initializeApp }
)(TopLevelNavigation);
