// @flow
import { createAppContainer } from 'react-navigation';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import * as pages from '../components/Pages';
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
    },
    [SCREENS.LOG_IN_BY_STOREID]: {
      screen: pages.LogInByStoreId,
    },
    [SCREENS.TRANSPORT_BILL]: {
      screen: pages.TransportBill,
    }
  },
  {
    headerMode: 'none',
  }
));
