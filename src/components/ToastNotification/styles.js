import {StyleSheet} from 'react-native';
import {Sizes, Shadow} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      paddingTop:
        deviceInfo.ios && deviceInfo.hasNotch
          ? Sizes.size55
          : deviceInfo.ios && !deviceInfo.hasNotch
          ? Sizes.size30
          : 0,
      minHeight: Sizes.size70,
      borderRadius: 5,
      alignSelf: 'center',
      justifyContent: 'center',
      padding: Sizes.size10,
      position: 'absolute',
      zIndex: 1000,
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      ...Shadow,
    },
    toastTextStyle: {
      color: theme.color.PRIMARY_COLOR_FAINT,
      fontSize: Sizes.size14,
    },
    title: {
      fontSize: Sizes.size16,
      fontWeight: 'bold',
      color: theme.color.PRIMARY_COLOR_BOLD,
    },
    body: {
      color: theme.color.PRIMARY_COLOR_BOLD,
      marginTop: Sizes.size5,
    },
  });
};

export {styles};
