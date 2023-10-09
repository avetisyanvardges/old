import {StyleSheet} from 'react-native';
import {Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    customCheckboxContainer: {
      backgroundColor: '#F3F3F4',
      borderRadius: Sizes.size50,
      alignItems: 'center',
      justifyContent: 'center',
    },
    RadioCircleItem: {
      width: Sizes.size8,
      height: Sizes.size8,
      borderRadius: 50,
      backgroundColor: '#9298AF',
    },
  });
};

export {styles};
