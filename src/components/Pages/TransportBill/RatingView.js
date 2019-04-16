// @flow

import React from 'react';
import _ from 'lodash';
import {
  View, StyleSheet, Text, TouchableOpacity, TextInput
} from 'react-native';
import { commonStyles, colors, measures } from '../../../assets';
import { Icon, Button } from '../../Widgets';

type Props = {
  onSuccess: Function,
  onCancel: Function,
};
type State = {
  score: number
};
export default class RatingView extends React.PureComponent<Props, State> {
  state = {
    score: 0
  };

  selectScore = (score: number) => this.setState({
    score
  });

  render() {
    const { score } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Icon name="feedback" type="md" color={colors.white} />
          <Text style={styles.title}>ĐÁNH GIÁ DỊCH VỤ</Text>
        </View>
        <View style={styles.content} />
        <Text style={styles.objective}>Mức độ hài lòng:</Text>
        <View style={styles.starContainer}>
          {_.range(0, 4).map(item => (item - 1 < score ? (
            <TouchableOpacity key={item.toString()} onPress={() => this.selectScore(item)}>
              <Icon name="ios-star" size="small" color={colors.mango} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity key={item.toString()} onPress={() => this.selectScore(item)}>
              <Icon name="ios-star-outline" size="small" color={colors.gray} multiline />
            </TouchableOpacity>
          )))}
        </View>
        <Text style={styles.objective}>Đánh giá:</Text>
        <TextInput style={styles.textInput} placeholder="Đánh giá chất lượng dịch vụ" />
        <View />
        <View style={styles.row}>
          <View style={commonStyles.fill}>
            <Button block type="primary" title="Gửi" onPress={this.props.onSuccess} />
          </View>
          <View style={commonStyles.fill}>
            <Button block type="secondary" title="Huỷ" onPress={this.props.onCancel} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.shadow,
    backgroundColor: colors.white,
    width: measures.width - 4 * measures.marginLong
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: measures.paddingSmall,
    backgroundColor: colors.lightPrimaryColor,
    borderTopLeftRadius: measures.borderRadius,
    borderTopRightRadius: measures.borderRadius
  },
  title: {
    ...commonStyles.textBold,
    color: colors.white,
    marginLeft: measures.marginMedium
  },
  content: {
    padding: measures.paddingSmall
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: measures.paddingMedium,
    marginBottom: measures.marginSmall,
  },
  objective: {
    ...commonStyles.text,
    color: colors.black,
    marginLeft: measures.marginMedium,

  },
  textInput: {
    ...commonStyles.text,
    borderWidth: 1,
    borderRadius: measures.borderRadius,
    height: measures.defaultUnit * 10,
    borderColor: colors.seperator,
    margin: measures.marginSmall,
    padding: measures.paddingSmall,
  },
  row: {
    flexDirection: 'row',
  }
});
