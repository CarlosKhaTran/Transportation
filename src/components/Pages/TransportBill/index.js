// @flow
import React from 'react';
import {
  Animated, View, StyleSheet, TouchableOpacity
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { Container, Header } from '../../Layout';
import { colors, commonStyles, measures } from '../../../assets';
import { Icon, MessagePopup } from '../../Widgets';
import { Modal, Loading } from '../../Global';
import Row from './Row';
import GeneralInfo from './GeneralInfo';
import RatingView from './RatingView';
import SuccessView from './SuccessView';
import { putInsertBill, putInsertBillRating } from '../../../service';
import type { Bill } from './type';

type Props = {
  navigation: NavigationScreenProp<{}>
};
type State = {
  bills: Array<Bill>,
  scrollAnim: Animated.Value,
  offsetAnim: Animated.Value,
  clampedScroll: any,
  modalRating: boolean,
  modalSuccess: boolean,
  checkList: { [string]: boolean },
  actualReceivedList: { [string]: string },
  notesList: { [string]: string }
};

const generalInfo = {
  storeName: 'VM+HCM 520 quốc lộ 13',
  date: '02/04/2019',
  routeNum: '1',
  staff: 'Nguyen van A'
};

const NAVBAR_HEIGHT = 120;
const scrollAnim = new Animated.Value(0);
const offsetAnim = new Animated.Value(0);
const AnimatedListView = Animated.createAnimatedComponent(KeyboardAwareFlatList);

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
    modalRating: false,
    modalSuccess: false,
    scrollAnim,
    offsetAnim,
    clampedScroll: Animated.diffClamp(
      Animated.add(
        scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp'
        }),
        offsetAnim
      ),
      0,
      NAVBAR_HEIGHT
    ),
    checkList: {},
    actualReceivedList: {},
    notesList: {}
  };

  clampedScrollValue = 0;

  offsetValue = 0;

  scrollValue = 0;

  componentDidMount() {
    this.state.scrollAnim.addListener(({ value }) => {
      // This is the same calculations that diffClamp does.
      const diff = value - this.scrollValue;
      this.scrollValue = value;
      this.clampedScrollValue = Math.min(
        Math.max(this.clampedScrollValue + diff, 0),
        NAVBAR_HEIGHT
      );
    });
    this.state.offsetAnim.addListener(({ value }) => {
      this.offsetValue = value;
    });
  }

  componentWillUnmount() {
    // Don't forget to remove the listeners!
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  onMomentumScrollEnd = () => {
    const toValue = this.scrollValue > NAVBAR_HEIGHT && this.clampedScrollValue > NAVBAR_HEIGHT / 2
      ? this.offsetValue + NAVBAR_HEIGHT
      : this.offsetValue - NAVBAR_HEIGHT;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true
    }).start();
  };

  onScrollEndDrag = () => {
    this.scrollEndTimer = setTimeout(this.onMomentumScrollEnd, 250);
  };

  onMomentumScrollBegin = () => {
    clearTimeout(this.scrollEndTimer);
  };

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
    Loading.show();
    putInsertBill({ bill: listBills })
      .then((res) => {
        if (res) {
          this.onRating();
        }
        Loading.hide();
      })
      .catch((error) => {
        console.log(error);
        Loading.hide();
      });
  };

  sendRating = (score: number, note: string) => {
    const { bills } = this.state;
    const { rowId, store_Code, delivery_Date } = bills[0];
    Modal.hide();
    Loading.show();
    putInsertBillRating({
      ratingContent: {
        rowId,
        store_Code,
        delivery_Date,
        rating: score.toString(),
        ratingNotes: note
      }
    })
      .then((res) => {
        if (res) {
          console.log(res);
          this.hideRatingModalForSuccessModal();
        }
        Loading.hide();
      })
      .catch((error) => {
        console.log(error);
        Loading.hide();
      });
  };

  onRating = () => {
    Modal.show(<RatingView onSuccess={this.sendRating} onCancel={this.hideRatingModal} />);
  };

  onSubmit = () => {
    const { checkList, bills } = this.state;
    const isMissing = bills.find(item => !checkList[item.item_Code]);
    Modal.show(
      <MessagePopup
        leftTitle="OK"
        rightTitle="Cancel"
        title={isMissing ? 'CHƯA XÁC NHẬN ĐỦ!' : 'GỦI THÔNG TIN'}
        message={isMissing ? 'Ban có muốn tiếp tục' : 'Bấm Ok để gửi thông tin'}
        leftAction={this.onInsert}
        rightAction={() => Modal.hide()}
      />
    );
  };

  hideRatingModal = () => {
    Modal.hide();
  };

  hideRatingModalForSuccessModal = () => {
    Modal.hide(() => Modal.show(<SuccessView onBack={this.onBack} />, false));
  };

  onBack = () => {
    Modal.hide();
    const { navigation } = this.props;
    navigation.goBack();
  };

  scrollEndTimer: any;

  render() {
    const { bills, clampedScroll, checkList } = this.state;
    const {
      storeName, staff, date, routeNum
    } = generalInfo;
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: [0, -NAVBAR_HEIGHT],
      extrapolate: 'clamp'
    });
    const numOfChecked = Object.keys(checkList).filter(key => checkList[key]).length;
    return (
      <Container>
        <Header
          title="ĐƠN HÀNG VẬN CHUYỂN"
          rightIcon={<Icon name="list" type="ent" color={colors.white} />}
          handleRightButton={() => {}}
        />
        <View style={commonStyles.fill}>
          <AnimatedListView
            extraScrollHeight={measures.defaultUnit * 2}
            scrollEventThrottle={1}
            contentContainerStyle={styles.flatList}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
              { useNativeDriver: true }
            )}
            data={bills}
            extractData={this.state}
            onMomentumScrollBegin={this.onMomentumScrollBegin}
            onMomentumScrollEnd={this.onMomentumScrollEnd}
            onScrollEndDrag={this.onScrollEndDrag}
            renderItem={this.renderItem}
            keyExtractor={(item: Bill, index: number) => item.item_Code + index}
          />
          <Animated.View
            style={{
              transform: [{ translateY: navbarTranslate }],
              height: NAVBAR_HEIGHT,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0
            }}
          >
            <GeneralInfo
              storeName={storeName}
              date={date}
              routeNum={routeNum}
              staff={staff}
              total={bills.length}
              checked={numOfChecked}
            />
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={this.onSubmit}>
          <Icon name="ios-send" color={colors.white} />
        </TouchableOpacity>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  bills: state.transStore.bills
});

export default connect(mapStateToProps)(TransportBill);

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
  flatList: { paddingTop: NAVBAR_HEIGHT, paddingBottom: measures.paddingLong * 4 }
});
