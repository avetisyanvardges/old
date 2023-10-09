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
    circle: {
      width: Sizes.size5,
      height: Sizes.size5,
      borderRadius: 50,
      backgroundColor: '#2C2C2C',
      marginRight: Sizes.size8,
    },
    text: {
      fontSize: Sizes.size14,
    },
    titleContainer: {
      width: Sizes.size242,
      flexDirection: 'row',
      alignItems: 'center',
    },
    linkRightContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    linkRightIcon: {
      justifyContent: 'center',
    },
    linkStateContainer: {
      alignItems: 'flex-end',
      maxWidth: Sizes.size90,
    },
    linkStateText: {
      fontSize: Sizes.size12,
      color: Colors.silver,
      marginHorizontal: Sizes.size11,
    },
  });
};

export {styles};
