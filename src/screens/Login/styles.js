import {StyleSheet} from 'react-native';
import {Sizes, PaddingMargin, Fonts} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';

const styles = (theme) => {
  const {deviceHeight} = deviceInfo;
  return StyleSheet.create({
    scrollViewBackground: {
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: deviceInfo.android ? deviceInfo.deviceHeight : 'auto',
    },
    languageContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    languageContainerItem: {
      paddingLeft: Sizes.size11,
      paddingVertical: Sizes.size4,
    },
    languageContainerItemText: {
      fontSize: Sizes.size12,
      color: '#818195',
    },
    contentContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: Sizes.size20,
      marginTop: -Sizes.size40,
      width: deviceInfo.deviceWidth,
      flex: 1,
    },
    formContainer: {
      padding: Sizes.size5,
      marginTop: Sizes.size25,
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
    inputStyles: {},
    passwordInputStyles: {
      maxWidth: '90%',
    },
    forgotPasswordContainer: {
      marginTop: Sizes.size5,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    forgotPasswordText: {
      fontSize: Sizes.size12,
      color: theme?.color?.SECONDARY_COLOR_LIGHT,
    },
    socialLogin: {
      flexDirection: 'row',
      alignSelf: 'center',
      paddingVertical: Sizes.size7,
    },
    buttonContainer: {
      marginTop:
        deviceHeight < 668 || deviceHeight < 737 ? Sizes.size10 : Sizes.size25,
      alignItems: 'center',
      width: '100%',
      paddingHorizontal: Sizes.size10,
    },
    createAccountText: {
      fontSize: Sizes.size12,
      color: '#2C2C2C',
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    createAccountContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: Sizes.size15,
      marginTop: 'auto',
    },
    createNewText: {
      color: theme?.color?.SECONDARY_COLOR_LIGHT,
      fontSize: Sizes.size12,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
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
    lines: {
      backgroundColor: '#E3E3E3',
      height: Sizes.size1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      flex: 1,
      alignSelf: 'center',
    },
    orTextContent: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical:
        deviceHeight < 668 || deviceHeight < 737 ? Sizes.size10 : Sizes.size20,
    },

    loginText: {
      fontSize: Sizes.size16,
      fontFamily: Fonts.bold,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      marginBottom: Sizes.size5,
      color: '#2C2C2C',
      fontWeight: '500',
    },
    imageContainer: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '10%',
    },
    buttonContent: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    orText: {
      paddingHorizontal: Sizes.size15,
      color: '#2C2C2C',
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    content: {
      paddingRight: PaddingMargin.screenPaddingHorizontal * 2,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      alignSelf: 'center',
      height: Sizes.size50,
      borderWidth: 1,
      borderColor: '#E3E3E3',
      borderRadius: Sizes.size12,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
  });
};

export {styles};
