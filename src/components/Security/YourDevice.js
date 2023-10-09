import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../assets/i18next';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from './styles';
import moment from 'moment';
import 'moment/locale/en-au';
import 'moment/locale/ru';

const YourDevice = () => {
  const [devices, setDevices] = useState([]);
  const lng = useSelector(
    (state) => state.profileData.settings.language || 'en',
  );
  const theme = useSelector((state) => state.themes.theme);
  useEffect(() => {
    getDeviceItem();
  }, []);

  const {
    content,
    signedDevices,
    phoneModel,
    phoneOs,
    devicesInfo,
    phoneCurrent,
  } = styles(theme);
  const getDeviceItem = async () => {
    const data = await AsyncStorage.getItem('@yourDevice');
    const parse = data ? JSON.parse(data) : [];
    setDevices(() => parse);
  };

  const formatDate = (date, language) => {
    let loc = language === 'en' ? 'en-au' : 'ru';
    moment.locale(loc);
    let loginDate = moment(new Date(date));
    const year = loginDate.format('MMM DD, YYYY');
    const hour = loginDate.format('HH:mm');
    if (language === 'ru') {
      return `${year} в ${hour}`;
    }
    return `${year} at ${hour}`;
  };

  const _renderItem = ({item}) => {
    if (item.currentUser) {
      return (
        <View style={devicesInfo}>
          <View style={{flexDirection: 'row'}}>
            <Text style={phoneModel}>{item?.deviceName}</Text>
            <Text style={phoneCurrent}>{i18n.t('texts.currentDevice')}</Text>
          </View>
          <Text style={phoneOs}>{formatDate(item?.loginDate, lng)}</Text>
        </View>
      );
    } else {
      return (
        <View style={devicesInfo}>
          <Text style={phoneModel}>{item?.deviceName}</Text>
          <Text style={phoneOs}>{formatDate(item?.loginDate, lng)}</Text>
        </View>
      );
    }
  };

  const _listHeaderComponent = () => {
    return (
      <Text style={signedDevices}>
        {i18n.t('security.yourDevice.where_you_logged_in')}
      </Text>
    );
  };

  return (
    <View style={content}>
      {devices?.length ? (
        <FlatList
          data={devices}
          ListHeaderComponent={_listHeaderComponent}
          renderItem={_renderItem}
          keyExtractor={(item) => item?._id?.toString()}
        />
      ) : (
        <Text style={signedDevices}>
          {i18n.t('security.yourDevice.no_device_list')}
        </Text>
      )}
    </View>
  );
};

export default YourDevice;
