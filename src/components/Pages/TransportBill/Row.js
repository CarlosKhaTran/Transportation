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
  onCheck: Function,
  onChangeBill: Function,
  onChangeNotes: Function
};

export default ({
  item, index, onCheck, onChangeBill, onChangeNotes
}: Props) => {
  const {
    item_Code, item_Name, actual_Received, soBich, div_Unit
  } = item;
  const [collapsible, setCollapsible] = useState(false);
  const [check, setCheck] = useState(false);
  const [notes, setNotes] = useState(item.notes || '');
  const [actualReceived, setActualReceived] = useState(actual_Received.toString());
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
  const onChangeValue = (value: string) => {
    setCheck(false);
    onCheck(item_Code, false);
    setActualReceived(value);
    onChangeBill(value, item_Code);
  };
  const onChangeNotesValue = (value: string) => {
    setNotes(value);
    setCheck(false);
    onCheck(item_Code, false);
    onChangeNotes(value, item_Code);
  };
  const onSetCheck = () => {
    setCheck(!check);
    onCheck(item_Code, !check);
  };
  return (
    <View style={styles.billContainer}>
      <View style={styles.billHeader}>
        <TouchableOpacity style={styles.left} onPress={() => setCollapsible(!collapsible)}>
          <Icon name="shopping-bag" type="ent" color={getColor()} />
          <Text numberOfLines={1} style={styles.billName}>
            {`${index + 1}. ${item_Name}: `}
            <Text style={{ fontWeight: 'bold' }}>{`${soBich} ${div_Unit}`}</Text>
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSetCheck} style={styles.checkbox}>
          <Icon name={check ? 'check-square-o' : 'square-o'} type="fa" color={getColor()} />
        </TouchableOpacity>
      </View>
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
            appendText={div_Unit}
          />
          <Input
            value={actualReceived}
            name={item.item_Code}
            block
            containerStyle={styles.input}
            onChangeValue={onChangeValue}
            keyboardType="numeric"
            placeholderText="SL thực nhận"
            prependIconColor={colors.jaffa}
            prependIconName="ios-cube"
            // appendText={div_Unit}
          />
          <Input
            value={notes || ''}
            name="notes"
            block
            onChangeValue={onChangeNotesValue}
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
    fontSize: measures.fontSizeSmall,
    ...commonStyles.text,
    color: colors.primaryColor,
    marginLeft: measures.marginMedium
  },
  checkbox: {
    width: measures.defaultUnit * 4
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    overflow: 'hidden',
    marginRight: measures.marginSmall
  }
});
