import {StyleSheet} from 'react-native';
import {
  BorderStyles,
  Sizes,
  PaddingMargin,
  Shadow,
  Colors,
} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';
const styles = (theme) => {
  return StyleSheet.create({
    container: {
      width: '96%',
      marginVertical: 30,
      alignSelf: 'center',
      shadowColor: Colors.black,
      backgroundColor: '#fff',
      ...Shadow,
      borderRadius: Sizes.size20,
      height: Sizes.size439,
    },
    modalContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0.4)',
      flex: 1,
      width: '100%',
      justifyContent: 'center',
    },
    memberContainer: {
      flexDirection: 'row',
      marginTop: Sizes.size16,
      paddingHorizontal: Sizes.size15,
      alignItems: 'center',
      borderBottomColor: theme?.PRIMARY_TEXT_BACKGROUND_COLOR,
    },
    title: {
      fontSize: Sizes.size14,
    },
    profileImage: {
      width: Sizes.size60,
      height: Sizes.size60,
      borderRadius: BorderStyles.radius.circle,
    },
    mainInfo: {
      marginLeft: Sizes.size10,
      alignItems: 'flex-start',
      width: 100,
    },
    moreIcon: {
      flexDirection: 'row',
      marginLeft: 'auto',
    },
    blockContent: {
      bottom: 0,
      padding: Sizes.size10,
      borderTopRightRadius: Sizes.size20,
      borderTopLeftRadius: Sizes.size20,
      borderTopWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      height: Sizes.size200,
      marginHorizontal: Sizes.size5,
      borderColor: theme?.color?.PRIMARY_COLOR_BOLD,
    },
    modalHeader: {
      borderBottomWidth: 3,
      borderColor: theme?.color?.PRIMARY_COLOR_BOLD,
      paddingBottom: Sizes.size5,
      width: Sizes.size50,
      alignSelf: 'center',
    },
    blockUser: {
      flexDirection: 'row',
      marginTop: Sizes.size10,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    blockUserText: {
      fontSize: Sizes.size16,
      marginLeft: Sizes.size10,
      color: theme?.color?.PRIMARY_COLOR_BOLD,
    },
    modalContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      ...Shadow,
    },
    headerText: {
      color: '#C6C6D0',
      fontSize: Sizes.size12,
      alignSelf: 'flex-start',
    },
    headerContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      paddingVertical: Sizes.size16,
    },
    viewProfile: {
      height: Sizes.size28,
      backgroundColor: '#F3F3F3',
      borderRadius: Sizes.size10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewProfileText: {
      color: '#818195',
      flexDirection: 'row',
      fontSize: Sizes.size12,
      textAlign: 'center',
      fontWeight: deviceInfo.ios ? '600' : 'bold',
    },
    acceptContainer: {
      borderRadius: Sizes.size10,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: Sizes.size6,
      width: Sizes.size130,
      marginLeft: 'auto',
    },
    asseptContainerTextStyle: {
      color: 'white',
      fontWeight: deviceInfo.ios ? '600' : 'bold',
      fontSize: 12,
      lineHeight: 15,
      flex: 1,
      textAlign: 'center',
    },
    absoluteCenter: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: -1,
    },
    emptyComponentText: {
      color: '#C6C6D0',
      fontSize: Sizes.size16,
    },
  });
};
export {styles};
