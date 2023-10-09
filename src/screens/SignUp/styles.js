import {StyleSheet} from 'react-native';
import {Sizes, PaddingMargin, Fonts} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';

const styles = (theme) => {
  const {deviceHeight} = deviceInfo;

  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: Sizes.size20,
      flex: 1,
      marginTop: -Sizes.size40,
      width: deviceInfo.deviceWidth,
    },
    formContainer: {
      padding: Sizes.size5,
      marginTop: Sizes.size25,
    },
    imageContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '10%',
    },
    buttonContainer: {
      marginTop: Sizes.size15,
      marginBottom: Sizes.size15,
      alignItems: 'center',
      paddingHorizontal: Sizes.size10,
    },
    inputStyles: {},
    passwordInputStyles: {
      maxWidth: '90%',
    },
    inputContainer: {
      width: deviceInfo.deviceWidth - PaddingMargin.screenPaddingHorizontal * 2,
      paddingRight: PaddingMargin.screenPaddingHorizontal,
      flexDirection: 'row',
      alignItems: 'center',
      height: Sizes.size50,
      marginHorizontal: Sizes.size10,
      marginVertical:
        deviceHeight < 668 || deviceHeight < 737 ? Sizes.size5 : Sizes.size10,
      backgroundColor: '#F3F3F3',
      borderRadius: Sizes.size12,
    },
    signInTextStyle: {
      color: theme?.color?.SECONDARY_COLOR_LIGHT,
      fontSize: Sizes.size12,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    signUpText: {
      fontSize: Sizes.size16,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      marginBottom: Sizes.size5,
      color: '#2C2C2C',
      fontFamily: Fonts.bold,
    },
    createAccountContent: {
      flexDirection: 'row',
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      justifyContent: 'space-between',
      marginBottom: Sizes.size15,
    },
    actionContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: Sizes.size10,
      flexDirection: 'row',
      marginRight: Sizes.size5,
      color: theme?.color?.PRIMARY_COLOR_FAINT,
      paddingVertical: Sizes.size10,
      fontSize: Sizes.size16,
      fontWeight: '600',
    },
    buttonContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    createAccountText: {
      color: '#2C2C2C',
      fontSize: Sizes.size12,
      justifyContent: 'center',
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    agreeText: {
      fontSize: Sizes.size12,
      justifyContent: 'center',
      marginRight: Sizes.size2,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    privacyText: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 1,
      paddingHorizontal: Sizes.size7,
    },
    termsServices: {
      fontSize: Sizes.size12,
      color: '#2C2C2C',
      textDecorationLine: 'underline',
      justifyContent: 'center',
      marginRight: Sizes.size2,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    privacyPolicy: {
      fontSize: Sizes.size12,
      color: '#2C2C2C',
      textDecorationLine: 'underline',
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    privacy: {
      flexDirection: 'row',
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      alignItems: 'center',
      marginTop: Sizes.size15,
    },
    checkMark: {
      width: Sizes.size20,
      height: Sizes.size20,
      backgroundColor: '#F3F3F4',
      borderRadius: Sizes.size5,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};

export {styles};
