import {StyleSheet} from 'react-native';
import {Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: Sizes.size12,
      borderColor: '#E3E3E3',
      borderWidth: 1,
    },
    container: {
      paddingVertical: Sizes.size10,
      paddingHorizontal: Sizes.size15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    loginTextStyle: {
      marginRight: Sizes.size6,
      fontSize: Sizes.size14,
      color: '#818195',
      lineHeight: Sizes.size17,
      marginHorizontal: Sizes.size11,
    },
  });
};
export {styles};
