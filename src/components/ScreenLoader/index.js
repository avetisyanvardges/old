import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {styles} from './styles';
import {IconsSizes} from '../../assets/styles';
import {useSelector} from 'react-redux';
const ScreenLoader = (props) => {
  const theme = useSelector((state) => state.themes.theme);
  const {container} = styles(theme, props?.splashScreen);
  const {LOADER_COLOR} = theme.color;
  return (
    <View style={container}>
      <ActivityIndicator size={IconsSizes.normal} color={LOADER_COLOR} />
    </View>
  );
};

export {ScreenLoader};
