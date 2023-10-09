import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';

const Bullets = ({active, length}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {bulletButton, activeBullet, bullet, container} = styles(theme);
  let elements = [];
  for (let i = 1; i <= length; i++) {
    elements.push(
      <View key={i} style={bulletButton}>
        <View style={[bullet, active === i ? activeBullet : null]} />
      </View>,
    );
  }

  return length > 1 ? <View style={container}>{elements}</View> : null;
};

export {Bullets};
