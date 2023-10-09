import {StyleSheet} from 'react-native';
import {BorderStyles, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    iconsContent: {
      alignSelf: 'center',
      marginRight: Sizes.size10,
    },

    searchInputContainer: {
      marginTop: Sizes.size10,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#F3F3F3',
      borderRadius: Sizes.size12,
      paddingHorizontal: Sizes.size14,
      paddingVertical: Sizes.size12,
    },
    textInputStyle: {
      flex: 1,
      paddingVertical: Sizes.size2,
      paddingHorizontal: Sizes.size10,
    },
  });
};

export {styles};
