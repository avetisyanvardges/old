import {StyleSheet} from 'react-native';
import {BorderStyles, Fonts} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      paddingTop: 10,
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'flex-start',
      backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
    },
    chatScreenListImage: {},
    membername: {
      fontSize: 15,
      marginBottom: 5,
      fontFamily: Fonts.bold,
      flex: 1,
      paddingRight: 50,
    },
    backTextWhite: {
      color: '#FFF',
    },
    swipeIcon: {
      color: '#FFF',
    },
    rowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      justifyContent: 'center',
      height: 50,
    },
    rowBack: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
    },
    backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
      height: 50,
    },
    backRightBtnLeft: {
      backgroundColor: '#818195',
      right: 80,
      borderRadius: BorderStyles.radius.sm,
      marginRight: 5,
    },
    backRightBtnRight: {
      backgroundColor: '#F3267D',
      right: 0,
      marginRight: 5,
      borderRadius: BorderStyles.radius.sm,
    },
  });
};
export {styles};
