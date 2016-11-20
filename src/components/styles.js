import { StyleSheet } from 'react-native';

const container = {
  flex: 1
}
const screen = {
  ...container,
  paddingTop: 30,
  paddingHorizontal: 12,
}

const modal = {
  ...screen,
  justifyContent: 'center'
}

export default StyleSheet.create({ container, screen, modal });
