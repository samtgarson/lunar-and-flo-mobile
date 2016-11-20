import { cardStackReducer } from 'react-native-navigation-redux-helpers';
import { TOP_LEVEL_NAVIGATION_KEY } from '../constants'

const initialState = {
  key: TOP_LEVEL_NAVIGATION_KEY,
  index: 0,
  routes: [
    {
      key: 'mainApplication',
      index: 0,
    },
  ]
};

export default cardStackReducer(initialState);;
