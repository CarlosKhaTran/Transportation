// @flow

import React, { Component } from 'react';
import { AppState, DeviceEventEmitter, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import store from './store';
import AppNavigation from './routers';
import { Modal, Loading } from './components/Global';
import { commonStyles } from './assets';
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
      <Provider store={store.store}>
        <PersistGate persistor={store.persistor}>
          <View style={commonStyles.fill}>
            <AppNavigation
              key="main"
              ref={(navigator) => {
                this.navigator = navigator;
              }}
            />
            <Modal.Component key="modal" />
            <Loading.Component />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}
