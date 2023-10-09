import {ImageComponent, StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Colors, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    slide: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'blue',
    },
    slideTitle: {
      marginTop: '10.5%',
    },
    image: {
      width: Sizes.size221,
      height: Sizes.size398,
      zIndex: 1,
      position: 'absolute',
    },
    ImageContainer: {
      width: deviceInfo.deviceWidth,
      height: '49%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon: {
      height: '49%',
    },
    text: {
      fontSize: Sizes.size16,
      lineHeight: Sizes.size19,
      fontWeight: '400',
      marginHorizontal: Sizes.size25,
      marginTop: Sizes.size13,
      textAlign: 'center',
      minHeight: Sizes.size70,
    },
    title: {
      fontSize: Sizes.size24,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
      color: Colors.charGreen,
      textAlign: 'center',
    },
    nextButton: {
      flex: 1,
      height: Sizes.size38,
      borderRadius: Sizes.size12,
      backgroundColor: Colors.white,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nextText: {
      fontSize: Sizes.size14,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
      color: Colors.blueViolet,
    },
    skipButton: {
      flex: 1,
      height: Sizes.size38,
      marginHorizontal: Sizes.size20,
      marginBottom: Sizes.size10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    skipText: {
      fontSize: Sizes.size12,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
      color: Colors.charGreen,
    },
    inPhone: {
      width: Sizes.size180,
      height: Sizes.size375,
      borderRadius: Sizes.size30,
      marginTop: Sizes.size10,
      marginHorizontal: Sizes.size12,
      backgroundColor: '#D3D3D3',
      zIndex: 0,
    },
  });
};

export {styles};
