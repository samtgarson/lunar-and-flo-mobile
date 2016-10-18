import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { selectMainApplicationNavigationReducer } from '../../state/mainApplicationNavigationReducer/reducer';
import styles from './styles';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import HomeScreen from '../HomeScreen';

const { View, TabBarIOS } = ReactNative;
const { jumpTo } = navigationActions;

export class MainApplicationNavigation extends Component {
  constructor(props) {
    super(props);

    this.renderTabContent = this.renderTabContent.bind(this);
  }

  // XX: get rid of this eslint-disable thingy once you set up
  // proper rendering for your tabs
  // eslint-disable-next-line no-unused-vars
  renderTabContent(tab) {
    return {
      homeScreen: <HomeScreen />,
    }[tab.key]
  }

  render() {
    const { dispatch, MainApplicationNavigationReducer } = this.props;
    const children = MainApplicationNavigationReducer.routes.map((tab, i) =>
      (
      <TabBarIOS.Item
        key={tab.key}
        icon={tab.icon}
        selectedIcon={tab.selectedIcon}
        title={tab.title}
        onPress={
          () => dispatch(jumpTo(i, MainApplicationNavigationReducer.key))
        }
        selected={this.props.MainApplicationNavigationReducer.index === i}
      >
        {this.renderTabContent(tab)}
      </TabBarIOS.Item>
      )
    );
    return (
      <TabBarIOS>
        {children}
      </TabBarIOS>
    );
  }
}

MainApplicationNavigation.propTypes = {
  MainApplicationNavigationReducer: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  createSelector(selectMainApplicationNavigationReducer, (MainApplicationNavigationReducer) => ({ MainApplicationNavigationReducer })),
  mapDispatchToProps
)(MainApplicationNavigation);
