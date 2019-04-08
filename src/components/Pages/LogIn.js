// @flow
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import { NavigationScreenProp } from 'react-navigation';
import { Container } from 'src/components/Layout';
import { measures, colors, commonStyles } from 'src/assets/index';
import { Input, Button } from 'src/components/Widgets';
import { SCREENS } from 'src/routers';

type Props = {
  navigation: NavigationScreenProp<{}>,
};
type State = {
  username: string,
  password: string,
};

export default class LogIn extends React.Component<Props, State> {
  state = {
    username: '',
    password: '',
  }

  onChangeValue = (value: string, name: 'username') => {
    this.setState({
      [name]: value,
    });
  }

  onLogin = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.TRANSPORT_BILL,
      key: SCREENS.TRANSPORT_BILL,
    });
  }

  render() {
    const { username, password } = this.state;
    return (
      <Container haveKeyboard>
        <Transition shared="logo">
          <Image style={styles.logo} source={require('src/assets/images/logo.png')} />
        </Transition>
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <Input
              name="username"
              placeholderText="Tên Đăng Nhập"
              block
              autoCapitalize="none"
              containerStyle={styles.input}
              value={username}
              preppendIconName="ios-person"
              autoFocus
              onChangeValue={this.onChangeValue}
            />
            <Input
              name="password"
              placeholderText="Mật khẩu"
              block
              preppendIconName="ios-key"
              autoCapitalize="none"
              passwordInput
              containerStyle={styles.input}
              value={password}
              autoFocus
              onChangeValue={this.onChangeValue}
            />
            <Button title="ĐĂNG NHẬP" onPress={this.onLogin} />
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 300,
    height: 80,
    marginTop: measures.marginLong,
  },
  formContainer: {
    marginHorizontal: measures.marginLong,
    paddingTop: measures.paddingLong,
    paddingBottom: measures.paddingSmall,
    paddingHorizontal: measures.paddingSmall,
    backgroundColor: colors.white,
    borderRadius: measures.borderRadius,
    marginTop: -(2 * measures.marginLong),
    ...commonStyles.shadow,
  },
  content: {
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    marginBottom: measures.marginLong
  },
});