import {StyleSheet} from 'react-native';
import {BorderStyles, IconsSizes, ratio, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      width: 50 * ratio,
      height: 50 * ratio,
      position: 'absolute',
      right: Sizes.size15,
      bottom: Sizes.size15,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR_LIGHT,
      borderRadius: BorderStyles.radius.circle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      fontSize: IconsSizes.normal,
      color: theme?.color?.PRIMARY_COLOR_FAINT,
    },
  });
};

export {styles};
