import {StyleSheet} from 'react-native';
import {BorderStyles, Sizes, Shadow, Colors} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    mapContainer: {
      flex: 1,
    },
    iconsContent: {
      alignSelf: 'center',
      alignItems: 'flex-end',
      margin: Sizes.size5,
      backgroundColor: '#F3F3F4',
      borderRadius: Sizes.size10,
      padding: Sizes.size10,
    },
    searchInput: {
      marginTop: Sizes.size10,
      position: 'absolute',
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: Sizes.size10,
      paddingHorizontal: Sizes.size10,
      width: '95%',
      height: Sizes.size66,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      borderRadius: Sizes.size20,
      ...Shadow,
    },
    typeIcons: {
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      height: Sizes.size30,
      alignSelf: 'center',
      margin: Sizes.size3,
      flexDirection: 'row',
      ...Shadow,
    },
    eventType: {
      alignSelf: 'center',
      paddingHorizontal: Sizes.size7,
      paddingVertical: Sizes.size2,
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
      fontSize: Sizes.size12,
    },
    userLocationButton: {
      position: 'absolute',
      zIndex: 100,
      width: Sizes.size42,
      height: Sizes.size42,
      right: Sizes.size18,
      bottom: Sizes.size71,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      borderRadius: Sizes.size12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mapZoomButtonsContainer: {
      position: 'absolute',
      zIndex: 100,
      width: Sizes.size40,
      height: Sizes.size80,
      right: Sizes.size5,
      top: deviceInfo.deviceHeight / 2 - 75,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      borderRadius: 10,
    },
    zoomButton: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      flex: 0.5,
    },
    headerContainer: {
      flexDirection: 'row',
      marginTop: Sizes.size2,
      paddingVertical: Sizes.size20,
      paddingHorizontal: Sizes.size10,
    },
    iconsContainer: {
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      width: Sizes.size45,
      height: Sizes.size45,
      marginLeft: Sizes.size3,
      borderRadius: BorderStyles.radius.circle,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    touchable: {
      backgroundColor: theme?.PRIMARY_TEXT_COLOR_LIGHT,
      borderRadius: BorderStyles.radius.circle,
      position: 'absolute',
      width: Sizes.size7,
      top: -Sizes.size3,
      right: -Sizes.size4,
      height: Sizes.size7,
      flexDirection: 'row',
      alignSelf: 'flex-end',
    },
    goBackButton: {
      // transform: [{ rotate: '180deg' }],
    },
    fixedHeaderContainer: {
      position: 'absolute',
      top: 0,
      height: Sizes.size79,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Sizes.size26,
    },
    avatarContainer: {
      marginLeft: Sizes.size22,
      flexDirection: 'row',
    },
    eventItemHeader: {
      marginLeft: Sizes.size23,
      alignItems: 'flex-start',
    },
    userName: {
      fontSize: Sizes.size14,
      fontWeight: '400',
      color: Colors.charGreen,
    },
  });
};

export {styles};
