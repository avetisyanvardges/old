import {StyleSheet} from 'react-native';
import {BorderStyles, Sizes, PaddingMargin, Shadow} from '../../assets/styles';
const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1.5,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
    },
    eventImage: {
      width: '100%',
      height: Sizes.size100,
      borderRadius: 10,
      marginTop: Sizes.size5,
    },
    locationText: {
      color: theme?.color?.PRIMARY_COLOR_BOLD,
      fontSize: Sizes.size12,
      flexShrink: 1,
      marginTop: Sizes.size3,
    },
    eventNameText: {
      fontSize: Sizes.size14,
      marginTop: Sizes.size2,
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
    },
    eventDesc: {
      alignItems: 'flex-start',
      marginHorizontal: Sizes.size5,
    },
    scrollContainer: {
      marginHorizontal: Sizes.size3,
    },
    nearMeContent: {
      flexDirection: 'row',
    },
    nearMeText: {
      alignSelf: 'center',
      paddingHorizontal: Sizes.size7,
      paddingVertical: Sizes.size2,
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
      fontSize: Sizes.size12,
    },
    descBlock: {
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      width: Sizes.size150,
      height: Sizes.size210,
      flex: 1,
      marginHorizontal: Sizes.size5,
      flexDirection: 'row',
      borderRadius: BorderStyles.radius.xs,
      shadowColor: theme?.color?.PRIMARY_COLOR_BOLD,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.74,
      elevation: 5,
    },
    mainContent: {
      flexDirection: 'column',
      width: '100%',
      paddingHorizontal: Sizes.size5,
    },
    grayText: {
      color: theme?.color?.PRIMARY_COLOR_BOLD,
      fontSize: Sizes.size12,
      paddingVertical: Sizes.size3,
      alignSelf: 'center',
      marginHorizontal: Sizes.size3,
    },
    nameText: {
      color: theme?.color?.PRIMARY_COLOR_BOLD,
      fontSize: Sizes.size12,
      marginHorizontal: Sizes.size4,
    },
    profileInfo: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    dateContent: {
      color: theme?.color?.PRIMARY_COLOR_BOLD,
      fontSize: Sizes.size12,
      paddingVertical: Sizes.size3,
      alignSelf: 'center',
      marginHorizontal: Sizes.size5,
      marginTop: Sizes.size3,
    },
    profileContainer: {
      alignItems: 'center',
    },
    profileImage: {
      width: Sizes.size30,
      height: Sizes.size30,
      borderRadius: BorderStyles.radius.circle,
    },
    defaultImage: {
      width: Sizes.size35,
      height: Sizes.size35,
      borderRadius: BorderStyles.radius.circle,
    },
    dateInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: Sizes.size5,
    },
    textSize: {
      maxWidth: Sizes.size150,
    },
    left10: {
      marginLeft: Sizes.size10,
    },
    eventsList: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    eventsListIos: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    addEventIcon: {
      position: 'absolute',
      bottom: Sizes.size75,
      right: Sizes.size5,
      width: Sizes.size50,
      height: Sizes.size50,
      borderRadius: BorderStyles.radius.circle,
      backgroundColor: '#9BA0B3',
      zIndex: 9999,
      alignItems: 'center',
      justifyContent: 'center',
    },
    divisibleHeader: {
      borderTopWidth: 1,
      borderColor: '#e5e5e5',
      padding: Sizes.size10,
      justifyContent: 'center',
    },
    swipeUpText: {
      alignSelf: 'center',
      flexDirection: 'row',
      paddingHorizontal: Sizes.size10,
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
      fontSize: Sizes.size12,
    },
    swipeUpContent: {
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      height: Sizes.size45,
      width: Sizes.size45,
      borderRadius: BorderStyles.radius.circle,
      top: 0,
      zIndex: 100,
      ...Shadow,
    },
    footerContent: {
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      width: '100%',
      height: Sizes.size50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    menuText: {
      alignSelf: 'center',
      flexDirection: 'row',
      paddingVertical: Sizes.size72,
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
      fontSize: Sizes.size12,
      marginHorizontal: Sizes.size5,
      padding: Sizes.size5,
    },
    author: {
      flexDirection: 'row',
      padding: Sizes.size7,
    },
    activeStatus: {
      width: Sizes.size30,
      height: '100%',
      top: Sizes.size1,
    },
    extraBoldShadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 24,
      marginHorizontal: Sizes.size5,
      // backgroundColor: theme?.color?.SECONDARY_COLOR_LIGHT,
      width: Sizes.size158,
      height: Sizes.size218,
    },
    whiteBorderStyle: {
      borderWidth: 1,
      borderColor: theme?.color?.PRIMARY_COLOR_FAINT,
    },
    borderRadiusCircle: {
      borderRadius: 50,
    },
    menuBackgroundImageBorder: {
      borderColor: theme?.color?.PRIMARY_COLOR_FAINT,
      borderBottomWidth: 2,
    },
    locIcon: {
      ...Shadow,
    },
    eventsNotFound: {
      alignSelf: 'center',
      color: '#F56C6C',
    },
    loader: {
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      position: 'absolute',
      width: '100%',
      height: '70%',
      zIndex: 999,
      opacity: 0.8,
    },
  });
};
export {styles};
