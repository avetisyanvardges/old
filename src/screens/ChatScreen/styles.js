import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Sizes, Colors} from '../../assets/styles';
const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
    },
    headerContainer: {
      minHeight: Sizes.size60,
      flexDirection: 'row',
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
    },
    iconContainer: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    avatarContainer: {
      marginLeft: Sizes.size22,
      flexDirection: 'row',
    },
    eventItemHeader: {
      marginLeft: Sizes.size10,
      alignItems: 'flex-start',
    },
    userName: {
      fontSize: Sizes.size14,
      fontWeight: '400',
      color: Colors.charGreen,
      width: Sizes.size225,
    },
    titleStyle: {
      fontSize: Sizes.size16,
      color: theme?.color?.INPUT_DEFAULT_COLOR,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    touchableIconContainer: {
      paddingVertical: Sizes.size10,
    },
    iconWidth: {
      flex: 1,
    },
    titleContainerCenter: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flex: 1,
      paddingRight: Sizes.size29,
    },
  });
};

export {styles};
