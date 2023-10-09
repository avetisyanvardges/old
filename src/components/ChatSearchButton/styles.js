import {StyleSheet} from 'react-native';
import {Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    iconsContent: {
      alignSelf: 'center',
      marginHorizontal: Sizes.size10,
    },

    searchInputContainer: {
      marginTop: Sizes.size10,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      marginVertical: Sizes.size10,
      marginHorizontal: Sizes.size10,
      paddingHorizontal: Sizes.size10,
      alignItems: 'center',
      width: '95%',
      height: Sizes.size45,
      backgroundColor: theme?.color.SEARCH_INPUT_COLOR,
      borderRadius: 12,
    },
  });
};

export {styles};
