import ReactNative from 'react-native';
import React, { Component } from 'react';
import styles from '../styles';

import TopLevelNavigation from '../top-level-navigation';

const { View, Text } = ReactNative;

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TopLevelNavigation />
      </View>
    );
  }
}

export default App;
