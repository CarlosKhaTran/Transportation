// @flow
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon, Input } from 'src/components/Widgets';
import { measures, colors, commonStyles } from 'src/assets';

type Bill = {
  productCode: string,
  productName: string,
  quantDeliveried: string,
  quantReceived: string,
  quantChecked: string,
  note: string,
};

export default ({ item }: { item: Bill }) => {
  const {
    productCode, productName, quantChecked, quantDeliveried, quantReceived, note
  } = item;
  return (
    <View style={styles.billContainer}>
      <View style={styles.billHeader}>
        <Icon name="shopping-bag" type="ent" color={colors.green} />
        <Text style={styles.billName}>{`Sản phẩm: ${productName}`}</Text>
      </View>
      <View style={styles.billContent}>
        <Input
          value={productCode}
          block
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
          block
          containerStyle={styles.input}
          placeholderText="Ghi chú"
          prependIconColor={colors.gray}
          prependIconName="ios-clipboard"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  billContainer: {
    marginHorizontal: measures.marginMedium,
    marginVertical: measures.marginSmall,
    backgroundColor: colors.white,
    ...commonStyles.shadow
  },
  billHeader: {
    paddingVertical: measures.paddingSmall,
    borderTopLeftRadius: measures.borderRadius,
    borderTopRightRadius: measures.borderRadius,
    paddingHorizontal: measures.paddingMedium,
    backgroundColor: colors.lightGray,
    alignItems: 'center',
    flexDirection: 'row',
  },
  billContent: {
    flex: 1,
    paddingVertical: measures.paddingLong,
    paddingHorizontal: measures.paddingMedium,
  },
  row: {
    flexDirection: 'row',
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
  }
});
