import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Sizes, PaddingMargin, fullScreen, Colors} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      ...fullScreen,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      paddingHorizontal: Sizes.size28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    noEventDetected: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    noEventDetectedText: {
      textAlign: 'center',
      fontSize: Sizes.size14,
      fontWeight: '400',
      lineHeight: Sizes.size17,
      marginVertical: Sizes.size26,
    },
    questionContainer: {
      flexDirection: 'row',
      marginTop: Sizes.size18,
    },
    question: {
      fontSize: Sizes.size12,
      marginEnd: Sizes.size5,
    },
    contactUs: {
      fontSize: Sizes.size12,
      textDecorationLine: 'underline',
    },
    button: {
      width: Sizes.size326,
      marginTop: Sizes.size141,
      alignItems: 'center',
    },
    content: {
      paddingHorizontal: Sizes.size28,
      paddingVertical: Sizes.size38,
      flex: 1,
    },
    signedDevices: {
      fontSize: Sizes.size14,
      fontWeight: '400',
      lineHeight: Sizes.size17,
      color: Colors.charGreen,
    },
    devicesInfo: {
      marginTop: Sizes.size18,
    },
    radioContainer: {
      width: Sizes.size320,
    },
    phoneModel: {
      fontSize: Sizes.size12,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
      lineHeight: Sizes.size14,
      color: Colors.charGreen,
      marginVertical: Sizes.size5,
    },
    phoneCurrent: {
      fontSize: Sizes.size12,
      fontWeight: '400',
      lineHeight: Sizes.size14,
      marginVertical: Sizes.size5,
      marginHorizontal: Sizes.size3,
      color: Colors.silver,
    },
    phoneOs: {
      fontSize: Sizes.size10,
      fontWeight: '400',
      lineHeight: Sizes.size12,
      color: Colors.silver,
    },
    underLine: {
      width: '100%',
      paddingHorizontal: Sizes.size12,
      borderBottomWidth: Sizes.size1,
      borderBottomColor: '#E3E3E3',
      marginTop: Sizes.size30,
      marginBottom: Sizes.size10,
    },
    protectTitle: {
      fontSize: Sizes.size14,
      fontWeight: '400',
      lineHeight: Sizes.size17,
      color: Colors.charGreen,
      marginVertical: Sizes.size8,
    },
    protectDesc: {
      fontSize: Sizes.size11,
      fontWeight: '400',
      lineHeight: Sizes.size12,
      color: Colors.silver,
    },
    confirmTitle: {
      fontSize: Sizes.size14,
      fontWeight: '400',
      lineHeight: Sizes.size17,
      color: Colors.charGreen,
      marginVertical: Sizes.size5,
    },
  });
};
export {styles};
