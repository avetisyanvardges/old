import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Shadow, BorderStyles, Sizes} from '../../assets/styles';
import * as Animatable from 'react-native-animatable';
import React from 'react';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: Sizes.size10,
    },
    contentContainer: {
      flexDirection: 'column',
      alignItems: 'center',
      margin: 10,
    },
    imageContainer: {
      width: Sizes.size80,
      height: Sizes.size80,
      borderRadius: BorderStyles.radius.circle,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    descBlock: {
      marginTop: Sizes.size15,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      borderRadius: 20,
      padding: Sizes.size12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    filtersContainer: {
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      borderColor: '#E3E3E3',
      marginHorizontal: Sizes.size12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    editProfileButton: {
      paddingVertical: Sizes.size6,
      backgroundColor: '#F3F3F3',
      borderRadius: Sizes.size12,
      paddingHorizontal: Sizes.size26,
    },
    editProfileButtonText: {
      color: '#2C2C2C',
      fontSize: Sizes.size14,
      textAlign: 'center',
    },
    filtersItem: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      paddingVertical: Sizes.size10,
    },
    flatListStyle: {
      paddingHorizontal: Sizes.size8,
      marginVertical: Sizes.size8,
    },
    uploadPhotoButtonStyle: {
      position: 'absolute',
      zIndex: 3,
      left: -Sizes.size5,
      top: -Sizes.size10,
      justifyContent: 'center',
      alignItems: 'center',
      padding: Sizes.size6,
      borderRadius: BorderStyles.radius.circle,
      backgroundColor: theme?.PRIMARY_TEXT_BACKGROUND_COLOR,
    },
    greyText: {
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
      fontSize: Sizes.size14,
      alignSelf: 'center',
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    removeIconContainer: {
      flexDirection: 'row',
      padding: Sizes.size10,
      borderBottomColor: theme?.color?.BORDER_THIN_COLOR,
      borderBottomWidth: 0.5,
    },

    totalCountContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: Sizes.size10,
    },
    totalCountText: {
      fontSize: Sizes.size16,
      paddingHorizontal: Sizes.size5,
      color: '#2C2C2C',
    },
    headerContainer: {
      paddingBottom: Sizes.size6,
      paddingHorizontal: Sizes.size25,
      marginTop: Sizes.size10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nickNameStyle: {
      color: '#2C2C2C',
      fontWeight: deviceInfo.ios ? '500' : 'bold',
      fontSize: Sizes.size15,
    },
    eventInfoContainer: {
      alignItems: 'center',
      flex: 0.5,
    },
    eventInfoTitle: {
      color: '#818195',
      fontSize: Sizes.size15,
    },
    eventInfoSubtitle: {
      color: '#2C2C2C',
      fontSize: Sizes.size14,
    },
    aboutMe: {
      width: deviceInfo.deviceWidth / 2,
      fontSize: Sizes.size12,
      textAlign: 'center',
      color: '#2C2C2C',
      fontWeight: '400',
      marginTop: Sizes.size13,
    },
    linkStyle: {borderBottomColor: '#E3E3E3', borderBottomWidth: 0.5},
    flex_1: {
      flex: 1,
    },
    flex_2: {
      flex: 2,
    },
    disabledLink: {
      opacity: 0.5,
    },
    closedAccountContainer: {
      height: Sizes.size220,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closedAccountText: {
      marginVertical: Sizes.size13,
      fontSize: Sizes.size16,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    underline: {
      paddingHorizontal: Sizes.size12,
      borderBottomWidth: Sizes.size1,
      borderBottomColor: '#E3E3E3',
      marginBottom: Sizes.size10,
      marginHorizontal: Sizes.size12,
    },
    finishedEvent: {
      position: 'absolute',
      top: Sizes.size5,
      right: Sizes.size5,
      zIndex: 99,
    },
    activeBajeContainer: {
      backgroundColor: '#A347FF',
      borderRadius: 3,
      width: Sizes.size26,
      height: Sizes.size12,
      position: 'absolute',
      top: Sizes.size8,
      right: Sizes.size8,
      zIndex: 999,
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeBajeText: {
      fontSize: Sizes.size8,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
      color: 'white',
    },
  });
};

export {styles};
