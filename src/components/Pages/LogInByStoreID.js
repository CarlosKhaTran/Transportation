// @flow
import React from 'react';
import _ from 'lodash';
import {
  Image, StyleSheet, View, Text, Alert
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
  geStoreInfo: (storeID: string, cb: (isSucess: boolean) => void) => void,
  reset: () => void
};
type State = {
  storeID: string,
  storeIDError: boolean
};

export class LogInByStoreID extends React.Component<Props, State> {
  state = {
    storeID: '',
    storeIDError: false
  };

  componentDidMount() {
    const { reset, navigation } = this.props;
    this.didBlurSubscription = navigation.addListener('didFocus', () => {
      reset();
    });
  }

  onChangeValue = (value: string, name: string) => {
    this.setState({
      [name]: value,
      storeIDError: false
    });
  };

  callBack = (isSucess: boolean) => {
    const { navigation } = this.props;
    if (isSucess) {
      navigation.navigate({
        routeName: SCREENS.COMFIRM_STORE_STATE,
        key: SCREENS.COMFIRM_STORE_STATE
      });
    } else {
      Alert.alert('Lỗi!', 'Không tìm thấy thông tin cửa hàng. Vui lòng kiểm tra lại!');
      this.setState({
        storeIDError: true
      });
    }
  };

  onLogin = () => {
    const { geStoreInfo } = this.props;
    const { storeID } = this.state;
    if (_.isEmpty(storeID)) {
      this.setState({
        storeIDError: true
      });
      return;
    }
    geStoreInfo(storeID, this.callBack);
  };

  didBlurSubscription: any;

  render() {
    const { storeID, storeIDError } = this.state;
    return (
      <Container haveKeyboard>
        <Transition shared="logo">
          <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
        </Transition>
        <View style={styles.content}>
          <View style={styles.formContainer}>
            <View style={styles.formHeader}>
              <Text style={styles.title}>Nhập mã cửa hàng</Text>
            </View>
            <Input
              name="storeID"
              placeholderText="Mã Cửa Hàng"
              block
              error={storeIDError}
              keyboardType="numeric"
              autoCapitalize="none"
              containerStyle={styles.input}
              value={storeID}
              prependIconName="ios-person"
              autoFocus
              onChangeValue={this.onChangeValue}
            />
            <Button title="Nhận Hàng" onPress={this.onLogin} />
          </View>
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  geStoreInfo: (storeID: string, cb: (isSucess: boolean) => void) => {
    dispatch(actions.geStoreInfo(storeID, cb));
  },
  reset: () => dispatch(actions.reset())
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
