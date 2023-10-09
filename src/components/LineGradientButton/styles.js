import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      // flexDirection:"row",
      // alignItems:"center",
      // justifyContent:"space-between",
    },
    circle: {
      width: Sizes.size5,
      height: Sizes.size5,
      borderRadius: 50,
      backgroundColor: '#2C2C2C',
      marginRight: Sizes.size8,
    },
    text: {
      fontSize: Sizes.size14,
    },
    gradientStyle: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    gradientText: {
      color: '#FFFFFF',
      fontSize: Sizes.size16,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
    },
  });
};

export {styles};
