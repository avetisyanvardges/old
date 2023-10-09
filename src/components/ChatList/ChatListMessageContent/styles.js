import {StyleSheet} from 'react-native';
import {Sizes} from '../../../assets/styles';
const styles = (theme) => {
  return StyleSheet.create({
    screen: {
      flex: 1,
    },
    userContainer: {
      marginLeft: 'auto',
      paddingTop: Sizes.size6,
    },
    senderContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Sizes.size16,
      marginTop: Sizes.size6,
    },
    senderContainerItem: {
      borderRadius: 10,
    },
    messageContentContainer: {
      borderRadius: 10,
      flexDirection: 'row',
      maxWidth: Sizes.size238,
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
    },
    message: {
      padding: Sizes.size10,
      fontSize: Sizes.size14,
      color: theme.color.PRIMARY_COLOR_LIGHT,
    },
    dataContainer: {
      paddingBottom: Sizes.size5,
      paddingRight: Sizes.size5,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    data: {
      textAlign: 'center',
      fontSize: Sizes.size8,
      marginLeft: 'auto',
    },
    messageContainerError: {
      borderWidth: 1,
      borderColor: theme.color.PRIMARY_FOREGROUND_COLOR,
      opacity: 0.7,
      backgroundColor: theme.color.SEARCH_INPUT_COLOR,
    },
    errorIcon: {
      width: Sizes.size32,
      height: Sizes.size32,
    },
  });
};

export {styles};
