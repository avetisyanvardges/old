import {StyleSheet} from 'react-native';
import {BorderStyles, Sizes} from '../../assets/styles';
const styles = (theme) => {
  return StyleSheet.create({
    menuContent: {
      backgroundColor: theme?.SECONDARY_TEXT_COLOR,
      height: Sizes.size30,
      alignSelf: 'flex-start',
      marginVertical: Sizes.size10,
      borderRadius: BorderStyles.radius.circle,
      flexDirection: 'row',
      marginHorizontal: Sizes.size5,
    },
    menuText: {
      alignSelf: 'center',
      flexDirection: 'row',
      paddingVertical: Sizes.size2,
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
      fontSize: Sizes.size12,
      marginHorizontal: Sizes.size5,
      padding: Sizes.size5,
    },
    iconContent: {
      marginVertical: Sizes.size8,
      marginLeft: Sizes.size10,
    },
  });
};
export {styles};
