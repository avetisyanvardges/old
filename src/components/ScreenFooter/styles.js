import {StyleSheet} from 'react-native';
import {BorderStyles, Sizes} from '../../assets/styles';
const styles = (theme) => {
  return StyleSheet.create({
    footerContainer: {
      position: 'absolute',
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      height: Sizes.size55,
      borderTopLeftRadius: Sizes.size20,
      borderTopRightRadius: 20,
      bottom: -Sizes.size1,
      right: -Sizes.size1,
      left: -Sizes.size1,
      alignSelf: 'center',
      flexDirection: 'row',

      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,
      elevation: 24,
    },
    profileImageContainer: {
      width: Sizes.size33,
      height: Sizes.size33,
      borderRadius: BorderStyles.radius.s,
    },
    touchable: {
      backgroundColor: theme?.color?.SECONDARY_COLOR_LIGHT,
      borderRadius: BorderStyles.radius.circle,
      position: 'absolute',
      width: Sizes.size8,
      height: Sizes.size8,
      flexDirection: 'row',
      alignSelf: 'flex-end',
      marginTop: -1.5,
    },
    activeProfile: {
      borderWidth: 2,
      borderColor: theme?.color?.SECONDARY_COLOR_LIGHT,
    },
    menuItem: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyTouchable: {
      borderWidth: 2,
      borderRadius: BorderStyles.radius.circle,
      position: 'absolute',
      width: Sizes.size8,
      height: Sizes.size8,
      flexDirection: 'row',
      alignSelf: 'flex-end',
      marginTop: -1.5,
    },
  });
};
export {styles};
