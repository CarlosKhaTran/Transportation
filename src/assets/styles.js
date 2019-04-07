import { colors, measures } from 'src/assets/index';

export default {
  text: {
    fontFamily: 'SourceSansPro-Regular',
  },
  textBold: {
    fontFamily: 'SourceSansPro-Bold',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fill: {
    flex: 1,
  },
  shadow: {
    shadowOpacity: 0.1,
    elevation: 1,
    borderRadius: measures.borderRadius,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
};
