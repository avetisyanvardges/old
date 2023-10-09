import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Sizes, BorderStyles, PaddingMargin, Fonts} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    messageContainer: {
      flex: 1,
      minHeight: '7%',
      maxHeight: Sizes.size200,
      marginBottom: Sizes.size10,
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 15,
    },
    inputContainer: {
      flex: 1,
      minHeight: '20%',
      maxHeight: Sizes.size70,
      paddingHorizontal: Sizes.size12,
      paddingVertical: deviceInfo.ios ? Sizes.size12 : null,
      backgroundColor: '#F3F3F3',
      borderRadius: Sizes.size12,
      justifyContent: 'center',
    },
    input: {
      fontFamily: Fonts.regular,
      fontSize: Sizes.size14,
      fontWeight: '400',
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
    },
    sendButtonContainer: {
      marginLeft: Sizes.size11,
    },
    sendButton: {
      width: Sizes.size30,
      height: Sizes.size30,
      alignItems: 'center',
      justifyContent: 'center',
    },
    removeIconContainer: {
      flexDirection: 'row',
      padding: Sizes.size10,
      borderTopColor: theme?.color?.BORDER_THIN_COLOR,
      borderTopWidth: 0.5,
    },
    spamRbsHeetContainer: {
      paddingHorizontal: Sizes.size10,
      paddingBottom: Sizes.size10,
    },
    spamTitle: {
      alignSelf: 'center',
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
      fontSize: Sizes.size20,
      marginBottom: Sizes.size11,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    greyText: {
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
      fontSize: Sizes.size14,
      alignSelf: 'center',
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
    underLine: {
      width: '95%',
      paddingHorizontal: Sizes.size12,
      borderBottomWidth: Sizes.size1,
      borderBottomColor: '#E3E3E3',
      marginTop: Sizes.size10,
      marginBottom: Sizes.size10,
    },
  });
};
export {styles};
