import {StyleSheet} from 'react-native';
import {Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: Sizes.size12,
    },
    small: {
      width: Sizes.size90,
      padding: Sizes.size,
    },
    normal: {
      width: Sizes.size140,
      padding: Sizes.size8,
    },
    big: {
      width: Sizes.size240,
      padding: Sizes.size10,
    },
    full: {
      width: '100%',
      padding: Sizes.size12,
    },
    responsive: {
      paddingHorizontal: Sizes.size15,
      paddingVertical: Sizes.size10,
    },
    success: {
      // backgroundColor: theme?.SECONDARY_BACKGROUND_COLOR
    },
    danger: {
      // backgroundColor: theme?.PRIMARY_TEXT_COLOR_LIGHT
    },
    app: {
      // backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR_LIGHT
    },
    disabledStyle: {
      opacity: 0.5,
    },
    textStyle: {
      color: theme?.color?.PRIMARY_COLOR_FAINT,
    },
    smallFontSize: {
      fontSize: Sizes.size12,
    },
    normalFontSize: {
      fontSize: Sizes.size14,
    },
    bigFontSize: {
      fontSize: Sizes.size18,
    },
    fullFontSize: {
      fontSize: Sizes.size16,
    },
    outLine: {
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      borderColor: theme?.color?.SECONDARY_COLOR_LIGHT,
      borderWidth: 1,
    },
    appText: {
      color: theme?.color?.SECONDARY_COLOR_LIGHT,
    },
    radius12: {
      borderRadius: Sizes.size12,
    },
  });
};

export {styles};
