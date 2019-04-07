// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import {
  TextInput, StyleSheet, TouchableOpacity, Text, Animated, View
} from 'react-native';
import { measures, colors, commonStyles } from 'src/assets';
import Icon from './Icon';

type Props = {
  containerStyle?: ?Object,
  inputStyle?: ?Object,
  name?: ?string,
  error?: ?string,
  value: string,
  onChangeValue?: (value: string, name?: ?string) => void,
  top?: ?number,
  bottom?: ?number,
  block?: ?boolean,
  passwordInput?: boolean,
  placeholderText?: string,
  appendText?: string,
  appendIcon?: string,
  value?: string,
  preppendIconName: string,
  preppendIconColor?: string,
};

type State = {
  showPassword: boolean,
  transitionAnimValue: Animated.Value,
  onActive: boolean,
  injectValue: boolean,
  _value: number
};

export default class Input extends Component<Props, State> {
  static defaultProps = {
    top: 0,
    onChangeValue: () => { },
    bottom: measures.marginLong,
    block: false,
    value: '',
    name: 'input',
    error: undefined,
    inputStyle: undefined,
    containerStyle: undefined,
    passwordInput: false,
    appendText: '',
    placeholderText: '',
    appendIcon: '',
    preppendIconColor: colors.blue,
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State): any {
    if (
      // eslint-disable-next-line no-underscore-dangle
      !prevState.onActive && nextProps.value !== '' && prevState.transitionAnimValue._value !== 1
    ) {
      return {
        injectValue: true,
      };
    }
    return {
      injectValue: false,
    };
  }

  state = {
    showPassword: false,
    transitionAnimValue: new Animated.Value(0),
    onActive: false,
    injectValue: false,
    _value: 0,
  };

  componentDidUpdate() {
    if (this.state.injectValue) {
      this.onFocus();
    }
  }

  onFocus = () => {
    Animated.timing(this.state.transitionAnimValue, {
      toValue: 1,
      duration: 100,
    }).start(() => {
      if (_.isEmpty(this.props.value)) {
        this.setState({
          onActive: true,
          _value: 1,
        });
      }
      this.setState({
        _value: 1,
      });
    });
  };

  onBlur = () => {
    const { value } = this.props;
    this.setState({
      onActive: false,
      _value: _.isEmpty(value) ? 0 : 1,
    }, () => {
      if (_.isEmpty(value)) {
        Animated.timing(this.state.transitionAnimValue, {
          toValue: 0,
          duration: 100,
        }).start();
      }
    });
  };

  containerStyle = (): Object => {
    const {
      top, bottom, block, error
    } = this.props;
    return {
      marginTop: top,
      marginBottom: bottom,
      marginHorizontal: measures.marginSmall,
      width: !block ? measures.buttonWidth : null,
      alignSelf: !block ? 'center' : null,
      backgroundColor: error ? colors.sunglo : colors.white,
    };
  }

  toggleEyeButton = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };


  render() {
    const {
      containerStyle,
      inputStyle,
      onChangeValue,
      name,
      passwordInput,
      placeholderText,
      appendText,
      preppendIconName,
      preppendIconColor,
      value,
      appendIcon,
    } = this.props;
    const {
      showPassword, transitionAnimValue, onActive, _value
    } = this.state;
    const translateY = transitionAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -24],
    });
    const fontSize = transitionAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [measures.fontSizeMedium, measures.fontSizeSmall],
    });
    return (
      <Animated.View
        style={[
          styles.container,
          this.containerStyle,
          containerStyle,
          { borderColor: !onActive ? colors.lightGray : colors.softRed, },
        ]}
      >
        <Animated.Text
          style={{
            ...commonStyles.text,
            paddingHorizontal: measures.paddingSmall,
            position: 'absolute',
            left: measures.defaultUnit * 3.5,
            alignSelf: 'center',
            backgroundColor: _value === 0 ? colors.transparent : colors.white,
            transform: [
              {
                translateY,
              },
            ],
            fontSize,
            color: !onActive ? colors.gray : colors.softRed,
          }}
        >
          {placeholderText}
        </Animated.Text>
        <View style={styles.prependContainer}>
          <Icon name={preppendIconName} size="small" color={preppendIconColor} />
        </View>
        <TextInput
          onFocus={this.onFocus}
          value={value}
          onChangeText={(str: string) => {
            if (onChangeValue) onChangeValue(str, name);
          }}
          onBlur={this.onBlur}
          style={[styles.input, inputStyle]}
          placeholderTextColor={colors.gray}
          secureTextEntry={passwordInput && !showPassword}
        />
        {!_.isEmpty(appendText) && (
          <Text
            style={{
              ...commonStyles.text,
              color: colors.gray,
              alignSelf: 'center',
              right: measures.marginSmall,
            }}
          >
            {appendText}
          </Text>
        )}
        {passwordInput && (
          <TouchableOpacity style={styles.eyeButton} onPress={this.toggleEyeButton}>
            <Icon name={!showPassword ? 'ios-eye' : 'ios-eye-off'} size="small" />
          </TouchableOpacity>
        )}
        {appendIcon ? (
          <TouchableOpacity style={styles.eyeButton} onPress={this.toggleEyeButton}>
            <Icon name={appendIcon} size="small" />
          </TouchableOpacity>
        ) : null}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: measures.defaultUnit * 6,
    flexDirection: 'row',
    borderRadius: measures.borderRadius,
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  input: {
    ...commonStyles.text,
    flex: 1,
    color: colors.black,
  },
  errorText: {
    ...commonStyles.text,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -measures.fontSizeSmall,
    fontSize: measures.fontSizeSmall,
    textAlign: 'right',
  },
  eyeButton: {
    width: measures.defaultUnit * 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prependContainer: {
    width: measures.defaultUnit * 4 + 3,
    justifyContent: 'center',
    paddingLeft: measures.paddingSmall,
    marginRight: measures.marginSmall,
  }
});
