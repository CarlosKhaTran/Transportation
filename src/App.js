// @flow

import React, { Component } from 'react';
import {
  AppState, DeviceEventEmitter
} from 'react-native';
import AppNavigation from 'src/routers';
import { Modal } from 'src/components/Global';
// import Initial, { SCREENS } from './routers';

type Props = {};
type State = {};

export default class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    DeviceEventEmitter.addListener('deviceResume', this.onAppResume);
    DeviceEventEmitter.addListener('devicePause', this.onAppPause);
    AppState.addEventListener('change', this.onAppStateChange);
  }

  onAppStateChange = (currentAppState: typeof AppState) => {
    console.log(currentAppState);
  };

  onAppResume = () => {
    console.log('onAppResume');
  };

  onAppPause = () => {
    console.log('onAppPause');
  };

  notificationListener: any;

  notificationDisplayedListener: any;

  navigator: any;

  render() {
    return (
      [
        <AppNavigation
          key="main"
          ref={(navigator) => {
            this.navigator = navigator;
          }}
        />,
        <Modal.Component
          key="modal"
        />]
    );
  }
}
