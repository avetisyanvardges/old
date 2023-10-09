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
      marginBottom: Sizes.size7,
    },
    memberContainer: {
      flexDirection: 'row',
      marginTop: Sizes.size16,
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
    },
    likeText: {
      fontSize: Sizes.size12,
      fontWeight: deviceInfo.ios ? '400' : 'bold',
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
  });
};
export {styles};
