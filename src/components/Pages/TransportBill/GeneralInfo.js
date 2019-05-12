// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { measures, colors, commonStyles } from '../../../assets';

export default ({
  total,
  checked,
  // storeName
}: {
  total: number,
  checked: number,
  // storeName: string
}) => (
  <View style={styles.container}>
    <View style={styles.rowTitleContainer}>
      {/* <Text style={styles.rowTitle}>
        <Text style={{ ...commonStyles.text }}>Cửa hàng: </Text>
        {storeName}
      </Text> */}
      <Text style={styles.detail}>
        {'Xác Nhận: '}
        <Text style={{ color: colors.red, fontWeight: '800' }}>{`${checked}/${total}`}</Text>
      </Text>
    </View>
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
    paddingHorizontal: measures.paddingSmall
  },
  detail: {
    ...commonStyles.text,
    color: colors.black,
    flex: 1,
    textAlign: 'right'
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
