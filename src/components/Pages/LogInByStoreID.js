// @flow
import React from 'react';
import _ from 'lodash';
import {
  Image, StyleSheet, View, Text
} from 'react-native';
import { connect } from 'react-redux';
import { Transition } from 'react-navigation-fluid-transitions';
import { NavigationScreenProp } from 'react-navigation';
import { Container } from '../Layout';
import { measures, colors, commonStyles } from '../../assets';
import { Input, Button } from '../Widgets';
import { SCREENS } from '../../routers';
import { actions } from '../../store';

type Props = {
  navigation: NavigationScreenProp<{}>,
  getListBill: (storeID: string, cb: (isSucess: boolean) => void) => void
};
type State = {
  storeID: string,
};

export class LogInByStoreID extends React.Component<Props, State> {
  state = {
    storeID: ''
  };

  onChangeValue = (value: string, name: string) => {
    this.setState({
      [name]: value
    });
  };

  callBack = (isSucess: boolean) => {
    const { navigation } = this.props;
    if (isSucess) {
      navigation.navigate({
        routeName: SCREENS.TRANSPORT_BILL,
        key: SCREENS.TRANSPORT_BILL
      });
    }
  }

  onLogin = () => {
    const { getListBill } = this.props;
    const { storeID } = this.state;
    if (_.isEmpty(storeID)) {
      return;
    }
    getListBill(storeID, this.callBack);
  };

  render() {
    const { storeID } = this.state;
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
              name="storeID"
              placeholderText="Mã Cửa Hàng"
              block
              keyboardType="numeric"
              autoCapitalize="none"
              containerStyle={styles.input}
              value={storeID}
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

const mapDispatchToProps = (dispatch: Function) => ({
  getListBill: (storeID: string, cb: (isSucess: boolean) => void) => dispatch(
    actions.getListBill(storeID, cb)
  )
});

export default connect(
  null,
  mapDispatchToProps
)(LogInByStoreID);

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
    flexDirection: 'column',
    justifyContent: 'center'
  },
  input: {
    marginBottom: measures.marginLong
  }
});
