// @flow

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { commonStyles, colors, measures } from '../../assets';
import Icon from './Icon';
import Button from './Button';

type Props = {
  message: string,
  title: string,
  leftTitle: string,
  rightTitle: string,
  leftAction: Function,
  rightAction: Function
};
type State = {};
export default class SuccessView extends React.PureComponent<Props, State> {
  state = {};

  render() {
    const {
      message, title, leftAction, leftTitle, rightAction, rightTitle
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="feedback" type="md" color={colors.white} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.body}>{message}</Text>
        </View>
        <View style={styles.row}>
          <View style={commonStyles.fill}>
            <Button block type="primary" title={leftTitle} onPress={leftAction} />
          </View>
          <View style={commonStyles.fill}>
            <Button block type="secondary" title={rightTitle} onPress={rightAction} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.shadow,
    backgroundColor: colors.white,
    width: measures.width - 4 * measures.marginLong
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: measures.paddingSmall,
    backgroundColor: colors.lightPrimaryColor,
    borderTopLeftRadius: measures.borderRadius,
    borderTopRightRadius: measures.borderRadius
  },
  title: {
    ...commonStyles.textBold,
    color: colors.white,
    marginLeft: measures.marginMedium
  },
  body: {
    color: colors.black,
    marginTop: measures.marginMedium,
    fontSize: measures.fontSizeLarge
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: measures.marginLong
  },
  row: {
    flexDirection: 'row'
  }
});
