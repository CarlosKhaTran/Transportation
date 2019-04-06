import { Platform } from 'react-native';

export default {
  text: {
    fontFamily: Platform.select({
      ios: 'SourceSansPro-Light',
      android: 'SourceSansPro-Regular',
    }),
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fill: {
    flex: 1,
  },
};
