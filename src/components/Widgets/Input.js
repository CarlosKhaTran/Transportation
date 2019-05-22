// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import {
  TextInput, StyleSheet, TouchableOpacity, Text, Animated, View
} from 'react-native';
import { measures, colors, commonStyles } from '../../assets';
import Icon from './Icon';

type Props = {
  containerStyle?: ?Object,
  inputStyle?: ?Object,
  name: string,
  error?: boolean,
  type?: 'input' | 'select',
  value: string,
  onChangeValue?: (value: string, name: string) => void,
  top?: ?number,
  bottom?: ?number,
  block?: ?boolean,
  passwordInput?: boolean,
  placeholderText?: string,
  appendText?: string,
  appendIcon?: string,
  value?: string,
  prependIconName: string,
  prependIconColor?: string,
  editable?: boolean,
  keyboardType?: 'default' | 'numeric',
  prependIconType?: string,
  appendIconColor?: string,
  openPicker?: Function
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
    onChangeValue: () => {},
    bottom: measures.marginLong,
    block: false,
    type: 'input',
    value: '',
    error: false,
    inputStyle: undefined,
    containerStyle: undefined,
    passwordInput: false,
    appendText: '',
    placeholderText: '',
    appendIcon: '',
    keyboardType: 'default',
    appendIconColor: undefined,
    editable: true,
    prependIconType: undefined,
    prependIconColor: colors.blue,
    openPicker: () => {}
  };

  static getDerivedStateFromProps(nextProps: Props, prevState: State): any {
    if (
      // eslint-disable-next-line no-underscore-dangle
      !prevState.onActive
      && nextProps.value !== ''
      // eslint-disable-next-line no-underscore-dangle
      && prevState.transitionAnimValue._value !== 1
    ) {
      return {
        injectValue: true
      };
    }
    return {
      injectValue: false
    };
  }

  state = {
    showPassword: false,
    transitionAnimValue: new Animated.Value(0),
    onActive: false,
    injectValue: false,
    _value: 0
  };

  componentDidMount() {
    const { editable, value } = this.props;
    if (!editable || value) {
      this.onFocus();
    }
  }

  componentDidUpdate() {
    const { editable } = this.props;
    if (!editable) {
      return;
    }
    if (this.state.injectValue) {
      setTimeout(() => this.onFocus(), 0);
    }
  }

  onFocus = () => {
    const { _value } = this.state;
    if (_value === 1) {
      return;
    }
    Animated.timing(this.state.transitionAnimValue, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true
    }).start(() => {
      if (_.isEmpty(this.props.value)) {
        this.setState({
          onActive: true,
          _value: 1
        });
      }
      this.setState({
        _value: 1
      });
    });
  };

  onBlur = () => {
    const { value } = this.props;
    this.setState(
      {
        onActive: false,
        _value: _.isEmpty(value) ? 0 : 1
      },
      () => {
        if (_.isEmpty(value)) {
          Animated.timing(this.state.transitionAnimValue, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
          }).start();
        }
      }
    );
  };

  containerStyle = (): Object => {
    const { top, bottom, block } = this.props;
    return {
      marginTop: top,
      marginBottom: bottom,
      marginHorizontal: measures.marginSmall,
      width: !block ? measures.buttonWidth : null,
      alignSelf: !block ? 'center' : null
    };
  };

  toggleEyeButton = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  };

  getColor = () => {
    const { onActive } = this.state;
    const { error } = this.props;
    if (error) {
      return colors.rose;
    }
    if (onActive) {
      return colors.lightPrimaryColor;
    }
    return '#6c7a89';
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
      editable,
      prependIconName,
      prependIconType,
      appendIconColor,
      prependIconColor,
      value,
      appendIcon,
      keyboardType,
      openPicker,
      type
    } = this.props;
    const { showPassword, transitionAnimValue, _value } = this.state;
    const translateY = transitionAnimValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -24]
    });
    return (
      <Animated.View
        style={[
          styles.container,
          this.containerStyle,
          containerStyle,
          { borderColor: this.getColor() }
        ]}
      >
        <Animated.Text
          style={{
            ...commonStyles.text,
            paddingHorizontal: measures.paddingSmall,
            position: 'absolute',
            left: measures.defaultUnit * 3.5,
            alignSelf: 'center',
            borderRadius: 5,
            backgroundColor: _value === 0 ? colors.transparent : colors.white,
            transform: [
              {
                translateY
              }
            ],
            fontSize: measures.fontSizeMedium,
            color: this.getColor()
          }}
        >
          {placeholderText}
        </Animated.Text>
        <View style={styles.prependContainer}>
          <Icon
            name={prependIconName}
            type={prependIconType}
            size="small"
            color={prependIconColor}
          />
        </View>
        {type === 'input' ? (
          <TextInput
            onFocus={this.onFocus}
            value={value}
            keyboardType={keyboardType}
            onChangeText={(str: string) => {
              if (onChangeValue) onChangeValue(str, name);
            }}
            editable={editable}
            onBlur={this.onBlur}
            style={[styles.input, inputStyle]}
            placeholderTextColor={colors.gray}
            secureTextEntry={passwordInput && !showPassword}
          />
        ) : (
          [
            <TextInput
              key="1"
              onFocus={this.onFocus}
              value={value}
              editable={false}
              keyboardType={keyboardType}
              onChangeText={(str: string) => {
                if (onChangeValue) onChangeValue(str, name);
              }}
              onBlur={this.onBlur}
              style={[styles.input, inputStyle]}
              placeholderTextColor={colors.gray}
              secureTextEntry={passwordInput && !showPassword}
            />,
            <TouchableOpacity
              key="2"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
              }}
              onPress={() => {
                if (openPicker) openPicker();
              }}
            />
          ]
        )}
        {value !== '' && type !== 'select' && editable && (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => {
              if (onChangeValue) onChangeValue('', name);
            }}
          >
            <Icon name="ios-backspace" color={colors.gray} size="small" />
          </TouchableOpacity>
        )}
        {!_.isEmpty(appendText) && (
          <Text
            style={{
              ...commonStyles.text,
              color: colors.gray,
              alignSelf: 'center',
              right: measures.marginSmall
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
          <View style={styles.eyeButton}>
            <Icon name={appendIcon} size="small" color={appendIconColor} />
          </View>
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
    backgroundColor: colors.white
  },
  input: {
    ...commonStyles.text,
    flex: 1,
    color: colors.black
  },
  errorText: {
    ...commonStyles.text,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -measures.fontSizeSmall,
    fontSize: measures.fontSizeSmall,
    textAlign: 'right'
  },
  eyeButton: {
    width: measures.defaultUnit * 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  prependContainer: {
    width: measures.defaultUnit * 4 + 3,
    justifyContent: 'center',
    paddingLeft: measures.paddingSmall,
    marginRight: measures.marginSmall
  }
});
