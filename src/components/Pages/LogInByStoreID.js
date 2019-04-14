// @flow
import React from 'react';
import {
  Image, StyleSheet, View, Text
} from 'react-native';
import { Transition } from 'react-navigation-fluid-transitions';
import { NavigationScreenProp } from 'react-navigation';
import { Container } from 'src/components/Layout';
import { measures, colors, commonStyles } from 'src/assets/index';
import { Input, Button } from 'src/components/Widgets';
import { SCREENS } from 'src/routers';

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {
  storeId: string,
};

export default class LogInByStoreID extends React.Component<Props, State> {
  state = {
    storeId: '',
  };

  onChangeValue = (value: string, name: 'storeId') => {
    this.setState({
      [name]: value
    });
  };

  onLogin = () => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: SCREENS.TRANSPORT_BILL,
      key: SCREENS.TRANSPORT_BILL
    });
  };

  render() {
    const { storeId } = this.state;
    return (
      <Container haveKeyboard>
        <Transition shared="logo">
          <Image style={styles.logo} source={require('src/assets/images/logo.png')} />
        </Transition>
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Text style={styles.title}>Đăng Nhập</Text>
            </View>
            <Input
              name="storeId"
              placeholderText="Mã Cửa Hàng"
              block
              autoCapitalize="none"
              containerStyle={styles.input}
              value={storeId}
              prependIconName="ios-person"
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
    ...commonStyles.textBold,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  input: {
    marginBottom: measures.marginLong
  }
});
