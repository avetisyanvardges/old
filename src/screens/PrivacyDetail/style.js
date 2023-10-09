import {StyleSheet} from 'react-native';
import {Sizes, PaddingMargin, fullScreen} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      ...fullScreen,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      paddingVertical: Sizes.size15,
      marginBottom: Sizes.size55,
    },
  });
};
export {styles};
