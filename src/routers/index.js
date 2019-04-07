// @flow
import { createAppContainer } from 'react-navigation';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import * as pages from 'src/components/Pages';
import SCREENS from './screens';

export { default as SCREENS } from './screens';

export default createAppContainer(FluidNavigator(
  {
    [SCREENS.LOADING]: {
      screen: pages.Loading,
    },
    [SCREENS.INTRO]: {
      screen: pages.Intro,
    },
    [SCREENS.LOG_IN]: {
      screen: pages.LogIn,
    }
  },
  {
    headerMode: 'none',
  }
));
