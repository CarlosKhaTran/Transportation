// @flow
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import { measures, commonStyles } from 'src/assets';

type Props = {
  children?: ?Array<React$Node>,
  pad: ?boolean,
  style?: any,
  haveKeyboard: boolean,
};

export default class Container extends Component<Props> {
  static defaultProps = {
    children: null,
    style: {},
  }

  onDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  containerStyle = () => {
    const { pad } = this.props;
    return pad ? { padding: measures.paddingMedium } : {};
  }

  render() {
    const { children, style, haveKeyboard } = this.props;
    return haveKeyboard ? (
      <TouchableWithoutFeedback onPress={this.onDismissKeyboard}>
        <View style={{ flex: 1 }}>
          <View
            style={[styles.container, this.containerStyle(), style]}
          >
            <Image style={styles.imageBackground} source={require('src/assets/images/background.png')} />
            <View style={commonStyles.fill}>
              {children}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    ) : (
      <View
        style={[styles.container, this.containerStyle(), style]}
      >
        <Image style={styles.imageBackground} source={require('src/assets/images/background.png')} />
        <View style={[commonStyles.fill]}>
          {children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  keyboardDismissView: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageBackground: {
    opacity: 0.3,
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
