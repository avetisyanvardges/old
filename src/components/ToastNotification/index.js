import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';
const ToastNotification = ({notification}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {container, toastTextStyle, title, body} = styles(theme);
  return (
    <TouchableOpacity style={[container]} onPress={notification?.onPress}>
      <Text style={[toastTextStyle, title]}>
        {notification?.notification?.title}{' '}
      </Text>
      <Text style={[toastTextStyle, body]}>
        {notification?.notification?.body}{' '}
      </Text>
    </TouchableOpacity>
  );
};

export {ToastNotification};
