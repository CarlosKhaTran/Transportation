// @flow
import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, ScrollView, Image
} from 'react-native';
import { NavigationScreenProp, StackActions, NavigationActions } from 'react-navigation';
import { Icon, Button } from '../Widgets';
import { colors, measures, commonStyles } from '../../assets';
import Container from './Container';
import SCREENS from '../../routers/screens';

type Props = {
  navigation: NavigationScreenProp<{}>
};

const rows: Array<{
  title: string,
  iconType?: string,
  iconName: string,
  screenName: string
}> = [
  {
    title: 'Home',
    iconName: 'ios-home',
    screenName: SCREENS.TRANSPORT_BILL
  },
  {
    title: 'Đổi mật khẩu',
    iconName: 'ios-settings',
    screenName: ''
  },
  {
    title: 'Tài khoản',
    iconName: 'ios-mail',
    screenName: ''
  }
];

export default class Drawer extends React.PureComponent<Props> {
  signOut = () => {
    const { navigation } = this.props;
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: SCREENS.LOG_IN_BY_STOREID })]
    });
    navigation.dispatch(resetAction);
  };

  navigate = (item: Object) => {
    const { navigation } = this.props;
    if (navigation.state.routeName === item.screenName) {
      navigation.toggleDrawer();
      return;
    }
    navigation.dispatch(NavigationActions.navigate({ routeName: item.screenName }));
  };

  render() {
    const { navigation } = this.props;
    const { routeName } = navigation.state;
    return (
      <Container>
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo.png')} style={styles.airport} />
        </View>
        <ScrollView>
          {rows.map((item, index) => (
            <TouchableOpacity
              style={[
                styles.row,
                routeName === item.screenName && { backgroundColor: colors.overlay }
              ]}
              key={index.toString()}
              onPress={() => this.navigate(item)}
            >
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
    marginTop: 20,
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
