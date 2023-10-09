import {StyleSheet} from 'react-native';
import {Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      alignItems: 'stretch',
      justifyContent: 'center',
    },
    content: {
      color: theme?.PRIMARY_TEXT_BACKGROUND_COLOR,
    },
    sliderTextStyle: {
      color: theme?.color?.PRIMARY_COLOR_BOLD,
    },
    showValueStyle: {
      alignSelf: 'flex-end',
      color: theme?.color?.PRIMARY_COLOR_BOLD,
    },
    textContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
};

export {styles};
