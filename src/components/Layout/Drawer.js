// @flow
import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, ScrollView, Image
} from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Icon, Button } from '../Widgets';
import { colors, measures, commonStyles } from '../../assets';
import Container from './Container';
import { SCREENS } from '../../routers';

type Props = {
  navigation: NavigationScreenProp<{}>
};

const rows: Array<{
  title: string,
  iconType?: string,
  iconName: string
}> = [
  {
    title: 'Đổi mật khẩu',
    iconName: 'ios-settings'
  },
  {
    title: 'Tài khoản',
    iconName: 'ios-mail'
  }
];

export default class Drawer extends React.PureComponent<Props> {
  signOut = () => {
    const { navigation } = this.props;
    navigation.replace(SCREENS.LOG_IN_BY_STOREID);
  };

  render() {
    return (
      <Container>
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo.png')} style={styles.airport} />
        </View>
        <ScrollView>
          {rows.map((item, index) => (
            <TouchableOpacity style={styles.row} key={index.toString()}>
              <View style={styles.left}>
                <Icon
                  name={item.iconName}
                  type={item.iconType}
                  color={colors.gray}
                  size={measures.iconSizeMedium}
                />
              </View>
              <View style={commonStyles.fill}>
                <Text style={styles.rowTitle}>{item.title}</Text>
              </View>
              <View style={styles.right}>
                <Icon
                  name="caretright"
                  type="ant"
                  color={colors.gray}
                  size={measures.defaultUnit * 2}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Button type="secondary" title="Đăng Xuất" onPress={this.signOut} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: measures.defaultUnit * 15,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: measures.paddingMedium,
    paddingVertical: measures.paddingLong
  },
  avarta: {
    marginTop: measures.marginMedium
  },
  avartaContainer: {
    height: measures.defaultUnit * 9,
    width: measures.defaultUnit * 9,
    borderRadius: measures.defaultUnit * 4.5,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  headerContent: {
    flex: 1,
    marginLeft: measures.marginSmall,
    paddingTop: measures.paddingLong
  },
  title: {
    ...commonStyles.text,
    fontSize: measures.fontSizeMedium - 1,
    fontWeight: 'bold'
  },
  intro: {
    ...commonStyles.text,
    fontSize: measures.fontSizeMedium - 2,
    marginTop: measures.marginSmall,
    fontWeight: 'bold',
    color: colors.white
  },
  row: {
    paddingHorizontal: measures.paddingSmall,
    borderTopWidth: 1,
    borderColor: colors.seperator,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: measures.paddingSmall
  },
  left: {
    width: measures.defaultUnit * 6,
    justifyContent: 'center',
    paddingLeft: measures.paddingSmall
  },
  rowTitle: {
    ...commonStyles.text,
    fontSize: measures.fontSizeSmall + 1,
    fontWeight: '400'
  },
  right: {
    width: measures.defaultUnit * 6,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: measures.paddingSmall
  },
  airport: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    resizeMode: 'contain'
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  }
});
