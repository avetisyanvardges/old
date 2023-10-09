import {StyleSheet} from 'react-native';
import {Colors, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: Sizes.size15,
    },
    text: {
      fontSize: Sizes.size14,
    },
    linkRightContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: Sizes.size20,
    },
    descContainer: {
      paddingLeft: Sizes.size35,
    },
    menuDescription: {
      fontSize: Sizes.size10,
      fontWeight: 'normal',
      lineHeight: Sizes.size12,
      color: Colors.silver,
      width: Sizes.size249,
    },
    iconContainer: {
      marginBottom: Sizes.size14,
      marginHorizontal: Sizes.size7,
    },
    titleContainer: {
      flexDirection: 'row',
      height: Sizes.size25,
    },
  });
};

export {styles};
