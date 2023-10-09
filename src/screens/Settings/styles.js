import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Sizes, BorderStyles, PaddingMargin} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    notVerifyContainer: {
      backgroundColor: '#F3F3F4',
      borderRadius: Sizes.size12,
      paddingHorizontal: Sizes.size16,
      paddingVertical: Sizes.size10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      flex: 1,
    },
    notVerifyIcon: {
      color: '#818195',
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    container: {
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      paddingVertical: Sizes.size15,
    },
    contentContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    itemContainer: {
      flexDirection: 'row',
      paddingVertical: Sizes.size15,
      alignItems: 'center',
    },
    contentText: {
      fontSize: Sizes.size16,
      color: theme?.color?.PRIMARY_COLOR_BOLD,
      marginLeft: Sizes.size15,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Sizes.size20,
      paddingVertical: Sizes.size10,
    },
    menuContent: {
      flexDirection: 'row',
      marginLeft: Sizes.size20,
      marginVertical: Sizes.size5,
    },
    profileImageContainer: {
      width: Sizes.size100,
      height: Sizes.size100,
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
      marginTop: Sizes.size5,
    },
    userNameTextStyle: {
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      paddingVertical: Sizes.size5,
      fontSize: Sizes.size14,
      alignSelf: 'center',
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
    },
    eventsList: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    eventsListIos: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    grayText: {
      color: theme?.color?.PRIMARY_COLOR_BOLD,
      fontSize: Sizes.size12,
      paddingVertical: Sizes.size3,
      alignSelf: 'center',
      marginHorizontal: Sizes.size3,
    },
    underLine: {
      width: '100%',
      paddingHorizontal: Sizes.size12,
      borderBottomWidth: Sizes.size1,
      borderBottomColor: '#E3E3E3',
      marginTop: Sizes.size30,
      marginBottom: Sizes.size10,
    },
    ligthButtonText: {
      paddingVertical: Sizes.size10,
      color: '#818195',
      fontSize: Sizes.size14,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    ligthButton: {
      borderRadius: Sizes.size12,
      backgroundColor: '#F3F3F3',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Sizes.size15,
    },
    blackLogoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Sizes.size9,
    },
    pandingContainer: {
      backgroundColor: '#71EEFB',
      borderRadius: Sizes.size12,
      paddingHorizontal: Sizes.size16,
      paddingVertical: Sizes.size10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    pandingText: {
      color: '#ffffff',
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
  });
};
export {styles};
