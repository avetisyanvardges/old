import {StyleSheet} from 'react-native';
import {deviceInfo} from '../../assets/deviceInfo';

export default StyleSheet.create({
  notificationContainer: {
    width: '100%',
    height: 75,
    borderRadius: 7,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.5,
    backgroundColor: '#ffffff',
  },
  notificationContent: {
    paddingHorizontal: 17,
    paddingVertical: 9,
    flexDirection: 'row',
  },
  notificationImageDefault: {
    width: 18,
    height: 22,
  },
  notificationImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  notificationImageContainer: {
    width: 49,
    height: 49,
    borderRadius: 50,
    marginRight: 18,
    borderColor: '#d9dee1',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationInfoContainer: {
    paddingRight: 60,
  },
  notificationBottomBorderContainer: {
    alignItems: 'center',
  },
  notificationBottomBorderItem: {
    width: 35,
    height: 2,
    backgroundColor: '#d9dee1',
    borderRadius: 1,
  },
  notificationInfoName: {
    color: '#3f4244',
    fontSize: 16,
    fontWeight: deviceInfo.ios ? '500' : 'bold',
    marginBottom: 4,
  },
  notificationInfoMessage: {
    color: '#848a91',
    fontSize: 13,
  },
  customView: {
    width: '100%',
  },
  customViewAndroid: {
    width: '100%',
  },
});
