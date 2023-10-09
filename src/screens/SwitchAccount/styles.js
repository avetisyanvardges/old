import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
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
      marginVertical: Sizes.size30,
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
      marginBottom: Sizes.size6,
      marginTop: Sizes.size38,
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
      paddingVertical: deviceInfo.ios ? Sizes.size10 : null,
    },
    mb_16: {
      marginBottom: Sizes.size16,
    },
    mt_57: {
      marginTop: Sizes.size57,
    },
    mb_27: {
      marginBottom: Sizes.size27,
    },
    accountTypeContainer: {
      ...Shadow,
      borderRadius: Sizes.size20,
      backgroundColor: '#FFFFFF',
      paddingHorizontal: Sizes.size17,
      paddingVertical: Sizes.size17,
      marginBottom: Sizes.size23,
    },

    accountTypeTitle: {
      fontSize: Sizes.size20,
      color: '#A347FF',
      fontWeight: 'bold',
    },
    typeImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Sizes.size56,
      marginBottom: Sizes.size47,
    },
    accountTypeDesc: {
      fontSize: Sizes.size14,
      color: '#818195',
      marginBottom: Sizes.size10,
    },
  });
};
export {styles};
