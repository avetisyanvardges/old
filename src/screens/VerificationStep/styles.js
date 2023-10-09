import {StyleSheet} from 'react-native';
import {Sizes, Shadow, BorderStyles} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';

const styles = (theme) => {
  return StyleSheet.create({
    uploadPhotoFixed: {
      borderRadius: Sizes.size12,
      paddingHorizontal: Sizes.size16,
      paddingVertical: Sizes.size8,
      backgroundColor: 'white',
    },
    uploadImageObsaluteContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flex: {
      flex: 1,
    },
    border_radius_12: {
      borderRadius: Sizes.size12,
    },
    checkedFixedContainer: {
      position: 'absolute',
      alignSelf: 'center',
      zIndex: 999999,
      bottom: -Sizes.size20,
    },
    mb_74: {
      marginBottom: Sizes.size74,
    },
    photoContainer: {
      height: Sizes.size343,
      backgroundColor: '#C4C4C4',
      flex: 1,
      borderRadius: Sizes.size12,
      marginTop: Sizes.size25,
    },
    container: {
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      flex: 1,
    },
    globalContent: {
      paddingHorizontal: Sizes.size24,
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
      width: Sizes.size326,
      fontSize: Sizes.size12,
      color: '#818195',
      textAlign: 'center',
    },
    verifySubTitleContainer: {
      marginTop: Sizes.size18,
      alignItems: 'center',
      marginBottom: Sizes.size26,
    },
    mb_58: {
      marginBottom: Sizes.size58,
    },
    uploadImageContainer: {
      ...Shadow,
      width: '100%',
      borderRadius: Sizes.size12,
      backgroundColor: 'white',
      marginVertical: Sizes.size27,
    },
    uploadImageContent: {
      paddingHorizontal: Sizes.size26,
      paddingVertical: Sizes.size8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    uploadImageIcon: {
      // marginRight: Sizes.size26,
    },
    uploadImageTextContainer: {},
    uploadImageTitle: {
      marginBottom: Sizes.size4,
      color: '#2C2C2C',
      fontSize: Sizes.size24,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    uploadImageSubTitle: {
      fontSize: Sizes.size16,
      color: '#2C2C2C',
      fontWeight: deviceInfo.ios ? '500' : 'bold',
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
    deleteImageContainer: {
      position: 'absolute',
      right: Sizes.size10,
      top: Sizes.size10,
      borderRadius: Sizes.size12,
      padding: Sizes.size8,
    },
    cancelIconDisablet: {
      width: Sizes.size21,
      height: Sizes.size20,
      borderRadius: Sizes.size8,
      backgroundColor: '#818195',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};

export {styles};
