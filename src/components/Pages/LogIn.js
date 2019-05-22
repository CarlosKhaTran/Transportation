// @flow
import React from 'react';
import {
  Image, StyleSheet, View, Text
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Transition } from 'react-navigation-fluid-transitions';
import { NavigationScreenProp } from 'react-navigation';
import { Container } from '../Layout';
import { measures, colors, commonStyles } from '../../assets';
import { Input, Button } from '../Widgets';
import { SCREENS } from '../../routers';
import { actions } from '../../store';

type Props = {
  navigation: NavigationScreenProp<{}>,
  requestLogin: (username: string, password: string, cb: (isSucess: boolean) => void) => void
};
type State = {
  username: string,
  password: string,
  passwordError: boolean,
  usernameError: boolean
};

export class LogIn extends React.Component<Props, State> {
  state = {
    username: '',
    password: '',
    usernameError: false,
    passwordError: false
  };

  onChangeValue = (value: string, name: string) => {
    this.setState({
      [name]: value,
      [`${name}Error`]: false
    });
  };

  onLogin = () => {
    const { requestLogin } = this.props;
    const { username, password } = this.state;
    if (_.isEmpty(username)) {
      this.setState({
        usernameError: true
      });
      return;
    }
    if (_.isEmpty(password)) {
      this.setState({
        passwordError: true
      });
      return;
    }
    requestLogin(username, password, this.callback);
  };

  callback = (isSuccess: boolean) => {
    const { navigation } = this.props;
    if (isSuccess) {
      navigation.navigate({
        routeName: SCREENS.COMFIRM_STORE_STATE,
        key: SCREENS.COMFIRM_STORE_STATE
      });
      return;
    }
    this.setState({
      usernameError: true,
      passwordError: true
    });
  };

  render() {
    const {
      username, password, usernameError, passwordError
    } = this.state;
    return (
      <Container haveKeyboard>
        <Transition shared="logo">
          <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
        </Transition>
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Text style={styles.title}>Đăng Nhập</Text>
            </View>
            <Input
              name="username"
              error={usernameError}
              placeholderText="Tên Đăng Nhập"
              block
              autoCapitalize="none"
              containerStyle={styles.input}
              value={username}
              prependIconName="ios-person"
              autoFocus
              onChangeValue={this.onChangeValue}
            />
            <Input
              name="password"
              error={passwordError}
              placeholderText="Mật khẩu"
              block
              prependIconColor={colors.rose}
              prependIconName="ios-key"
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

const mapDispatchToProps = (dispatch: Function) => ({
  requestLogin: (username: string, password: string, cb: (isSucess: boolean) => void) => dispatch(
    actions.requestLogin({
      username,
      password,
      cb
    })
  )
});

export default connect(
  null,
  mapDispatchToProps
)(LogIn);

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 300,
    height: 80,
    marginTop: measures.marginExtremeHuge
  },
  formHeader: {
    alignItems: 'center',
    marginTop: measures.marginSmall,
    marginBottom: measures.marginHuge
  },
  formContainer: {
    marginHorizontal: measures.marginLong,
    paddingTop: measures.paddingLong,
    paddingBottom: measures.paddingSmall,
    paddingHorizontal: measures.paddingSmall,
    backgroundColor: colors.white,
    borderRadius: measures.borderRadius,
    marginTop: -(2 * measures.marginLong),
    ...commonStyles.shadow
  },
  title: {
    fontSize: measures.fontSizeHuge - 10,
    color: colors.black,
    ...commonStyles.textBold
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  input: {
    marginBottom: measures.marginLong
  }
});
