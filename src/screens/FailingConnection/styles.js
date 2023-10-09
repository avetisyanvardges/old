import {StyleSheet} from 'react-native';
import {Colors, Fonts, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: Colors.charGreen,
      fontSize: Sizes.size40,
      lineHeight: Sizes.size48,
      fontWeight: '700',
      marginVertical: Sizes.size30,
    },
    subTitle: {
      width: Sizes.size300,
      marginTop: Sizes.size15,
      color: Colors.silver,
      fontSize: Sizes.size21,
      fontFamily: Fonts.regular,
      lineHeight: Sizes.size25,
      fontWeight: '400',
      textAlign: 'center',
    },
    tryAgainText: {
      fontSize: Sizes.size16,
      color: 'white',
    },
  });
};
export {styles};
