import {StyleSheet} from 'react-native';

const styles = (theme) => {
  return StyleSheet.create({
    avatarImage: {
      borderColor: theme?.color.MAP_USER_BORDER,
    },
  });
};

export {styles};
