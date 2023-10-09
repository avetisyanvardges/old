import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Sizes, PaddingMargin, fullScreen} from '../../assets/styles';

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
      marginVertical: Sizes.size25,
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
      marginTop: Sizes.size12,
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
  });
};
export {styles};
