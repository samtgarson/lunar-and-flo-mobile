import { cardStackReducer } from 'react-native-navigation-redux-helpers';

const initialState = {
  key: 'topLevelNavigationReducer',
  index: 0,
  routes: [
    {
      key: 'topLevelNavigationReducer-initial-card',
      index: 0,
    },
  ],
};

const topLevelNavigationReducer = cardStackReducer(initialState);

export default topLevelNavigationReducer;


export function selectTopLevelNavigationReducer(state) {
  return state.get('topLevelNavigationReducer');
}
