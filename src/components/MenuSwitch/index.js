import React from 'react';
import {View, Text, Switch} from 'react-native';
import i18n from '../../assets/i18next';
import {styles} from './styles';

const MenuSwitch = ({
  title,
  titleColor,
  falseColor,
  trueColor,
  thumbColor,
  value,
  onValueChange,
  disabled,
}) => {
  const {text, container, linkRightContainer, textContainer} = styles();
  return (
    <View style={container}>
      <View style={textContainer}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[text, {color: titleColor ? titleColor : '#2C2C2C'}]}>
          {i18n.t(title)}
        </Text>
      </View>
      <View style={linkRightContainer}>
        <Switch
          style={{opacity: disabled ? 0.5 : 1}}
          disabled={disabled}
          trackColor={{false: falseColor, true: trueColor}}
          thumbColor={thumbColor}
          value={value}
          onValueChange={onValueChange}
        />
      </View>
    </View>
  );
};

export {MenuSwitch};
