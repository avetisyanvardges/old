import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {BorderStyles, Colors, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 22,
      borderBottomColor: Colors.lightWhite,
      borderBottomWidth: 0.5,
      padding: 10,
      marginHorizontal: Sizes.size6,
    },
    line: {
      width: 0.5,
      height: 30,
      backgroundColor: Colors.lightWhite,
    },
    touchable: {
      backgroundColor: theme?.color?.SECONDARY_COLOR_LIGHT,
      borderRadius: BorderStyles.radius.circle,
      width: Sizes.size10,
      height: Sizes.size10,
      marginLeft: Sizes.size10,
      marginTop: Sizes.size3,
    },
    colorBlueViolet: {
      color: Colors.blueViolet,
    },
    colorSilver: {
      color: Colors.silver,
    },
    linkStyle: {
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    menuItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
};
export {styles};
