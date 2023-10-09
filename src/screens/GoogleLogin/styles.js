import {StyleSheet} from 'react-native';
import {PaddingMargin, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    content: {
      paddingRight: PaddingMargin.screenPaddingHorizontal * 2,
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
      alignSelf: 'center',
      height: Sizes.size50,
      borderWidth: 1,
      borderColor: '#E3E3E3',
      borderRadius: Sizes.size12,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    container: {
      width: '100%',
    },
    loginTextStyle: {
      marginRight: Sizes.size6,
      fontSize: Sizes.size14,
      color: '#818195',
      lineHeight: Sizes.size17,
      marginHorizontal: Sizes.size11,
    },
  });
};

export {styles};
