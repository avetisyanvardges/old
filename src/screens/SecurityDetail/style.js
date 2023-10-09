import {StyleSheet} from 'react-native';
import {Sizes, PaddingMargin, fullScreen} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      ...fullScreen,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
    },
  });
};
export {styles};
