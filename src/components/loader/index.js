import { Text, StyleSheet } from 'react-native';
import React from 'react';
import { View } from 'react-native-animatable'

const styles = {
  loader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    zIndex: 1000,
    opacity: 0
  }
};


const Loader = (props) => (
  <View pointerEvents={props.display ? "auto" : "none"} transition="opacity" style={{...styles.loader, opacity: props.display ? 1 : 0 }}><Text>Loading</Text></View>
)

Loader.propTypes = {
  display: React.PropTypes.bool
};

export default Loader;
