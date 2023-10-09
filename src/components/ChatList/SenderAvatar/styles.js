import {StyleSheet} from 'react-native';
import {Sizes} from '../../../assets/styles';

export default StyleSheet.create({
  userImageContainer: {
    width: Sizes.size30,
    height: Sizes.size30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    borderColor: '#caced1',
    borderWidth: 1,
    marginRight: Sizes.size9,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});
