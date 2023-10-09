import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {BorderStyles, Sizes, PaddingMargin, Shadow} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
    },
    buttons: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: Sizes.size20,
      paddingHorizontal: Sizes.size18,
    },
    markButton: {
      flex: 1,
      marginRight: Sizes.size8,
    },
    removeButton: {
      flex: 1,
      borderWidth: Sizes.size1,
      borderColor: '#E3E3E3',
      paddingVertical: Sizes.size5,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: Sizes.size8,
    },
    removeText: {
      fontSize: Sizes.size14,
      color: '#818195',
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    confirmButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleContainer: {
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    titleStyle: {
      fontSize: Sizes.screenTitle,
      color: theme?.color?.PRIMARY_COLOR_BOLD,
      fontWeight: 'bold',
    },
    modalContainer: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
    },
    notificationContainer: {
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      marginTop: Sizes.size3,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: Sizes.size16,
      color: theme.color.PRIMARY_COLOR_LIGHT,
    },
    notificationText: {
      paddingVertical: Sizes.size10,
      fontSize: Sizes.size12,
      color: theme.color.PRIMARY_COLOR_LIGHT,
    },
    unreadText: {
      backgroundColor: '#F0E7FA',
      marginTop: 3,
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: Sizes.size16,
    },
    actionBlock: {
      justifyContent: 'center',
      alignSelf: 'center',
      flexDirection: 'row',
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      width: Sizes.size40,
      height: Sizes.size40,
    },
    profileImage: {
      width: Sizes.size45,
      height: Sizes.size45,
      borderRadius: BorderStyles.radius.circle,
      marginHorizontal: Sizes.size5,
      marginVertical: Sizes.size5,
    },
    removeIconContainer: {
      flexDirection: 'row',
      padding: Sizes.size10,
      borderTopColor: theme?.color?.BORDER_THIN_COLOR,
      borderTopWidth: 0.5,
    },
    binIcon: {
      flexDirection: 'row',
      paddingVertical: Sizes.size3,
      marginHorizontal: Sizes.size5,
    },
    removeNotice: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    content: {
      alignItems: 'center',
    },
    settingsIcon: {
      paddingLeft: Sizes.size30,
      flexDirection: 'row',
      alignSelf: 'flex-end',
      width: '20%',
      paddingVertical: Sizes.size10,
    },
    rowBack: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
    },
    backRightBtn: {
      position: 'absolute',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: Sizes.size75,
      height: Sizes.size50,
    },
    backRightBtnLeft: {
      backgroundColor: '#818195',
      right: Sizes.size80,
      borderRadius: BorderStyles.radius.sm,
      marginRight: 5,
    },
    backRightBtnRight: {
      backgroundColor: '#F3267D',
      right: 0,
      marginRight: 5,
      borderRadius: BorderStyles.radius.sm,
    },
    confirmContainer: {
      position: 'absolute',
      bottom: Sizes.size19,
      borderRadius: Sizes.size12,
      ...Shadow,
      width: '49%',
      flexDirection: 'row',
      backgroundColor: '#fff',
      paddingVertical: Sizes.size10,
      alignSelf: 'flex-end',
    },
    horizontalLine: {
      height: '100%',
      width: 1,
      backgroundColor: '#E3E3E3',
      paddingVertical: Sizes.size5,
    },
    confirmButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Sizes.size25,
    },
    confirmButtonText: {
      marginRight: 'auto',
      marginLeft: 'auto',
      fontSize: Sizes.size14,
    },
  });
};

export {styles};
