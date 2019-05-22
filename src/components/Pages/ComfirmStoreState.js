// @flow
import React from 'react';
import _ from 'lodash';
import {
  View, StyleSheet, Text, TouchableOpacity, Alert
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp, SafeAreaView } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
// import RNPickerSelect from 'react-native-picker-select';
import { Container, StoreInfo } from '../Layout';
import { commonStyles, measures, colors } from '../../assets';
import { Icon, Button, Input } from '../Widgets';
import { actions } from '../../store';
import { SCREENS } from '../../routers';

type Props = {
  navigation: NavigationScreenProp<{}>,
  getTotalBillsCount: () => void,
  geStoreInfo: (storeID: string, cb: (isSucess: boolean) => void) => void,
  totalItem: number
};

type State = {
  issue: ?string,
  storeID: string,
  storeIDError: boolean,
  found: boolean
};

const initState = {
  storeID: '',
  storeIDError: false,
  found: false
};
export class ComfirmStoreState extends React.Component<Props, State> {
  state = { ...initState };

  componentDidMount() {
    const { getTotalBillsCount } = this.props;
    getTotalBillsCount();
  }

  onBack = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };

  navigate = (screenName: string, params: Object = {}) => {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: screenName,
      key: screenName,
      params
    });
  };

  renderActionForm = () => (
    <View style={styles.noBillsWarningContainer}>
      <View style={[commonStyles.shadow, { overflow: 'hidden' }]}>
        <View style={styles.noBillsWarningHeader}>
          <Text style={styles.warningTitle}>XÁC NHẬN</Text>
        </View>
        <View style={styles.noBillsWarningBody}>
          <Icon
            type="ant"
            name="questioncircle"
            color={colors.lemon}
            size={measures.iconSizeLarge}
          />
          <Text style={styles.warinngContent}>
            Cửa hàng hiện tại có gặp vấn đề trong việc giao nhận hàng không?
          </Text>
        </View>
        <View style={styles.noBillsWarningFooter}>
          <View style={styles.buttonContainer}>
            <View style={commonStyles.fill}>
              <Button
                type="secondary"
                title="Sự cố"
                block
                onPress={() => this.navigate(SCREENS.REPORT_STORE)}
              />
            </View>
            <View style={commonStyles.fill}>
              <Button
                type="primary"
                title="Nhận hàng"
                block
                onPress={() => this.navigate(SCREENS.TRANSPORT_BILL)}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  renderNoBillsWarning = () => (
    <View style={styles.noBillsWarningContainer}>
      <View style={[commonStyles.shadow, { overflow: 'hidden' }]}>
        <View style={styles.noBillsWarningHeader}>
          <Text style={styles.warningTitle}>THÔNG BÁO</Text>
        </View>
        <View style={styles.noBillsWarningBody}>
          <Icon type="ant" name="warning" color={colors.lemon} size={measures.iconSizeLarge} />
          <Text style={[styles.warinngContent, { marginBottom: measures.marginLong }]}>
            Cửa hàng hiện tại không tồn tại đơn hàng. Vui lòng kiểm tra lại mã cửa hàng!
          </Text>
        </View>
      </View>
    </View>
  );

  renderfoundWarning = () => (
    <View style={styles.noBillsWarningContainer}>
      <View style={[commonStyles.shadow, { overflow: 'hidden' }]}>
        <View style={styles.noBillsWarningHeader}>
          <Text style={styles.warningTitle}>THÔNG BÁO</Text>
        </View>
        <View style={styles.noBillsWarningBody}>
          <Icon type="ant" name="warning" color={colors.lemon} size={measures.iconSizeLarge} />
          <Text style={[styles.warinngContent, { marginBottom: measures.marginLong }]}>
            Vui lòng nhập mã cửa hàng để lấy thông tin!
          </Text>
        </View>
      </View>
    </View>
  );

  onChangeValue = (value: string, name: string) => {
    this.setState({
      [name]: value,
      [`${name}Error`]: false
    });
  };

  renderModal = () => {
    const { totalItem } = this.props;
    const { found } = this.state;
    if (!found) return this.renderfoundWarning();
    return !totalItem ? this.renderNoBillsWarning() : this.renderActionForm();
  };

  callBack = (isSucess: boolean) => {
    if (!isSucess) {
      Alert.alert('Lỗi', 'Không tìm thấy thông tin cửa hàng');
    }
    this.setState({
      found: isSucess
    });
  };

  onSubmit = () => {
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

  render() {
    const { storeID, storeIDError } = this.state;
    return (
      <Container haveKeyboard>
        <View style={styles.headerContainer}>
          <SafeAreaView />
          <LinearGradient
            colors={[colors.lightPrimaryColor, colors.primaryColor]}
            style={styles.gradient}
            end={{ x: 0, y: 0 }}
            start={{ x: 1, y: 0 }}
          />
          <View style={styles.headerBodyContainer}>
            <TouchableOpacity onPress={this.onBack}>
              <Icon name="ios-arrow-back" size={30} color={colors.white} />
            </TouchableOpacity>
            <View style={{ width: measures.defaultUnit }} />
            <View style={commonStyles.fill}>
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
            </View>
            <TouchableOpacity onPress={this.onSubmit} style={styles.submitButton}>
              <Text style={styles.buttonTitle}>Nhập</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <StoreInfo />
          {this.renderModal()}
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTotalBillsCount: () => dispatch(actions.getTotalBillsCount()),
  geStoreInfo: (storeID: string, cb: (isSucess: boolean) => void) => {
    dispatch(actions.geStoreInfo(storeID, cb));
  },
  reset: () => dispatch(actions.reset())
});

const mapStateToProps = state => ({
  totalItem: state.transStore.totalItem
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComfirmStoreState);

const styles = StyleSheet.create({
  headerContainer: {
    height: measures.defaultUnit * 13,
    backgroundColor: colors.primaryColor,
    zIndex: 21,
    ...commonStyles.shadow
  },
  content: commonStyles.fill,
  noBillsWarningContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 2 * measures.marginLong
  },
  noBillsWarningHeader: {
    paddingVertical: measures.paddingMedium,
    alignItems: 'center',
    backgroundColor: colors.fountain
  },
  warningTitle: {
    ...commonStyles.textBold,
    fontSize: measures.fontSizeLarge,
    color: colors.white
  },
  noBillsWarningBody: {
    padding: measures.paddingSmall,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    fontSize: measures.fontSizeLarge
  },
  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  warinngContent: {
    ...commonStyles.text,
    textAlign: 'center',
    color: colors.black,
    fontSize: measures.fontSizeLarge,
    marginHorizontal: measures.marginLong,
    marginTop: measures.marginMedium
  },
  noBillsWarningFooter: {
    paddingVertical: measures.paddingSmall,
    backgroundColor: colors.lightGray
  },
  gradient: {
    height: '100%',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 0
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%'
  },
  headerBodyContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: measures.paddingMedium,
    alignItems: 'center'
  },
  submitButton: {
    height: measures.defaultUnit * 6,
    paddingHorizontal: measures.paddingMedium,
    backgroundColor: colors.smoke,
    borderTopRightRadius: measures.borderRadius,
    borderBottomRightRadius: measures.borderRadius,
    justifyContent: 'center',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: '#6c7a89'
  },
  buttonTitle: {
    ...commonStyles.text,
    color: colors.lightPrimaryColor,
    fontWeight: 'bold'
  }
});
