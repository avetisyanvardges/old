import {StyleSheet} from 'react-native';
import {Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    imageStyle: {
      width: Sizes.size150,
      height: Sizes.size150,
      borderRadius: 20,
    },
    imageContainer: {
      marginVertical: Sizes.size15,
    },
  });
};

export {styles};
