import {StyleSheet} from 'react-native';
import {BorderStyles, Sizes, PaddingMargin, Shadow} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    contentContainer: {
      flex: 1,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      marginVertical: Sizes.size20,
    },

    buttonContainer: {
      paddingVertical: Sizes.size40,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    descTitle: {
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
      fontSize: Sizes.size16,
      fontWeight: 'bold',
    },
    inputContainer: {
      minHeight: Sizes.size40,
      paddingBottom: Sizes.size5,
      paddingVertical: Sizes.size10,
      marginTop: Sizes.size20,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      borderBottomColor: theme?.PRIMARY_TEXT_COLOR,
      borderBottomWidth: 0.5,
    },
    descriptionInputContainer: {
      paddingBottom: Sizes.size10,
      minWidth: Sizes.size130,
      flex: 1,
      paddingVertical: 0,
      margin: Sizes.size5,
      marginTop: Sizes.size30,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      borderBottomColor: theme?.PRIMARY_TEXT_COLOR,
      borderBottomWidth: 1,
    },
    selectBoxContainer: {
      marginTop: Sizes.size15,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      borderRadius: BorderStyles.radius.sm,
      ...Shadow,
      padding: Sizes.size3,
    },
    sliderSelectContainer: {
      marginTop: Sizes.size20,
    },
    footerContainer: {
      marginVertical: Sizes.size30,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateTimeText: {
      fontSize: Sizes.size14,
      alignSelf: 'flex-start',
      color: theme?.color?.PRIMARY_COLOR_BOLD,
    },
    floatingButton: {
      flexDirection: 'row',
      paddingHorizontal: Sizes.size10,
      paddingVertical: Sizes.size10,
      borderColor: theme?.color?.SECONDARY_COLOR_LIGHT,
      alignItems: 'center',
      backgroundColor: theme?.color?.PRIMARY_COLOR_FAINT,
      borderRadius: BorderStyles.radius.s,
      ...Shadow,
      justifyContent: 'space-between',
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: Sizes.size5,
    },
    datePickerContainer: {
      flexDirection: 'row',
      marginVertical: Sizes.size10,
    },
    dateTextStyle: {
      marginLeft: Sizes.size5,
      color: theme?.color?.SECONDARY_COLOR_LIGHT,
      fontSize: Sizes.size14,
    },
  });
};
export {styles};
