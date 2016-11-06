import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import mainApplicationNavigationState from '../../state/main-application-navigation/selector';
import styles from './styles';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import HomeScreen from '../home-screen';

const { View, TabBarIOS } = ReactNative;
const { jumpTo } = navigationActions;

export class MainApplicationNavigation extends Component {
  constructor(props) {
    super(props);

    this.renderTabContent = this.renderTabContent.bind(this);
  }

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

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
}

const mapStateToProps = (state) => { 
  return {
    MainApplicationNavigationReducer: mainApplicationNavigationState(state) 
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApplicationNavigation);