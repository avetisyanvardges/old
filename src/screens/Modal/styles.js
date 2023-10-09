import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {
  BorderStyles,
  Colors,
  PaddingMargin,
  Shadow,
  Sizes,
} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    fullContainer: {
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      flex: 1,
    },
    fullHeigth: {
      height: deviceInfo.deviceHeight,
    },
    headerContainer: {
      height: Sizes.size45,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Sizes.size35,
    },
    headerTitle: {
      fontSize: Sizes.size16,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
      color: Colors.charGreen,
      flex: 1,
      textAlign: 'center',
    },
    pageTitle: {
      fontSize: Sizes.size30,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
      color: Colors.charGreen,
      textAlign: 'center',
    },
    buttonContainer: {
      paddingVertical: Sizes.size25,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    titleContainer: {
      width: Sizes.size269,
      marginVertical: Sizes.size10,
    },
    cancelIcon: {
      position: 'absolute',
      padding: Sizes.size15,
      right: 0,
    },
    ratingStyle: {
      marginTop: Sizes.size15,
      width: Sizes.size207,
      height: Sizes.size220,
      alignItems: 'center',
    },
    commentContainer: {
      width: '100%',
      height: Sizes.size128,
      marginTop: Sizes.size5,
      backgroundColor: Colors.lightSilver,
      borderRadius: Sizes.size12,
    },
    inputStyle: {
      minHeight: Sizes.size50,
      padding: Sizes.size15,
      marginVertical: deviceInfo.ios ? Sizes.size10 : null,
    },
    rateButton: {
      width: '100%',
    },
    footerContainer: {
      alignItems: 'center',
    },
    feedBackText: {
      marginTop: Sizes.size20,
      marginBottom: Sizes.size47,
      width: Sizes.size192,
      fontSize: Sizes.size24,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
      color: Colors.charGreen,
      textAlign: 'center',
    },
    avatarContainer: {
      width: '100%',
      marginTop: Sizes.size35,
      flexDirection: 'row',
    },
    eventItemHeader: {
      marginLeft: Sizes.size10,
      alignItems: 'flex-start',
      width: '50%',
    },
    rateStyle: {
      width: Sizes.size210,
      height: Sizes.size203,
    },
    eventDetail: {
      padding: Sizes.size13,
      flexDirection: 'row',
    },
    rateAvatarContainer: {
      width: Sizes.size150,
      height: Sizes.size150,
      borderRadius: BorderStyles.radius.xs,
      marginBottom: Sizes.size10,
      ...Shadow,
      backgroundColor: 'white',
      borderWidth: Sizes.size1,
      borderColor: '#818195',
    },
    rateAvatarNameFullnameContent: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Sizes.size20,
    },
    userPhoto: {
      width: Sizes.size50,
      height: Sizes.size50,
      borderRadius: BorderStyles.radius.circle,
    },
    userNameContainer: {
      marginTop: Sizes.size10,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    notNowContainer: {
      paddingVertical: Sizes.size10,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      color: '#2C2C2C',
      fontSize: Sizes.size14,
    },
  });
};

export {styles};
