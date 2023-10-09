import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Sizes} from '../../assets/styles';
const styles = (theme) => {
  return StyleSheet.create({
    container: {
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      padding: Sizes.size10,
      width: '100%',
      paddingTop: deviceInfo.ios
        ? deviceInfo.deviceHeight < 800
          ? Sizes.size23
          : Sizes.size46
        : null,
    },
    toastTextStyle: {
      color: theme?.color?.PRIMARY_COLOR_FAINT,
      fontSize: Sizes.size14,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingVertical: Sizes.size5,
    },
    success: {
      backgroundColor: '#67c23a',
    },
    error: {
      backgroundColor: '#f56c6c',
    },
  });
};

export {styles};
