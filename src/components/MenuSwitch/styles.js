import {StyleSheet} from 'react-native';
import {Colors, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: Sizes.size5,
    },
    text: {
      fontSize: Sizes.size14,
    },
    linkRightContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    textContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: Sizes.size15,
      flex: 1,
    },
  });
};

export {styles};
