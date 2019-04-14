// @flow

import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { measures, colors, commonStyles } from 'src/assets';
import { Icon, Input } from 'src/components/Widgets';

export default () => (
  <View style={styles.container}>
    <View style={styles.rowTitleContainer}>
      <Icon name="ios-funnel" color={colors.gray} />
      <Text style={styles.rowTitle}>Bộ lọc: </Text>
      <TouchableOpacity style={styles.tag}>
        <Text>Chưa xác nhận</Text>
      </TouchableOpacity>
      <Text style={styles.detail}>
        {'Tổng cộng: '}
        <Text style={{ color: colors.green }}>555</Text>
      </Text>
    </View>
    <Input
      value=""
      name="searchValue"
      block
      containerStyle={styles.input}
      placeholderText="SL thực nhận"
      prependIconColor={colors.gray}
      prependIconName="ios-search"
      appendIcon="ios-close-circle"
      appendIconColor={colors.gray}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: measures.marginSmall
  },
  rowTitle: {
    ...commonStyles.textBold,
    color: colors.black,
    paddingHorizontal: measures.paddingSmall,
  },
  detail: {
    ...commonStyles.text,
    color: colors.black,
    flex: 1,
    textAlign: 'right',
  },
  rowTitleContainer: {
    paddingHorizontal: measures.paddingMedium,
    paddingVertical: measures.paddingSmall,
    flexDirection: 'row',
    alignItems: 'center'
  },
  tag: {
    height: measures.defaultUnit * 3,
    paddingHorizontal: measures.paddingMedium,
    borderRadius: measures.defaultUnit * 1.5,
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.smoke,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    marginHorizontal: measures.marginMedium
  }
});
