// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { StyleSheet, View, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Transition } from 'react-navigation-fluid-transitions';
import { Container } from '../Layout';
import { colors } from '../../assets';
import { SCREENS } from '../../routers';
import { authorize } from '../../service';

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {};

export class Loading extends Component<Props, State> {
  state = {};

  async componentDidMount() {
    const accessToken = await AsyncStorage.getItem('accessToken');
    let isValid = false;
    if (accessToken) {
      axios.defaults.headers.common.Authorization = accessToken;
      isValid = await authorize();
    }
    setTimeout(() => {
      this.navigate(isValid ? SCREENS.COMFIRM_STORE_STATE : SCREENS.LOG_IN);
    }, 2000);
  }

  componentWillUnmount() {}

  onLoadDone = () => {};

  navigate = (screenName: string, params: Object = {}) => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: screenName,
      key: screenName,
      params
    });
  };

  render() {
    return (
      <Container showBackground={false} style={styles.container}>
        <View style={styles.image}>
          <Transition shared="logo">
            <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
          </Transition>
        </View>
      </Container>
    );
  }
}

export default connect(null)(Loading);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.loadingBackground
  },
  image: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  logo: {
    resizeMode: 'contain',
    width: 300,
    height: 80
  },
  loading: {
    transform: [{ scale: 0.5 }]
  }
});
