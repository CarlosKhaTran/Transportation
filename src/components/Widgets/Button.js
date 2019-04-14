// @flow
import React, { Component } from 'react';
import {
  TouchableOpacity, StyleSheet, Text
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from './Icon';
import { colors, commonStyles, measures } from '../../assets';

type Props = {
  type?: 'primary' | 'secondary' | "text",
  color?: ?String,
  title?: string,
  style?: ?Object,
  titleStyle?: ?Object,
  top?: ?number,
  bottom?: ?number,
  onPress?: () => void,
  block?: ?boolean,
  height?: number,
  iconName?: string,
};
export default class Button extends Component<Props> {
  static defaultProps: Props = {
    title: 'Missing Title',
    bottom: measures.marginLong,
    top: measures.marginMedium,
    block: false,
    height: 48,
    onPress: () => { },
    iconName: '',
    titleStyle: undefined,
    style: undefined,
    color: undefined,
    type: 'primary'
  };

  containerStyle = (): Object => {
    const {
      type, color, height, top, bottom, block
    } = this.props;
    switch (type) {
      case 'secondary':
        return {
          ...styles.container,
          height,
          marginTop: top,
          marginBottom: bottom,
          ...commonStyles.shadow,
          marginHorizontal: measures.marginSmall,
          width: !block ? measures.buttonWidth : '100',
        };
      case 'text':
        return {
          alignSelf: 'center',
          marginTop: top,
          marginBottom: bottom,
        };
      default:
        return {
          ...styles.container,
          backgroundColor: color || colors.primaryColor,
          marginTop: top,
          height,
          marginBottom: bottom,
          marginHorizontal: measures.marginSmall,
          width: !block ? measures.buttonWidth : '100%',
        };
    }
  }

  titleStyle = (): Object => {
    const { type, color } = this.props;
    switch (type) {
      case 'secondary':
        return {
          ...styles.title,
          color: colors.primaryColor,
          fontSize: measures.fontSizeMedium,
        };
      case 'text':
        return {
          ...commonStyles.text,
          color: color || colors.black,
          fontWeight: '400',
        };
      default:
        return {
          ...styles.title,
          color: colors.white,
          fontSize: measures.fontSizeMedium,
        };
    }
  }

  renderLinearbackground = () => {
    const { type } = this.props;
    switch (type) {
      case 'primary':
        return (
          <LinearGradient
            colors={[colors.lightPrimaryColor, colors.primaryColor]}
            style={styles.gradient}
            end={{ x: 0, y: 0 }}
            start={{ x: 1, y: 0 }}
          />
        );
      case 'secondary':
        return (
          <LinearGradient
            colors={[colors.white, colors.lightGray]}
            style={styles.gradient}
            end={{ x: 0, y: 0 }}
            start={{ x: 1, y: 0 }}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const {
      style, title, titleStyle, onPress, iconName,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[this.containerStyle(), style]}
      >
        {this.renderLinearbackground()}
        {iconName !== '' && <Icon name={iconName} style={{ position: 'absolute', left: measures.marginMedium, top: measures.defaultUnit }} color={colors.black} />}
        <Text style={[this.titleStyle(), titleStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: measures.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    height: '100%',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 0,
    borderRadius: measures.borderRadius,
  },
  title: {
    ...commonStyles.textBold,
    fontSize: measures.fontSizeMedium,
  },
});
