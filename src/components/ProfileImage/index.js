import React from 'react';
import {Image} from 'react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';
const ProfileImage = ({imageUrl}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {imageStyle} = styles(theme);

  return <Image source={{uri: imageUrl}} style={imageStyle} />;
};

export {ProfileImage};
