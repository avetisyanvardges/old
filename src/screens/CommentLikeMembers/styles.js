import {StyleSheet} from 'react-native';
import {
  BorderStyles,
  Sizes,
  PaddingMargin,
  Shadow,
  Colors,
} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';
const styles = (theme) => {
  return StyleSheet.create({
    container: {
      marginHorizontal: Sizes.size18,
    },
    memberContainer: {
      flexDirection: 'row',
      marginTop: Sizes.size16,
      alignItems: 'center',
      borderBottomColor: theme?.PRIMARY_TEXT_BACKGROUND_COLOR,
    },
    mainInfo: {
      marginLeft: Sizes.size10,
      alignItems: 'flex-start',
      flex: 1,
    },
    infoLine: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: Sizes.size10,
    },
    likeText: {
      fontSize: Sizes.size12,
      fontWeight: '400',
      color: Colors.silver,
    },
    underLine: {
      width: '100%',
      paddingHorizontal: Sizes.size12,
      borderBottomWidth: Sizes.size1,
      borderBottomColor: '#E3E3E3',
      marginTop: Sizes.size20,
      marginBottom: Sizes.size10,
    },
    viewProfile: {
      height: Sizes.size28,
      backgroundColor: '#F3F3F3',
      borderRadius: Sizes.size10,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewProfileText: {
      color: '#818195',
      flexDirection: 'row',
      fontSize: Sizes.size12,
      textAlign: 'center',
      fontWeight: deviceInfo.ios ? '600' : 'bold',
    },
  });
};
export {styles};
