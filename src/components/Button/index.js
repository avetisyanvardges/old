import React from 'react';
import {TouchableOpacity, Text, ImageBackground} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import {useSelector} from 'react-redux';

const Button = ({type, size, title, onPress, disabled, radius}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {t} = useTranslation();
  const {container, textStyle, disabledStyle, appText, radius12} = styles(
    theme,
  );
  return (
    <ImageBackground
      style={[radius12, {}]}
      source={require('../../assets/images/LoginGradient.png')}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          container,
          styles(theme)[type],
          styles(theme)[size],
          disabled ? disabledStyle : {},
        ]}
        onPress={onPress}
        disabled={disabled}>
        <Text
          ellipsizeMode={'tail'}
          numberOfLines={1}
          style={[
            type === 'outLine' ? appText : textStyle,
            styles[`${size}FontSize`],
          ]}>
          {t(`buttons.${title}`)}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export {Button};
