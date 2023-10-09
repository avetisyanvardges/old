import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';

const styles = (theme, splashScreen) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      position: 'absolute',
      width: '100%',
      zIndex: 999,
      opacity: splashScreen ? 1 : 0.8,
      height: deviceInfo.deviceHeight,
    },
  });
};
export {styles};
