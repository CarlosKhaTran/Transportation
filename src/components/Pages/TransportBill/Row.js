// @flow
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import { Icon, Input } from '../../Widgets';
import { measures, colors, commonStyles } from '../../../assets';
import type { Bill } from './type';

type Props = {
  item: Bill,
  index: number,
  checked: boolean,
  onCheck: Function
}

export default ({
  item,
  index,
  checked,
  onCheck
}: Props) => {
  const {
    item_Code, item_Name, actual_Received, soBich, notes
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
        <Text style={styles.billName}>{`Sản phẩm: ${item_Name}`}</Text>
        <TouchableOpacity onPress={() => onCheck(item_Code)} style={styles.checkbox}>
          <Icon name={checked ? 'check-square-o' : 'square-o'} type="fa" color={getColor()} />
        </TouchableOpacity>
      </TouchableOpacity>
      {collapsible && (
        <View style={styles.billContent}>
          <Input
            value={item_Code}
            block
            name="item_code"
            containerStyle={styles.input}
            placeholderText="Mã sản phẩm"
            editable={false}
            prependIconColor={colors.carrot}
            prependIconName="ios-barcode"
            appendIcon="ios-checkmark"
            appendIconColor={colors.softRed}
          />
          <Input
            value={soBich.toString()}
            name="soBich"
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
          <Input
            value={actual_Received.toString()}
            name="actual_Received"
            block
            containerStyle={styles.input}
            placeholderText="SL thực nhận"
            prependIconColor={colors.jaffa}
            prependIconName="ios-cube"
          />
          <Input
            value={notes || ''}
            name="notes"
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
    flex: 1
  },
  checkbox: {
    width: measures.defaultUnit * 4,
  }
});
