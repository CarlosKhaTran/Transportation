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

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {};

export class Loading extends Component<Props, State> {
  state = {};

  async componentDidMount() {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      axios.defaults.headers.common.Authorization = accessToken;
    }
    setTimeout(() => {
      this.navigate(accessToken ? SCREENS.LOG_IN_BY_STOREID : SCREENS.LOG_IN);
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

  lottie: any;

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
