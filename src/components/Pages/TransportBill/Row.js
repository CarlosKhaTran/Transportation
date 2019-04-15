// @flow
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { Icon, Input } from '../../Widgets';
import { measures, colors, commonStyles } from '../../../assets';

type Bill = {
  productCode: string,
  productName: string,
  quantDeliveried: string,
  quantReceived: string,
  quantChecked: string,
  note: string,
};

export default ({ item, index }: { item: Bill, index: number }) => {
  const {
    productCode, productName, quantChecked, quantDeliveried, quantReceived, note
  } = item;
  const [collapsible, setCollapsible] = useState(false);
  const getColor = () => {
    switch (index % 3) {
      case 0:
        return colors.lightGreen;
      case 1:
        return colors.mediumGreen;
      default:
        return colors.darkGreen;
    }
  };
  return (
    <View style={styles.billContainer}>
      <TouchableOpacity style={styles.billHeader} onPress={() => setCollapsible(!collapsible)}>
        <Icon name="shopping-bag" type="ent" color={getColor()} />
        <Text style={styles.billName}>{`Sản phẩm: ${productName}`}</Text>
        <Icon name="square-o" type="fa" color={getColor()} />
      </TouchableOpacity>
      {collapsible && (
        <View style={styles.billContent}>
          <Input
            value={productCode}
            block
            name="productCode"
            containerStyle={styles.input}
            placeholderText="Mã sản phẩm"
            editable={false}
            prependIconColor={colors.carrot}
            prependIconName="ios-barcode"
            appendIcon="ios-checkmark"
            appendIconColor={colors.softRed}
          />
          <Input
            value={quantDeliveried}
            name="quantDeliveried"
            block
            containerStyle={styles.input}
            placeholderText="SL thực giao"
            editable={false}
            prependIconColor={colors.rose}
            prependIconName="truck-delivery"
            prependIconType="mdc"
            appendIcon="ios-checkmark"
            appendIconColor={colors.softRed}
          />
          <View style={styles.row}>
            <View style={commonStyles.fill}>
              <Input
                value={quantReceived}
                name="quantReceived"
                block
                containerStyle={styles.input}
                placeholderText="SL thực nhận"
                prependIconColor={colors.jaffa}
                prependIconName="ios-cube"
              />
            </View>
            <View style={styles.gutter} />
            <View style={commonStyles.fill}>
              <Input
                value={quantChecked}
                name="quantChecked"
                block
                containerStyle={styles.input}
                placeholderText="SL kiểm đếm"
                prependIconColor={colors.foutain}
                prependIconName="ios-checkbox"
              />
            </View>
          </View>
          <Input
            value={note}
            name="note"
            block
            containerStyle={styles.input}
            placeholderText="Ghi chú"
            prependIconColor={colors.gray}
            prependIconName="ios-clipboard"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  billContainer: {
    marginHorizontal: measures.marginMedium,
    marginVertical: measures.marginSmall / 2,
    backgroundColor: colors.white,
    ...commonStyles.shadow,
    overflow: 'hidden'
  },
  billHeader: {
    paddingVertical: measures.paddingSmall,
    borderTopLeftRadius: measures.borderRadius,
    borderTopRightRadius: measures.borderRadius,
    paddingHorizontal: measures.paddingMedium,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    flexDirection: 'row'
  },
  billContent: {
    flex: 1,
    paddingVertical: measures.paddingLong,
    paddingHorizontal: measures.paddingMedium
  },
  row: {
    flexDirection: 'row'
  },
  gutter: {
    width: measures.defaultUnit
  },
  input: {
    marginVertical: measures.marginSmall
  },
  billName: {
    ...commonStyles.text,
    color: colors.primaryColor,
    marginLeft: measures.marginMedium,
    flex: 1,
  }
});
