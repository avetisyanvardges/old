import React from 'react';
import {Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Sizes} from '../../assets/styles';
import {styles} from './styles';
import {useSelector} from 'react-redux';

const LineGradientButton = ({
  onPress,
  title,
  rightIcon,
  disabled,
  paddingHorizontal,
  paddingVertical,
  marginTop,
  customStyle,
  bRadius,
  testStyle,
}) => {
  const {gradientStyle, gradientText} = styles();
  const theme = useSelector((state) => state.themes.theme);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      style={{opacity: disabled ? 0.8 : 1}}>
      <ImageBackground
        resizeMode="stretch"
        style={[
          gradientStyle,
          rightIcon
            ? {justifyContent: 'space-between'}
            : {justifyContent: 'center'},
          {
            paddingHorizontal: paddingHorizontal
              ? paddingHorizontal
              : Sizes.size16,
            paddingVertical: paddingVertical ? paddingVertical : Sizes.size10,
            overflow: 'hidden',
            marginTop: marginTop ? marginTop : 15,
            borderRadius: bRadius ? bRadius : Sizes.size12,
          },
          customStyle ? customStyle : {},
        ]}
        source={require('../../assets/images/GradioneBackground.png')}>
        <Text style={[gradientText, testStyle]}>{title}</Text>
        {rightIcon ? rightIcon : null}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export {LineGradientButton};
