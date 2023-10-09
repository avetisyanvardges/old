import {StyleSheet} from 'react-native';
import {Fonts, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    placeholderTextStyle: {
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
    },
    inputStyles: {
      fontSize: Sizes.size14,
      color: theme?.color?.INPUT_DEFAULT_COLOR,
    },
    errorTextStyle: {
      color: theme?.color?.PRIMARY_FOREGROUND_COLOR,
    },
  });
};

export {styles};
