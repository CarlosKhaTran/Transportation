// @flow
import { createAppContainer, createDrawerNavigator } from 'react-navigation';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import * as pages from '../components/Pages';
import SCREENS from './screens';
import { measures } from '../assets';
import { Drawer } from '../components/Layout';

export { default as SCREENS } from './screens';

export default createAppContainer(
  FluidNavigator(
    {
      [SCREENS.LOADING]: {
        screen: pages.Loading
      },
      [SCREENS.INTRO]: {
        screen: pages.Intro
      },
      [SCREENS.LOG_IN]: {
        screen: pages.LogIn
      },
      [SCREENS.LOG_IN_BY_STOREID]: {
        screen: pages.LogInByStoreID
      },
      [SCREENS.TRANSPORT_BILL]: {
        screen: createDrawerNavigator(
          {
            [SCREENS.TRANSPORT_BILL]: pages.TransportBill,
            [SCREENS.CHANGE_PASSWORD]: {
              screen: pages.ChangePassword
            }
          },
          {
            drawerOpenRoute: 'DrawerOpen',
            drawerCloseRoute: 'DrawerClose',
            drawerPosition: 'left',
            drawerToggleRoute: 'DrawerToggle',
            drawerLockMode: 'unlocked',
            drawerWidth: measures.width * 0.8,
            contentComponent: Drawer
          }
        )
      },
      [SCREENS.COMFIRM_STORE_STATE]: {
        screen: pages.ComfirmStoreState
      },
      [SCREENS.REPORT_STORE]: {
        screen: pages.ReportStore
      }
    },
    {
      headerMode: 'none'
    }
  )
);
