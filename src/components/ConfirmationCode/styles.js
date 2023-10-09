import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';
import {Sizes} from '../../assets/styles';

export default StyleSheet.create({
  root: {paddingHorizontal: 20, paddingBottom: Sizes.size12},
  title: {textAlign: 'center', fontSize: 30},
  cellContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizes.size68,
    height: Sizes.size60,
    borderRadius: Sizes.size12,
    backgroundColor: '#F3F3F3',
  },
  cell: {
    flex: 1,
    fontSize: Sizes.size20,
    textAlign: 'center',
    fontWeight: deviceInfo.ios ? '500' : 'bold',
  },
  focusCell: {
    borderColor: '#A347FF',
    borderWidth: 1,
  },
});
