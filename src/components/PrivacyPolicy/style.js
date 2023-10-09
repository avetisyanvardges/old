import {StyleSheet} from 'react-native';
import {
  Sizes,
  PaddingMargin,
  fullScreen,
  Fonts,
  Colors,
} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    underLine: {
      width: '100%',
      paddingHorizontal: Sizes.size12,
      borderBottomWidth: Sizes.size1,
      borderBottomColor: '#E3E3E3',
      marginTop: Sizes.size30,
      marginBottom: Sizes.size10,
    },
    content: {
      marginVertical: Sizes.size10,
      marginHorizontal: Sizes.size15,
      alignItems: 'flex-start',
    },
    description: {
      width: Sizes.size263,
      alignItems: 'flex-start',
    },
    descriptionText: {
      color: Colors.silver,
      fontSize: Sizes.size10,
      lineHeight: Sizes.size12,
      fontFamily: Fonts.regular,
    },
    deleteContainer: {
      marginTop: Sizes.size25,
    },
    deleteText: {
      fontSize: Sizes.size14,
      fontFamily: Fonts.regular,
      color: Colors.lightRed,
    },
  });
};
export {styles};
