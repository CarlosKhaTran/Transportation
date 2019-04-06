// @flow
import { createAppContainer, createStackNavigator } from 'react-navigation';
import * as pages from 'src/components/Pages';
import SCREENS from './screens';

export { default as SCREENS } from './screens';

export default createAppContainer(createStackNavigator(
  {
    [SCREENS.LOADING]: {
      screen: pages.Loading,
    },
    [SCREENS.INTRO]: {
      screen: pages.Intro,
    }
  },
  {
    headerMode: 'none',
  }
));
