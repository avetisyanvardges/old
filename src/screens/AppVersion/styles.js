import {StyleSheet} from 'react-native';
import {Colors, Sizes} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    updateTextContainer: {
      width: '85%',
      marginVertical: Sizes.size25,
    },
    updateTitle: {
      textAlign: 'center',
      fontSize: Sizes.size24,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
      lineHeight: 29,

      color: Colors.charGreen,
    },
    updateDescription: {
      textAlign: 'center',
      fontSize: Sizes.size15,
      fontWeight: '400',
      lineHeight: 20,
      color: Colors.silver,
    },
    updateButton: {
      marginTop: Sizes.size50,
    },
    sendButtonText: {
      color: 'white',
      fontWeight: deviceInfo.ios ? '600' : 'bold',
      fontSize: Sizes.size18,
      lineHeight: 20,
    },
  });
};

export {styles};
