// @flow
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProp } from 'react-navigation';
// import RNPickerSelect from 'react-native-picker-select';
import { Container, Header, StoreInfo } from '../Layout';
import { commonStyles, measures, colors } from '../../assets';
import { Icon, Button } from '../Widgets';
import { actions } from '../../store';
import { SCREENS } from '../../routers';

type Props = {
  navigation: NavigationScreenProp<{}>,
  getTotalBillsCount: () => void,
  totalItem: ?number
};

type State = {
  issue: ?string
};

export class ComfirmStoreState extends React.Component<Props, State> {
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
                title="Có vấn đề"
                block
                onPress={() => this.navigate(SCREENS.REPORT_STORE)}
              />
            </View>
            <View style={commonStyles.fill}>
              <Button
                type="primary"
                title="Tải đơn hàng"
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
          <Text style={styles.warinngContent}>
            Cửa hàng hiện tại không tồn tại đơn hàng. Vui lòng kiểm tra lại mã cửa hàng!
          </Text>
        </View>
        <View style={styles.noBillsWarningFooter}>
          <Button type="secondary" title="Quay lại" block onPress={this.onBack} />
        </View>
      </View>
    </View>
  );

  render() {
    const { totalItem } = this.props;
    return (
      <Container>
        <Header handleLeftButton={this.onBack} title="XÁC NHẬN CỬA HÀNG" />
        <View style={styles.content}>
          <StoreInfo />
          {!totalItem ? this.renderNoBillsWarning() : this.renderActionForm()}
        </View>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTotalBillsCount: () => dispatch(actions.getTotalBillsCount())
});

const mapStateToProps = state => ({
  totalItem: state.transStore.totalItem
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComfirmStoreState);

const styles = StyleSheet.create({
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
  buttonContainer: {
    flexDirection: 'row',
    width: '100%'
  }
});
