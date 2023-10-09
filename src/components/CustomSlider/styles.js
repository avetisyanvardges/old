import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {BorderStyles, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    image: {
      height: Sizes.size375,
      borderBottomLeftRadius: Sizes.size20,
      borderBottomRightRadius: Sizes.size20,
      width: deviceInfo.deviceWidth,
    },
    deleteImageButton: {
      position: 'absolute',
      top: Sizes.size5,
      left: Sizes.size5,
      justifyContent: 'center',
      margin: 10,
      alignItems: 'center',
      width: Sizes.size25,
      height: Sizes.size25,
      borderRadius: BorderStyles.radius.circle,
    },
  });
};

export {styles};
