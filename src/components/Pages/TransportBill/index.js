// @flow
import React from 'react';
import {
  Animated, View, StyleSheet, TouchableOpacity
} from 'react-native';
import { Container, Header } from 'src/components/Layout';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { colors, commonStyles, measures } from 'src/assets';
import { Icon } from 'src/components/Widgets';
import { Modal } from 'src/components/Global';
import Row from './Row';
import GeneralInfo from './GeneralInfo';
import RatingView from './RatingView';
import billsFake from './fakeData';

type Props = {};
type State = {
  bills: Array<Bill>,
  scrollAnim: Animated.Value,
  offsetAnim: Animated.Value,
  clampedScroll: any
};
type Bill = {
  productCode: string,
  productName: string,
  quantDeliveried: string,
  quantReceived: string,
  quantChecked: string,
  note: string
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

export default class TransportBill extends React.Component<Props, State> {
  state = {
    bills: billsFake,
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
    )
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

  renderItem = ({ item, index }: { item: Bill, index: number }) => (
    <Row item={item} index={index} />
  );

  onSubmit = () => {
    Modal.show(<RatingView />);
  };

  scrollEndTimer: any;

  render() {
    const { bills, clampedScroll } = this.state;
    const {
      storeName, staff, date, routeNum
    } = generalInfo;
    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, NAVBAR_HEIGHT],
      outputRange: [0, -NAVBAR_HEIGHT],
      extrapolate: 'clamp'
    });
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
            contentContainerStyle={{ paddingTop: NAVBAR_HEIGHT }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
              { useNativeDriver: true }
            )}
            data={bills}
            onMomentumScrollBegin={this.onMomentumScrollBegin}
            onMomentumScrollEnd={this.onMomentumScrollEnd}
            onScrollEndDrag={this.onScrollEndDrag}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.productCode + index}
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
            <GeneralInfo storeName={storeName} date={date} routeNum={routeNum} staff={staff} />
          </Animated.View>
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={this.onSubmit}>
          <Icon name="ios-send" color={colors.white} />
        </TouchableOpacity>
      </Container>
    );
  }
}

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
  }
});
