import {StyleSheet} from 'react-native';
import {Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    userName: {
      fontWeight: 'bold',
      fontSize: Sizes.size14,
      marginLeft: 10,
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
      flex: 1,
    },
  });
};

export {styles};
