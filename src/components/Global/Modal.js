// @flow
import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { colors, measures } from '../../assets';

let instance = null;
type Props = {};
type State = {
  show: boolean,
  scale: Animated.Value,
  formComponent: React$Node,
  touchOutSideToHide: boolean,
};
const { height, width } = Dimensions.get('window');
class Modal extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      show: false,
      scale: new Animated.Value(0.7),
      formComponent: null,
      touchOutSideToHide: true,
    };
    instance = this;
  }

  timingAnimation = (
    animValue: Animated.Value,
    toValue: number,
    duration: number
  ): any => Animated.timing(animValue, {
    toValue,
    duration,
    useNativeDriver: true,
  });

  touchOutSide = () => {
    const { touchOutSideToHide } = this.state;
    if (touchOutSideToHide) {
      this.hide();
    }
  };

  show(formComponent: React$Node, touchOutSideToHide: boolean) {
    const { show } = this.state;
    if (!show) {
      this.setState({
        show: true,
        formComponent,
        touchOutSideToHide,
      });
    }
  }

  hide() {
    this.setState({
      show: false,
      formComponent: null,
      scale: new Animated.Value(0.7),
    });
  }

  render() {
    const { show, scale } = this.state;
    if (!show) {
      return null;
    }

    if (this.state.formComponent != null) {
      Animated.parallel([
        this.timingAnimation(scale, 1, measures.durationShort),
      ]).start();
    }

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.formContainer,
            {
              transform: [{ scale }],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.touchView}
            activeOpacity={1}
            onPress={this.touchOutSide}
          />
          {this.state.formComponent}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: colors.overlay,
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: measures.marginMedium,
    bottom: measures.zero,
    top: measures.zero,
    left: measures.marginMedium,
  },
  touchView: {
    position: 'absolute',
    top: 0,
    left: 0,
    width,
    height,
  },
});

const ModalPage = {
  Component: Modal,
  show(formComponent: React$Node, touchOutSideToHide: boolean = true) {
    if (instance) {
      instance.show(formComponent, touchOutSideToHide);
    }
  },
  hide() {
    if (instance) {
      instance.hide();
    }
  },
};

export default ModalPage;
