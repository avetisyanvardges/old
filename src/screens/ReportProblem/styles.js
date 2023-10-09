import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Sizes, PaddingMargin, fullScreen} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
      paddingVertical: Sizes.size15,
      marginBottom: Sizes.size55,
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
    textArea: {
      height: Sizes.size150,
      paddingTop: Sizes.size10,
      justifyContent: 'flex-start',
      textAlignVertical: 'top',
    },
    textInputStyle: {
      borderBottomWidth: 0.5,
      borderColor: '#E3E3E3',
      flex: 1,
      paddingVertical: Sizes.size10,
      paddingHorizontal: Sizes.size10,
    },
  });
};
export {styles};
