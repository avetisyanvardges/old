import {StyleSheet} from 'react-native';
import {Sizes, PaddingMargin} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    itemController: {
      marginVertical: Sizes.size5,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    actionBlock: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: Sizes.size5,
      alignSelf: 'center',
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    title: {
      fontSize: Sizes.size12,
      margin: Sizes.size2,
    },
    alertMessage: {
      paddingVertical: Sizes.size15,
      paddingHorizontal: Sizes.size10,
      textAlign: 'center',
      color: '#F56C6C',
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    deleteAll: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginHorizontal: PaddingMargin.screenPaddingHorizontal,
      marginTop: Sizes.size10,
      marginBottom: Sizes.size5,
    },
    modalContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    deleteHistory: {
      flexDirection: 'row',
      marginTop: Sizes.size10,
      paddingHorizontal: PaddingMargin.screenPaddingHorizontal,
    },
    deleteHistoryText: {
      fontSize: Sizes.size16,
      marginLeft: Sizes.size10,
    },
  });
};

export {styles};
