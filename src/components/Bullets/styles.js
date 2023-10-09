import {StyleSheet} from 'react-native';
import {BackgroundColors, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    bulletButton: {
      paddingHorizontal: 4.4,
    },
    bullet: {
      width: Sizes.size6,
      height: Sizes.size6,
      borderRadius: Sizes.size6,
      backgroundColor: BackgroundColors.white,
    },
    activeBullet: {
      backgroundColor: '#A347FF',
    },
  });
};

export {styles};
