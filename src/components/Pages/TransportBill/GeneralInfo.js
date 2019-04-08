// @flow

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { measures, colors, commonStyles } from 'src/assets';

export default ({
  storeName, date, staff, routeNum
}: {
  storeName: string,
  date: string,
  staff: string,
  routeNum: string,
}) => (
  <View style={styles.container}>
    <View style={styles.row}>
      <Text style={styles.tittle}>Tên cửa hàng:</Text>
      <Text style={styles.detail}>{storeName}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.tittle}>Thời gian:</Text>
      <Text style={styles.detail}>{date}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.tittle}>Nhân viên:</Text>
      <Text style={styles.detail}>{staff}</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.tittle}>Tuyến Giao:</Text>
      <Text style={styles.detail}>{routeNum}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: measures.paddingSmall,
    backgroundColor: colors.lightGray,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: measures.marginSmall,
  },
  tittle: {
    ...commonStyles.textLight,
    color: colors.black,
  },
  detail: {
    ...commonStyles.text,
    color: colors.black,
  }
});
