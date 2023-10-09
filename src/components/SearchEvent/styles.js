import {StyleSheet} from 'react-native';
import {Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      marginTop: 10,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: Sizes.size10,
      paddingHorizontal: Sizes.size15,
      height: 57,
      width: '95%',
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      borderRadius: Sizes.size20,
      zIndex: 999,
    },
    searchInput: {
      flex: 1,
      paddingLeft: Sizes.size11,
    },
    resetInput: {
      padding: Sizes.size10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: Sizes.size10,
    },
    filterMenu: {
      width: Sizes.size42,
      height: Sizes.size42,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F3F3F4',
      borderRadius: Sizes.size10,
    },
  });
};

export {styles};
