import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Sizes, PaddingMargin} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      paddingBottom: 50,
    },
    contentContainer: {
      width: '100%',
      height: '100%',
      paddingVertical: Sizes.size20,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    buttonContainer: {
      marginTop: Sizes.size30,
      textAlign: 'center',
      flex: 1,
    },
    imageContainerStyle: {
      position: 'relative',
      alignItems: 'center',
      alignSelf: 'center',
      marginBottom: Sizes.size60,
    },
    img: {
      width: Sizes.size107,
    },
    uploadPhotoButtonStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Sizes.size11,
    },
    removeIconContainer: {
      flexDirection: 'row',
      padding: Sizes.size10,
      borderBottomColor: theme?.color?.BORDER_THIN_COLOR,
      borderBottomWidth: 0.5,
    },
    greyText: {
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
      fontSize: Sizes.size14,
      alignSelf: 'center',
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    changePhoto: {
      color: '#A347FF',
    },
    inputContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginBottom: Sizes.size20,
    },
    textInputStyle: {
      borderBottomWidth: 0.5,
      borderColor: '#E3E3E3',
      flex: 1,
      paddingVertical: Sizes.size2,
      paddingHorizontal: Sizes.size10,
    },
    textInputLabel: {
      width: Sizes.size80,
      marginRight: Sizes.size12,
    },
    linksContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Sizes.size15,
    },
    linksIconContainer: {
      paddingHorizontal: Sizes.size20,
    },
    linksInput: {
      borderRadius: Sizes.size12,
      backgroundColor: '#F3F3F3',
      flex: 1,
      paddingHorizontal: Sizes.size19,
      paddingVertical: deviceInfo.ios ? Sizes.size10 : null,
    },
    textArea: {
      height: Sizes.size90,
      justifyContent: 'flex-start',
      textAlignVertical: 'top',
      paddingTop: 0,
    },
    radiobuttonContainer: {
      marginTop: Sizes.size15,
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: Sizes.size23,
    },
  });
};

export {styles};
