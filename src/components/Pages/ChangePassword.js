// @flow
import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Container, Header } from '../Layout';
import { Icon, Input, Button } from '../Widgets';
import { colors, measures, commonStyles } from '../../assets';

type Props = {
  navigation: NavigationScreenProp<{}>
};

type State = {
  password: string,
  newPassword: string,
  passwordError: boolean,
  newPasswordError: boolean,
  confirmNewPassword: string,
  confirmNewPasswordError: boolean
};

export class ChangePassword extends React.Component<Props, State> {
  state = {
    password: '',
    newPassword: '',
    passwordError: false,
    newPasswordError: false,
    confirmNewPassword: '',
    confirmNewPasswordError: false
  };

  openDrawer = () => {
    const { navigation } = this.props;
    navigation.toggleDrawer();
  };

  onChangeValue = (value: string, name: string) => {
    this.setState({
      [name]: value,
      [`${name}Error`]: false
    });
  };

  render() {
    const {
      password,
      passwordError,
      newPassword,
      newPasswordError,
      confirmNewPassword,
      confirmNewPasswordError
    } = this.state;
    return (
      <Container haveKeyboard>
        <Header
          title="ĐỔI MẬT KHẨU"
          leftIcon={<Icon name="ios-menu" color={colors.white} />}
          handleLeftButton={this.openDrawer}
        />
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Text style={styles.title}>THÔNG TIN BẢO MẬT</Text>
            </View>
            <Input
              name="password"
              error={passwordError}
              placeholderText="Mật khẩu"
              block
              autoCapitalize="none"
              containerStyle={styles.input}
              value={password}
              prependIconColor={colors.green}
              prependIconName="ios-key"
              autoFocus
              passwordInput
              onChangeValue={this.onChangeValue}
            />
            <Input
              name="newPassword"
              error={newPasswordError}
              placeholderText="Mật khẩu mới"
              block
              prependIconColor={colors.rose}
              prependIconName="ios-key"
              autoCapitalize="none"
              passwordInput
              containerStyle={styles.input}
              value={newPassword}
              autoFocus
              onChangeValue={this.onChangeValue}
            />
            <Input
              name="confirmNewPassword"
              error={confirmNewPasswordError}
              placeholderText="Xác nhận mật khẩu mới"
              block
              prependIconColor={colors.fountain}
              prependIconName="ios-key"
              autoCapitalize="none"
              passwordInput
              containerStyle={styles.input}
              value={confirmNewPassword}
              autoFocus
              onChangeValue={this.onChangeValue}
            />
            <View style={styles.buttonContainer}>
              <View style={commonStyles.fill}>
                <Button type="secondary" title="Reset" block onPress={() => {}} />
              </View>
              <View style={commonStyles.fill}>
                <Button type="primary" title="Okay" block onPress={() => {}} />
              </View>
            </View>
          </View>
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = () => ({});

export default connect(
  null,
  mapDispatchToProps
)(ChangePassword);

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
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%'
  }
});
