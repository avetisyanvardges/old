import {StyleSheet} from 'react-native';
import {Sizes, fullScreen} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';
const styles = (theme) => {
  return StyleSheet.create({
    textInputContainer: {
      height: Sizes.size40,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      marginVertical: Sizes.size5,
      marginHorizontal: Sizes.size20,
      backgroundColor: 'transparent',
    },
    textInput: {
      marginRight: 0,
      marginLeft: 0,
      marginTop: 0,
      fontSize: Sizes.size16,
      height: Sizes.size40,
      backgroundColor: '#fff',
      borderTopLeftRadius: Sizes.size10,
      borderBottomLeftRadius: Sizes.size10,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    },
    listView: {
      backgroundColor: '#fff',
      marginHorizontal: Sizes.size20,
    },
    description: {
      fontWeight: 'bold',
      height: Sizes.size38,
    },
    fullContainer: {
      position: 'relative',
    },
    mapContainer: {
      ...fullScreen,
    },
    content: {
      position: 'absolute',
      top: Sizes.size20,
      width: '100%',
    },
    saveButton: {
      position: 'absolute',
      zIndex: 100,
      alignSelf: 'center',
      bottom:
        deviceInfo.ios && deviceInfo.hasNotch
          ? 130
          : deviceInfo.deviceHeight > 700 && deviceInfo.ios
          ? 160
          : 90,
      justifyContent: 'center',
      alignItems: 'center',
    },
    userLocationButton: {
      position: 'absolute',
      zIndex: 100,
      right: Sizes.size15,
      bottom:
        deviceInfo.ios && deviceInfo.hasNotch
          ? 130
          : deviceInfo.deviceHeight > 700 && deviceInfo.ios
          ? 160
          : 90,
      width: Sizes.size42,
      height: Sizes.size42,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      borderRadius: Sizes.size12,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
export {styles};
