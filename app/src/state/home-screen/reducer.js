import { createSelector } from 'reselect';
import { 
  SHOW_HOME_SCREEN_LOADER,
  HIDE_HOME_SCREEN_LOADER
} from '../constants';

const initialState = {
  showLoader: false
}

export default function homeScreenReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_HOME_SCREEN_LOADER:
      return {
        ...state,
        showLoader: true
      };
    case HIDE_HOME_SCREEN_LOADER:
      return {
        ...state,
        showLoader: false
      };
    default:
      return state;
  }
}

export const homeScreenState = createSelector(
  (state) => state.get('homeScreenReducer'), 
  (HomeScreenReducer) => ({ ...HomeScreenReducer })
)
