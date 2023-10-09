import {StyleSheet} from 'react-native';

const styles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
    },
  });
};

export {styles};
