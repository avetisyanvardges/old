import {StyleSheet} from 'react-native';
import {BorderStyles, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    content: {
      alignItems: 'center',
      borderRadius: BorderStyles.radius.circle,
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
      marginLeft: Sizes.size12,
      fontSize: Sizes.size14,
      color: '#818195',
      lineHeight: Sizes.size17,
    },
  });
};
export {styles};
