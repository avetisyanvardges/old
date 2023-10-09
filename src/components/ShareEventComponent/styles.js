import {StyleSheet} from 'react-native';
import {Sizes, Shadow, Colors} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';

const styles = (theme) => {
  return StyleSheet.create({
    cardTitle: {
      color: theme.color.INPUT_DEFAULT_COLOR,
      fontSize: Sizes.size14,
      fontWeight: deviceInfo.ios ? '500' : 'bold',
      lineHeight: Sizes.size18,
    },
    cardDescription: {
      width: Sizes.size240,
      color: theme.color.INPUT_DEFAULT_COLOR,
      fontSize: Sizes.size11,
      fontWeight: '400',
      lineHeight: Sizes.size14,
      marginTop: Sizes.size3,
    },
    cardTitleContainer: {
      position: 'absolute',
      bottom: 0,
      zIndex: 999,
      width: '100%',
      backgroundColor: 'rgba(255, 255, 255,0.9)',
      borderRadius: Sizes.size20,
      height: Sizes.size90,
      paddingHorizontal: Sizes.size15,
    },
    contentFeedBack: {
      marginVertical: 5,
      width: '100%',
      height: '100%',
      minWidth: Sizes.size355,
      minHeight: Sizes.size800,
      ...Shadow,
    },
    flexCenter: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nameContainer: {
      fontSize: Sizes.size14,
      fontWeight: '400',
      lineHeight: Sizes.size17,
      width: '50%',
    },
    topbarContainer: {
      marginLeft: 10,
      alignItems: 'flex-start',
      width: '80%',
    },
    backgroundImage: {
      flex: 1,
      borderBottomRightRadius: Sizes.size20,
      borderBottomLeftRadius: Sizes.size20,
    },
    flex: {
      flex: 1,
    },
    joinText: {
      color: Colors.white,
      fontSize: Sizes.size12,
      fontWeight: '400',
      lineHeight: 14,
    },
  });
};

export {styles};
