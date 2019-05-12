// @flow
import React from 'react';
import { connect } from 'react-redux';
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

export const storeInfo = ({ storeName, address }: { storeName: string, address: string }) => (
  <View style={styles.generalInfo}>
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
  address: state.transStore.storeInfo.address
});

export default connect(mapStateToProps)(storeInfo);

const styles = StyleSheet.create({
  generalInfo: {
    padding: measures.paddingMedium,
    backgroundColor: colors.white
  },
  badgeText: {
    ...commonStyles.text,
    justifyContent: 'center',
    alignItems: 'center'
  },
  generalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: measures.marginTiny
  },
  generalObject: {
    ...commonStyles.text,
    marginRight: measures.marginMedium,
    fontWeight: '600'
  }
});
