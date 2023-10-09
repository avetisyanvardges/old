import {StyleSheet} from 'react-native';
import {Sizes} from '../../assets/styles';

const styles = (theme) => {
  return StyleSheet.create({
    dateTimeText: {
      fontSize: Sizes.size12,
      alignSelf: 'flex-start',
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
    },
    sliderSelectContainer: {
      marginTop: Sizes.size20,
    },
    membersLimitContainer: {
      marginTop: Sizes.size15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    filterModalContainer: {
      borderColor: '#E3E3E3',
      borderWidth: 1,
      borderRadius: Sizes.size20,
    },
    filterModalContainerItem: {
      paddingVertical: Sizes.size20,
      paddingHorizontal: Sizes.size20,
    },
    otherInput: {
      paddingHorizontal: Sizes.size15,
      paddingVertical: Sizes.size4,
      backgroundColor: '#F3F3F4',
      width: '100%',
      color: '#2C2C2C',
      borderRadius: 5,
      fontSize: Sizes.size12,
    },
    typesLabelContainer: {
      fontSize: Sizes.size12,
      marginLeft: Sizes.size8,
      color: theme?.color?.PRIMARY_COLOR_BOLD,
    },
    typesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    linearContainer: {
      borderWidth: 0.5,
      borderColor: '#E3E3E3',
      paddingHorizontal: 6,
    },
    textInputsContainer: {
      flex: 1,
      paddingLeft: Sizes.size20,
      marginTop: 'auto',
    },
  });
};

export {styles};
