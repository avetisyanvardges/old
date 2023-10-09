import React from 'react';
import Slider from 'react-native-slider';
import {styles} from './styles';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
const SliderSelect = ({
  sliderValue,
  onValueChange,
  step,
  maximumValue,
  sliderText,
  thumbTintColor,
  minimumTrackTintColor,
  maximumTrackTintColor,
  inclement,
}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {
    container,
    content,
    sliderTextStyle,
    showValueStyle,
    textContainer,
  } = styles(theme);
  const {t} = useTranslation();
  return (
    <View style={container}>
      <View style={textContainer}>
        <Text style={sliderTextStyle}>{t(`sliderText.${sliderText}`)}</Text>
        <Text style={showValueStyle}>
          {sliderValue}
          {inclement || null}
        </Text>
      </View>

      <Slider
        style={content}
        value={sliderValue}
        sliderValue={sliderValue}
        onValueChange={onValueChange}
        maximumValue={maximumValue}
        step={step}
        thumbTintColor={thumbTintColor}
        minimumTrackTintColor={minimumTrackTintColor}
        maximumTrackTintColor={maximumTrackTintColor}
      />
    </View>
  );
};

export {SliderSelect};
