import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {
  BorderStyles,
  Sizes,
  PaddingMargin,
  Shadow,
  Colors,
} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    fullWidth: {
      width: '100%',
    },
    filterModalContainer: {
      borderColor: '#E3E3E3',
      borderWidth: 1,
      borderRadius: Sizes.size20,
    },
    filterModalContainerItem: {
      paddingVertical: Sizes.size20,
      paddingHorizontal: Sizes.size20,
    },
    filterText: {
      color: theme.color.INPUT_DEFAULT_COLOR,
      fontSize: 14,
      lineHeight: 17,
      marginLeft: Sizes.size9,
    },
    filterContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: Sizes.size12,
      marginTop: Sizes.size15,
    },
    container: {
      flex: 1,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    contentContainer: {
      width: '100%',
      height: '100%',
    },
    datePickerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomColor: theme?.color.BORDER_THIN_COLOR,
      borderBottomWidth: 1,
    },
    inputContainer: {
      justifyContent: 'space-between',
      paddingVertical: Sizes.size4,
      marginTop: Sizes.size25,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      borderBottomColor: theme?.color.BORDER_THIN_COLOR,
      borderBottomWidth: 1,
    },
    labelText: {
      fontSize: Sizes.size12,
      fontWeight: '400',
      lineHeight: Sizes.size14,
      marginLeft: Sizes.size11,
      color: Colors.silver,
    },
    locationContainer: {
      borderBottomColor: theme?.color.BORDER_THIN_COLOR,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: Sizes.size15,
      paddingBottom: Sizes.size18,
      paddingHorizontal: Sizes.size11,
    },
    locationTitleContainer: {
      maxWidth: '85%',
      fontSize: Sizes.size14,
      alignSelf: 'center',
      color: theme?.color?.INPUT_DEFAULT_COLOR,
    },
    imageContainer: {
      width: '100%',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    footerContainer: {
      paddingVertical: Sizes.size20,
      alignItems: 'center',
    },
    addedFilesTitle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectBoxContainer: {
      marginTop: Sizes.size10,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      borderRadius: BorderStyles.radius.sm,
      ...Shadow,
      padding: Sizes.size3,
    },
    sliderSelectContainer: {
      marginTop: Sizes.size20,
    },
    floatingButton: {
      flexDirection: 'row',
      paddingHorizontal: Sizes.size9,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Sizes.size15,
      paddingBottom: Sizes.size18,
    },
    dateTextStyle: {
      paddingLeft: Sizes.size11,
      color: theme.color.INPUT_DEFAULT_COLOR,
    },
    imageStyle: {
      width: '100%',
      height: Sizes.size225,
      borderBottomLeftRadius: Sizes.size20,
      borderBottomRightRadius: Sizes.size20,
    },
    deleteImageButton: {
      position: 'absolute',
      top: -Sizes.size5,
      right: -Sizes.size5,
      justifyContent: 'center',
      margin: 10,
      alignItems: 'center',
      width: Sizes.size25,
      height: Sizes.size25,
      borderRadius: BorderStyles.radius.circle,
      backgroundColor: theme?.PRIMARY_TEXT_COLOR,
    },
    uploadImage: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      flexDirection: 'row',
      borderBottomLeftRadius: Sizes.size20,
      borderBottomRightRadius: Sizes.size20,
      height: Sizes.size375,
    },
    selectedStatus: {
      marginTop: Sizes.size5,
      flexDirection: 'row',
      alignSelf: 'center',
    },
    inputStyles: {
      padding: 0,
      fontSize: Sizes.size14,
      color: theme?.color?.PRIMARY_COLOR_BOLD,
    },
    actionContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: Sizes.size10,
      flexDirection: 'row',
      marginRight: Sizes.size5,
      color: theme?.color?.PRIMARY_COLOR_FAINT,
      paddingVertical: Sizes.size16,
      fontSize: Sizes.size16,
      fontWeight: '600',
    },
    dateTimeText: {
      fontSize: Sizes.size12,
      alignSelf: 'flex-start',
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
    },
    placeholderStyle: {
      fontSize: Sizes.size14,
      fontWeight: '400',
      color: Colors.gray,
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
    checkBoxContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: Sizes.size10,
    },
    membersLimit: {
      marginTop: Sizes.size15,
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};

export {styles};
