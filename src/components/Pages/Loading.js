// @flow
import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Container } from 'src/components/Widgets';
import { colors } from 'src/assets';
import { SCREENS } from 'src/routers/index';

type Props = {
  navigation: NavigationScreenProp<{}>,
  // isReady: boolean,
};
type State = {
};

export default class Loading extends Component<Props, State> {
  state = {
  }

  componentWillUnmount() {
  }

  onLoadDone = () => {

  };

  componentDidMount = () => {
    setTimeout(() => {
      this.navigate(SCREENS.INTRO);
    }, 2000);
  }

  navigate = (screenName: string, params: Object = {}) => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: screenName,
      key: screenName,
      params,
    });
  };

  lottie: any;

  render() {
    return (
      <Container showBackground={false} style={styles.container}>
        <Image style={styles.imageBackground} source={require('src/assets/images/background.png')} />
        <View style={styles.image}>
          <Image style={styles.logo} source={require('src/assets/images/logo.png')} />
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.loadingBackground,
  },
  image: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logo: {
    resizeMode: 'contain',
    width: 300,
    height: 80,
  },
  imageBackground: {
    opacity: 0.3,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  loading: {
    transform: [{ scale: 0.5 }]
  }
});
