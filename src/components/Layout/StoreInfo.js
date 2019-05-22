// @flow
import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { StyleSheet, View, Text } from 'react-native';
import { commonStyles, measures, colors } from '../../assets';

const renderBadge = (text: string, borderColor: string, backgroundColor: string) => (
  <Text
    style={[
      styles.badgeText,
      borderColor && { borderColor },
      backgroundColor && { backgroundColor }
    ]}
    numberOfLines={1}
  >
    {text}
  </Text>
);

export const storeInfo = ({
  storeName,
  address,
  storeID
}: {
  storeName: string,
  address: string,
  storeID: string
}) => (
  <View style={styles.generalInfo}>
    <View style={styles.generalRow}>
      <Text style={styles.generalObject}>Thời gian:</Text>
      <View style={commonStyles.fill}>
        {renderBadge(moment().format('DD/MM/YYYY'), colors.rose, colors.white)}
      </View>
    </View>
    <View style={styles.generalRow}>
      <Text style={styles.generalObject}>Mã cửa hàng:</Text>
      <View style={commonStyles.fill}>{renderBadge(storeID, colors.rose, colors.white)}</View>
    </View>
    <View style={styles.generalRow}>
      <Text style={styles.generalObject}>Cửa Hàng:</Text>
      {renderBadge(storeName, colors.green, colors.white)}
    </View>
    <View style={styles.generalRow}>
      <Text style={styles.generalObject}>Địa chỉ:</Text>
      <View style={commonStyles.fill}>{renderBadge(address, colors.rose, colors.white)}</View>
    </View>
  </View>
);

const mapStateToProps = state => ({
  storeName: state.transStore.storeInfo.store_Name,
  address: state.transStore.storeInfo.address,
  storeID: state.transStore.storeInfo.storeID
});

export default connect(mapStateToProps)(storeInfo);

const styles = StyleSheet.create({
  generalInfo: {
    padding: measures.paddingSmall,
    backgroundColor: colors.white
  },
  badgeText: {
    ...commonStyles.text,
    justifyContent: 'center',
    alignItems: 'center'
  },
  generalRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  generalObject: {
    ...commonStyles.text,
    fontWeight: '600',
    width: 90
  }
});
