import {StyleSheet} from 'react-native';
import {PaddingMargin, fullScreen, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      ...fullScreen,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      paddingTop: Sizes.size70,
    },
    contentContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    notificationText: {
      margin: 30,
      flexDirection: 'column',
      alignItems: 'center',
    },
    notificationHeader: {
      fontSize: Sizes.screenTitle,
      color: theme?.color?.PRIMARY_COLOR_BOLD,
    },
  });
};

export {styles};
