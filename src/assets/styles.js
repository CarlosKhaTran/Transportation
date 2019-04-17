import { colors, measures } from '.';

export default {
  text: {
    fontFamily: 'Roboto-Light',
  },
  textSemiBold: {
    fontFamily: 'Roboto-Medium',
  },
  textLight: {
    fontFamily: 'Roboto-Thin',
  },
  textBold: {
    fontFamily: 'Roboto-Medium',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fill: {
    flex: 1,
  },
  shadow: {
    shadowOpacity: 0.3,
    elevation: 1,
    borderRadius: measures.borderRadius,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
};
