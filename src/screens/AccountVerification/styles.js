import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {
  Sizes,
  BorderStyles,
  PaddingMargin,
  fullScreen,
  Shadow,
} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      ...fullScreen,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      paddingHorizontal: Sizes.size25,
    },
    contentContainer: {
      width: '100%',
      height: '100%',
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    imageContainer: {
      paddingVertical: Sizes.size30,
      alignItems: 'center',
    },
    buttonContainer: {
      paddingVertical: Sizes.size30,
      marginBottom: Sizes.size15,
      alignItems: 'center',
    },
    imageItemContainer: {
      position: 'relative',
    },
    imageStyle: {
      margin: Sizes.size10,
      width: Sizes.size80,
      borderRadius: BorderStyles.radius.circle,
      height: Sizes.size80,
    },
    deleteImageButton: {
      position: 'absolute',
      top: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
      width: Sizes.size25,
      height: Sizes.size25,
      borderRadius: BorderStyles.radius.circle,
      backgroundColor: theme?.PRIMARY_TEXT_COLOR_LIGHT,
    },
    inputStyles: {
      minWidth: '65%',
      fontSize: Sizes.size16,
      padding: 0,
    },
    inputContainer: {
      minHeight: Sizes.size60,
      borderBottomColor: theme?.PRIMARY_TEXT_COLOR,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    verifyInfoContainer: {
      alignSelf: 'center',
    },
    verifyInfo: {
      fontSize: Sizes.size16,
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
      textAlign: 'center',
    },
    uploadImage: {
      alignItems: 'center',
      marginTop: Sizes.size20,
    },
    inputStylesUploadText: {
      padding: 0,
      fontSize: Sizes.size14,
      color: theme?.color?.PRIMARY_COLOR_BOLD,
    },
    verifyTitle: {
      fontSize: Sizes.size24,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
      color: '#2C2C2C',
      textAlign: 'center',
    },
    verifySubTitle: {
      fontSize: Sizes.size12,
      color: '#818195',
      textAlign: 'center',
    },
    verifySubTitleContainer: {
      marginTop: Sizes.size18,
    },
    mb_58: {
      marginBottom: Sizes.size58,
    },
    uploadImageContainer: {
      ...Shadow,
      width: '100%',
      borderRadius: Sizes.size12,
      backgroundColor: 'white',
      marginBottom: Sizes.size15,
    },
    uploadImageContent: {
      paddingHorizontal: Sizes.size26,
      paddingVertical: Sizes.size8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    uploadImageIcon: {
      marginRight: Sizes.size26,
    },
    uploadImageTextContainer: {},
    uploadImageTitle: {
      marginBottom: Sizes.size4,
      color: '#818195',
      fontSize: Sizes.size14,
    },
    uploadImageSubTitle: {
      fontSize: Sizes.size16,
      color: '#2C2C2C',
      fontWeight: deviceInfo.ios ? '500' : 'bold',
      width: Sizes.size180,
    },
    mt_74: {
      marginTop: Sizes.size74,
    },
    ml_auto: {
      marginLeft: 'auto',
    },
    informationLink: {
      textDecorationLine: 'underline',
      fontSize: Sizes.size12,
      marginTop: Sizes.size28,
      textAlign: 'center',
    },
  });
};

export {styles};
