// @flow

import React from 'react';
import {
  View, StyleSheet, Text,
} from 'react-native';
import { commonStyles, colors, measures } from '../../../assets';
import { Icon } from '../../Widgets';

type Props = {};
type State = {};
export default class SuccessView extends React.PureComponent<Props, State> {
  state = {
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="feedback" type="md" color={colors.white} />
          <Text style={styles.title}>ĐÁNH GIÁ DỊCH VỤ</Text>
        </View>
        <View style={styles.content}>
          <Icon name="ios-checkmark-circle-outline" size="large" color={colors.blue} />
          <Text style={styles.body}>Gửi Thành Công</Text>
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
  }
});
