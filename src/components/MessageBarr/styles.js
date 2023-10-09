import {Platform, StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Fonts, Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingTop: Sizes.size11,
      paddingRight: Sizes.size16,
      paddingLeft: Sizes.size10,
      marginTop: Sizes.size7,
      marginBottom: deviceInfo.ios ? Sizes.size20 : 0,
    },
    messageContainer: {
      flex: 1,
      minHeight: '5%',
      maxHeight: Sizes.size200,
      marginBottom: Sizes.size10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    sendButtonContainer: {
      marginLeft: Sizes.size11,
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
      color: theme.color.PRIMARY_COLOR_LIGHT,
    },
    messageRightIcons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    rightIcon: {
      marginHorizontal: Sizes.size13,
    },
    callLoaderContainer: {
      width: Sizes.size40,
      height: Sizes.size38,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButton: {
      width: Sizes.size30,
      height: Sizes.size30,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
};
export {styles};
