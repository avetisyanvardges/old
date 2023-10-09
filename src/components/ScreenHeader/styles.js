import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Sizes, BorderStyles} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    touchableIconContainer: {
      paddingVertical: Sizes.size10,
    },
    iconWidth: {
      width: '100%',
    },
    headerContainer: {
      flexDirection: 'row',
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      marginTop: Sizes.size10,
    },
    iconContainer: {
      alignItems: 'center',
    },
    titleContainerCenter: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      flex: 1,
      paddingRight: Sizes.size29,
    },
    titleContainerEnd: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      width: '80%',
      paddingHorizontal: Sizes.size11,
    },
    titleStyle: {
      fontSize: Sizes.size16,
      color: theme?.color?.INPUT_DEFAULT_COLOR,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    touchable: {
      backgroundColor: theme?.PRIMARY_TEXT_COLOR_LIGHT,
      borderRadius: BorderStyles.radius.circle,
      top: Sizes.size4,
      width: Sizes.size8,
      height: Sizes.size8,
      alignSelf: 'flex-end',
      right: Sizes.size3,
    },
    count: {
      color: theme?.color?.PRIMARY_COLOR_FAINT,
      fontSize: Sizes.size8,
      textAlign: 'center',
    },
    counterContainer: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
  });
};
export {styles};
