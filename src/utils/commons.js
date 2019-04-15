// @flow
import { NavigationScreenProp } from 'react-navigation';
// import console = require('console');

export function navigate(navigation: NavigationScreenProp<{}>, params: {
  screenName: string,
  key?: ?string,
  params?: ?Object,
}) {
  const { screenName, key } = params;
  navigation.navigate.apply({
    screenName,
    key: key || screenName,
    params: params.params,
  });
}

export default {
  navigate,
};
