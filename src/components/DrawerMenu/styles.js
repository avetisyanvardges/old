import {StyleSheet} from 'react-native';
import {PaddingMargin, BorderStyles, Sizes, Shadow} from '../../assets/styles';

export const styles = (theme) => {
  return StyleSheet.create({
    languageContent: {
      width: '100%',
      height: '100%',
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    menuContainer: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    menuFooter: {
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      paddingVertical: Sizes.size20,
      alignItems: 'center',
    },
    buttonLogout: {
      width: '100%',
      paddingVertical: Sizes.size7,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR_LIGHT,
      borderRadius: BorderStyles.radius.button,
      justifyContent: 'center',
      alignItems: 'center',
      ...Shadow,
    },
    logoutTextStyle: {
      fontWeight: 'bold',
      fontSize: Sizes.size14,
      color: theme?.color?.PRIMARY_COLOR_FAINT,
    },
    menuHeader: {
      paddingVertical: Sizes.size10,
      backgroundColor: theme?.color?.SECONDARY_COLOR_LIGHT,
      borderBottomWidth: BorderStyles.border3,
      borderColor: BorderStyles.theme?.color?.SECONDARY_COLOR_LIGHT,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    userNameTextStyle: {
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      fontWeight: 'bold',
      fontSize: Sizes.size14,
      color: theme?.PRIMARY_BACKGROUND_COLOR,
    },
    menuItemsContainer: {
      marginTop: Sizes.size10,
    },
    menuItem: {
      paddingVertical: Sizes.size10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    menuItemTextStyle: {
      fontWeight: 'bold',
      fontSize: Sizes.size16,
      color: theme?.color?.SECONDARY_COLOR_LIGHT,
      paddingLeft: Sizes.size10,
    },
    language: {
      fontSize: Sizes.size14,
      paddingLeft: Sizes.size10,
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
    },
    menuContent: {
      flexDirection: 'row',
      marginLeft: Sizes.size20,
      marginVertical: Sizes.size5,
    },
    iconContainer: {
      flexDirection: 'row',
    },
    imageContainer: {
      flexDirection: 'row',
      marginTop: Sizes.size20,
      paddingVertical: Sizes.size10,
    },
    profileImageContainer: {
      width: Sizes.size50,
      height: Sizes.size50,
      borderRadius: BorderStyles.radius.circle,
    },
    subMenuItemText: {
      marginLeft: Sizes.size10,
      fontSize: Sizes.size14,
    },
    rateStyle: {
      flexDirection: 'column',
    },
    starStyle: {
      flexDirection: 'row',
      marginLeft: Sizes.size15,
      marginTop: Sizes.size7,
    },
  });
};
