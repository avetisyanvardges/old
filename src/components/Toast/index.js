import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';
const Toast = ({type, text}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {container, toastTextStyle} = styles(theme);
  return (
    <View style={[container, styles(theme)[type]]}>
      <Text style={toastTextStyle}>{text}</Text>
    </View>
  );
};

export {Toast};
