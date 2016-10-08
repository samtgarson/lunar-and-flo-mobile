import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectTopLevelNavigationReducer } from '../../state/topLevelNavigationReducer/reducer';
import styles from './styles';

const { View, Text, NavigationExperimental } = ReactNative;
const { CardStack: NavigationCardStack } = NavigationExperimental;

export class TopLevelNavigation extends Component {
  constructor(props) {
    super(props);

    this.renderScene = this.renderScene.bind(this);
    this.renderOverlay = this.renderOverlay.bind(this);
  }

  // XX: get rid of this eslint-disable thingy once you set up
  // proper rendering for your scene
  // eslint-disable-next-line no-unused-vars
  renderScene(props) {
    // check *props.scene.route.key* to figure out
    // which scene shoud be rendered, for example
    //
    // if (props.scene.route.key === 'applicationTabs') {
    //  return (
    //    <View>
    //      <ApplicationTabs />
    //    </View>
    //  );
    // }
    //
    // To navigate around use pushRoute and popRoute actions:
    // import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
    // const {
    //  popRoute,
    //  pushRoute
    // } = navigationActions;
    //
    // pushRoute({ key: 'route smth'}, this.props.TopLevelNavigationReducer.key);
    // popRoute(this.props.TopLevelNavigationReducer.key);


    return (
      <View style={styles.container}>
        <Text>Generic scene in TopLevelNavigation</Text>
      </View>
    );
  }

  renderOverlay() {
    return null;
  }

  render() {
    const navigationState = this.props.TopLevelNavigationReducer;
    return (
      <NavigationCardStack
        direction={'vertical'}
        style={styles.main}
        navigationState={navigationState}
        renderOverlay={this.renderOverlay}
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
    dispatch,
  };
}

export default connect(
  createSelector(selectTopLevelNavigationReducer, (TopLevelNavigationReducer) => ({ TopLevelNavigationReducer })),
  mapDispatchToProps
)(TopLevelNavigation);
