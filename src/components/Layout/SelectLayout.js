// @flow
import React, { Component } from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text
} from 'react-native';
import { colors, measures, commonStyles } from '../../assets';
import { Icon } from '../Widgets';

type Props = {
  onHide: Function,
  onChangeValue: (infoName: string, value: string) => void,
  config: {
    name: string,
    defaultValue: string,
    options?: Array<{ rowId: string, title: string }>
  }
};
type State = {
  updateValue: string
};

export default class EditLayout extends Component<Props, State> {
  state = (() => {
    const { config } = this.props;
    return {
      updateValue: config.defaultValue
    };
  })();

  onSelect = (key: string) => {
    const { config, onChangeValue, onHide } = this.props;
    onChangeValue(config.name, key);
    onHide();
  };

  renderContent = (): React$Node => {
    const { config } = this.props;
    return (
      <View style={styles.picker}>
        <View style={styles.pickerHeader}>
          <Icon name="select-arrows" type="ent" size={15} />
          <Text style={styles.title}>Hãy lựa chọn giá trị</Text>
        </View>
        <View>
          {config.options
            && config.options.map((option: { rowId: string, title: string }) => (
              <TouchableOpacity
                key={option.rowId}
                style={styles.row}
                onPress={() => this.onSelect(option.rowId)}
              >
                <Text style={styles.option}>{option.title}</Text>
                <Icon
                  name={
                    option.title === config.defaultValue
                      ? 'ios-radio-button-on'
                      : 'ios-radio-button-off'
                  }
                  color={colors.blue}
                  size={20}
                />
              </TouchableOpacity>
            ))}
        </View>
      </View>
    );
  };

  render() {
    const { onHide } = this.props;
    return (
      <View style={[styles.container]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={onHide} style={commonStyles.fill} />
          {this.renderContent()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: measures.height,
    width: measures.width,
    marginTop: -measures.height,
    backgroundColor: colors.overlay
  },
  inputWrapper: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: colors.lightPrimaryColor,
    borderBottomWidth: 0.5
  },
  picker: {
    backgroundColor: colors.white
  },
  pickerHeader: {
    paddingHorizontal: measures.paddingMedium,
    flexDirection: 'row',
    paddingVertical: measures.paddingSmall,
    backgroundColor: colors.silver
  },
  title: {
    ...commonStyles.text,
    marginLeft: measures.marginSmall,
    fontSize: measures.fontSizeMedium,
    color: colors.black,
    fontWeight: '500'
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: measures.paddingMedium,
    paddingVertical: measures.paddingSmall,
    borderBottomColor: colors.seperator,
    borderBottomWidth: 1,
    justifyContent: 'space-between'
  },
  option: {
    ...commonStyles.text,
    marginLeft: measures.marginSmall,
    fontSize: measures.fontSizelarge,
    color: colors.black,
    fontWeight: '300'
  }
});
