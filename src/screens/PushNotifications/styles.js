import {StyleSheet} from 'react-native';
import {Sizes, PaddingMargin, fullScreen} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    globalContainer: {
      flex: 1,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
    },
    container: {
      ...fullScreen,
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      paddingVertical: Sizes.size15,
      marginBottom: Sizes.size55,
    },
    underLine: {
      width: '100%',
      paddingHorizontal: Sizes.size12,
      borderBottomWidth: Sizes.size1,
      borderBottomColor: '#E3E3E3',
      marginVertical: Sizes.size7,
    },
    smallTitle: {
      fontSize: Sizes.size12,
      color: '#818195',
      marginBottom: Sizes.size12,
      marginTop: Sizes.size15,
    },
  });
};
export {styles};
