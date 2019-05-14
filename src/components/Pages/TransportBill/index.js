// @flow
import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Text, Alert
} from 'react-native';
import { NavigationScreenProp, StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import {
  Container, Header, StoreInfo, SuccessView
} from '../../Layout';
import { colors, commonStyles, measures } from '../../../assets';
import { Icon, MessagePopup } from '../../Widgets';
import { Modal, Loading } from '../../Global';
import Row from './Row';
import { putInsertBill } from '../../../service';
import { actions } from '../../../store';
import { SCREENS } from '../../../routers';
import type { Bill } from './type';

type Props = {
  navigation: NavigationScreenProp<{}>,
  totalItem: number,
  getListBill: () => void,
};
type State = {
  bills: Array<Bill>,
  modalSuccess: boolean,
  checkList: { [string]: boolean },
  actualReceivedList: { [string]: string },
  notesList: { [string]: string }
};

export class TransportBill extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: { bills: Array<Bill> }) {
    const listBill: Array<Bill> = props.bills.map((item: Bill) => ({
      ...item,
      actual_Received: item.soBich
    }));
    return {
      bills: listBill
    };
  }

  state = {
    bills: [],
    modalSuccess: false,
    checkList: {},
    actualReceivedList: {},
    notesList: {}
  };

  clampedScrollValue = 0;

  offsetValue = 0;

  scrollValue = 0;

  componentDidMount() {
    this.props.getListBill();
  }

  onCheck = (itemCode: string, check: boolean) => {
    this.setState((state: State) => ({
      ...state,
      checkList: {
        ...state.checkList,
        [itemCode]: check
      }
    }));
  };

  onChangeBill = (value: string, name: string) => {
    this.setState(state => ({
      ...state,
      actualReceivedList: {
        ...state.actualReceivedList,
        [name]: value
      }
    }));
  };

  onReset = () => {
    Modal.hide();
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: SCREENS.LOG_IN_BY_STOREID })]
    });
    navigation.dispatch(resetAction);
  };

  onChangeNotes = (value: string, name: string) => {
    this.setState(state => ({
      ...state,
      notesList: {
        ...state.notesList,
        [name]: value
      }
    }));
  };

  renderItem = ({ item, index }: { item: Bill, index: number }) => (
    <Row
      item={item}
      index={index}
      checked={this.state.checkList[item.item_Code]}
      onCheck={this.onCheck}
      onChangeBill={this.onChangeBill}
      onChangeNotes={this.onChangeNotes}
      actualReceived={this.state.actualReceivedList[item.item_Code]}
    />
  );

  onInsert = () => {
    Modal.hide();
    const { bills, actualReceivedList, notesList } = this.state;
    const listBills: Array<Bill> = bills.map((item) => {
      const actualReceived = actualReceivedList[item.item_Code];
      return {
        ...item,
        actual_Received: actualReceived ? parseInt(actualReceived, 10) : item.actual_Received,
        notes: notesList[item.item_Code] || null
      };
    });
    const wrongNode = listBills.find(item => item.actual_Received > item.soBich);
    if (wrongNode) {
      const indexof = listBills.indexOf(wrongNode);
      Alert.alert(
        'Thông tin không hợp lệ',
        `Sản phâm ${indexof + 1}. ${
          wrongNode.item_Name
        } có số lượng thực nhận lớn hơn số lượng chuyển hàng. Vui lòng kiểm tra lại`
      );
      return;
    }
    Loading.show();
    putInsertBill({ bill: listBills })
      .then(() => {
        Loading.hide();
        Modal.show(<SuccessView onBack={this.onReset} />, false);
      })
      .catch((error) => {
        console.log(error);
        Loading.hide();
      });
  };

  onSubmit = () => {
    const { checkList } = this.state;
    const { totalItem } = this.props;
    const numOfChecked = Object.keys(checkList).filter(key => checkList[key]).length;
    const isMissing = numOfChecked < totalItem;
    if (isMissing) {
      Alert.alert('Thông báo', 'Vui lòng xác nhận đầy đủ các đơn hàng!');
      return;
    }
    Modal.show(
      <MessagePopup
        leftTitle="OK"
        rightTitle="Cancel"
        title="GỦI THÔNG TIN"
        message="Bấm Ok để gửi thông tin"
        leftAction={this.onInsert}
        rightAction={() => Modal.hide()}
      />
    );
  };

  onBack = () => {
    Modal.hide();
    const { navigation } = this.props;
    navigation.goBack();
  };

  onEndReached = () => {
    const { bills } = this.state;
    const { totalItem, getListBill } = this.props;
    if (bills.length < totalItem) {
      getListBill();
    }
  };

  openDrawer = () => {
    const { navigation } = this.props;
    navigation.toggleDrawer();
  };

  render() {
    const { bills, checkList } = this.state;
    const { totalItem } = this.props;
    const numOfChecked = Object.keys(checkList).filter(key => checkList[key]).length;
    return (
      <Container>
        <Header
          title="ĐƠN HÀNG VẬN CHUYỂN"
          leftIcon={<Icon name="ios-menu" color={colors.white} />}
          handleLeftButton={this.openDrawer}
          rightIcon={(
            <Text
              style={[
                styles.confirmText,
                { color: numOfChecked === totalItem ? colors.green : colors.red }
              ]}
            >
              {`${numOfChecked}/${totalItem}`}
            </Text>
)}
          handleRightButton={() => {}}
        />
        <View style={commonStyles.fill}>
          <StoreInfo />
          {/* $FlowFixMe */}
          <KeyboardAwareFlatList
            extraScrollHeight={measures.defaultUnit * 2}
            contentContainerStyle={styles.flatList}
            data={bills}
            extractData={this.state}
            renderItem={this.renderItem}
            keyExtractor={(item: Bill, index: number) => item.item_Code + index}
            onEndReached={this.onEndReached}
          />
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={this.onSubmit}>
          <Icon name="ios-send" color={colors.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={this.onBack}>
          <Icon name="ios-arrow-back" color={colors.lightPrimaryColor} />
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  getListBill: () => dispatch(actions.getListBill()),
});

const mapStateToProps = state => ({
  bills: state.transStore.bills,
  totalItem: state.transStore.totalItem
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransportBill);

const styles = StyleSheet.create({
  sendButton: {
    ...commonStyles.shadow,
    width: measures.defaultUnit * 6,
    height: measures.defaultUnit * 6,
    borderRadius: measures.defaultUnit * 3,
    backgroundColor: colors.lightPrimaryColor,
    bottom: measures.marginMedium,
    right: measures.marginMedium + measures.defaultUnit,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    paddingTop: measures.paddingSmall / 2
  },
  flatList: { paddingTop: measures.paddingMedium, paddingBottom: measures.paddingLong * 4 },
  confirmText: {
    ...commonStyles.textBold
  },
  backButton: {
    ...commonStyles.shadow,
    width: measures.defaultUnit * 6,
    height: measures.defaultUnit * 6,
    borderRadius: measures.defaultUnit * 3,
    backgroundColor: colors.lightGray,
    bottom: measures.marginMedium,
    left: measures.marginMedium + measures.defaultUnit,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  }
});
