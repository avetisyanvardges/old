import {StyleSheet} from 'react-native';
import {BorderStyles, Sizes} from '../../assets/styles';
const styles = (theme) => {
  return StyleSheet.create({
    pickerContainer: {
      flexDirection: 'row',
    },
    titleStyle: {
      marginLeft: Sizes.size10,
      fontSize: Sizes.size12,
      color: theme?.color?.SECONDARY_COLOR_LIGHT,
      marginBottom: Sizes.size10,
    },
    dateTextStyle: {
      color: theme?.color?.PRIMARY_COLOR_LIGHT,
      fontSize: Sizes.size14,
      marginLeft: Sizes.size10,
      paddingTop: Sizes.size5,
      paddingHorizontal: Sizes.size4,
      paddingBottom: 0,
      borderTopWidth: BorderStyles.widths.border3,
      borderBottomWidth: BorderStyles.widths.border3,
      borderColor: BorderStyles.theme?.color?.SECONDARY_COLOR_LIGHT,
    },
    cancelEndDateIconContainer: {
      marginLeft: Sizes.size4,
      marginBottom: Sizes.size2,
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });
};

export {styles};
