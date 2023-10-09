import {StyleSheet} from 'react-native';
import {Colors, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: Sizes.size24,
    },
    userInfo: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    userName: {
      fontSize: Sizes.size14,
      color: Colors.charGreen,
      marginHorizontal: Sizes.size11,
    },
    unBlockUserStyle: {
      paddingHorizontal: Sizes.size15,
      paddingVertical: Sizes.size10,
    },
  });
};

export {styles};
