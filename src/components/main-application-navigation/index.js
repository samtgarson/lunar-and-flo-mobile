import ReactNative from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import mainApplicationNavigationState from '../../state/main-application-navigation/selector';
import styles from '../styles';
import { actions as navigationActions } from 'react-native-navigation-redux-helpers';
import HomeScreen from '../home-screen';
import SupplementScreen from '../supplement-screen';
import { MAIN_APPLICATION_NAVIGATION_KEY } from '../../state/constants'
import packState from '../../state/db/pack/selector';

const {
 jumpTo
} = navigationActions;

const { View, TabBarIOS } = ReactNative;

export class MainApplicationNavigation extends Component {
  renderTabContent(tab) {
    const { showSupplement, pack } = this.props
    return {
      homeScreen: <HomeScreen pack={pack} selectSupplement={showSupplement} />,
      supplementScreen: <SupplementScreen pack={pack} selectSupplement={showSupplement} />
    }[tab.key]
  }

  render() {
    const { jumpToTab, MainApplicationNavigationReducer } = this.props;
    const children = MainApplicationNavigationReducer.routes.map((tab, i) => (
      <TabBarIOS.Item
        key={tab.key}
        icon={tab.icon}
        selectedIcon={tab.selectedIcon}
        title={tab.title}
        onPress={ () => jumpToTab(i) }
        selected={this.props.MainApplicationNavigationReducer.index === i}>
        {this.renderTabContent.bind(this)(tab)}
      </TabBarIOS.Item>
    ));
    return (
      <TabBarIOS>
        {children}
      </TabBarIOS>
    );
  }
}

MainApplicationNavigation.propTypes = {
  MainApplicationNavigationReducer: React.PropTypes.object.isRequired,
  jumpToTab: React.PropTypes.func.isRequired,
  showSupplement: React.PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    jumpToTab: (i) => dispatch(jumpTo(i, MAIN_APPLICATION_NAVIGATION_KEY))
  };
}

const mapStateToProps = (state) => { 
  return {
    MainApplicationNavigationReducer: mainApplicationNavigationState(state),
    pack: packState(state)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainApplicationNavigation);
