import {StyleSheet} from 'react-native';
import {Sizes, PaddingMargin, fullScreen, Shadow} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
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
      marginVertical: Sizes.size20,
    },
    smallTitle: {
      fontSize: Sizes.size12,
      color: '#818195',
      marginBottom: Sizes.size12,
      marginTop: Sizes.size15,
    },
    topTitle: {
      fontSize: Sizes.size14,
      color: '#2C2C2C',
    },
    subTitle: {
      color: '#818195',
      fontSize: Sizes.size10,
      maxWidth: Sizes.size220,
    },
    timerStyle: {
      color: '#A347FF',
      fontSize: Sizes.size12,
      fontWeight: '500',
      marginBottom: Sizes.size18,
    },
    timerContainer: {
      alignItems: 'center',
    },
    settingsInput: {
      borderRadius: Sizes.size12,
      backgroundColor: '#F3F3F3',
      paddingHorizontal: Sizes.size19,
    },
    mb_16: {
      marginBottom: Sizes.size16,
    },
    mb_43: {
      marginBottom: Sizes.size43,
    },
    mb_28: {
      marginBottom: Sizes.size28,
    },
    mb_13: {
      marginBottom: Sizes.size13,
    },
    circle: {
      width: Sizes.size5,
      height: Sizes.size5,
      backgroundColor: '#2C2C2C',
      borderRadius: 50,
      marginRight: Sizes.size8,
      marginTop: Sizes.size8,
    },
    mt_39: {
      marginTop: Sizes.size39,
    },
    row: {
      flexDirection: 'row',
      paddingRight: Sizes.size56,
    },
    mb_11: {
      marginBottom: Sizes.size11,
    },
    confirmContainer: {
      position: 'absolute',
      borderRadius: Sizes.size12,
      ...Shadow,
      width: '100%',
      flexDirection: 'row',
      backgroundColor: '#fff',
      height: Sizes.size39,
      marginTop: Sizes.size14,
    },
    horizontalLine: {
      height: '100%',
      width: 0.5,
      backgroundColor: '#E3E3E3',
      paddingVertical: Sizes.size5,
    },
    confirmButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: Sizes.size25,
    },
    confirmButtonText: {
      marginRight: 'auto',
      marginLeft: 'auto',
      fontSize: Sizes.size14,
    },
  });
};
export {styles};
