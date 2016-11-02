import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { topLevelNavigationState } from '../../state/topLevelNavigationReducer/reducer';
import { userState } from '../../state/userReducer/reducer';
import { fetchUser } from '../../state/topLevelNavigationReducer/actions';
import styles from './styles';
import MainApplicationNavigation from '../MainApplicationNavigation';
import OnboardingForm from '../OnboardingForm';
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
    const { dispatch, user } = this.props
    
    dispatch(fetchUser())
    if (user.id && !user.onboardedAt) distatch(poshRoute('onboarding'))
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
        renderScene={this.renderScene}
        onNavigate={() => {}}
      />
    );
  }
}


TopLevelNavigation.propTypes = {
  topLevelNavigationState: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

function mapStateToProps(state) {
  return {
    topLevelNavigationState: topLevelNavigationState(state),
    user: userState(state)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopLevelNavigation);
