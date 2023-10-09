import {StyleSheet} from 'react-native';
import {
  Sizes,
  PaddingMargin,
  fullScreen,
  Colors,
  Fonts,
} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      ...fullScreen,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      paddingVertical: Sizes.size15,
      marginBottom: Sizes.size55,
    },
    descriptionText: {
      width: Sizes.size255,
      color: Colors.silver,
      fontSize: Sizes.size10,
      lineHeight: Sizes.size12,
      fontFamily: Fonts.regular,
      fontWeight: '400',
      marginVertical: Sizes.size7,
    },
  });
};
export {styles};
