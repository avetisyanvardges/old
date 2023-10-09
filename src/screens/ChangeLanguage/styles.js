import {StyleSheet} from 'react-native';
import {PaddingMargin, fullScreen, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      ...fullScreen,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      paddingVertical: Sizes.size15,
    },
    contentContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      marginVertical: Sizes.size10,
    },
  });
};

export {styles};
