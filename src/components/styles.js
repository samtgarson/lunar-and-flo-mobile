import { StyleSheet } from 'react-native';

const container = {
  flex: 1
}
const screen = {
  ...container,
  paddingTop: 30,
  paddingHorizontal: 12,
  position: 'relative'
}

const tabScreen = {
  ...screen,
  paddingBottom: 50
}

const modal = {
  ...screen,
  justifyContent: 'center'
}

export default { container, screen, modal, tabScreen };
