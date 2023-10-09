import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Sizes, Colors} from '../../assets/styles';
import {styles} from './styles';
import NavigationService from '../../NavigationService';
import i18n from '../../assets/i18next';
import {CustomRadioButton} from '../CustomRadioButton';
const MenuRadio = ({
  title,
  titleColor,
  change,
  value,
  tintColors,
  onPress,
  titleText,
  showActiveText,
  description,
  icon,
}) => {
  const {
    text,
    container,
    linkRightContainer,
    menuDescription,
    descContainer,
    iconContainer,
    titleContainer,
  } = styles();
  return (
    <>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={container}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View>
            <View style={titleContainer}>
              {icon ? <View style={iconContainer}>{icon}</View> : null}
              <Text
                style={[
                  text,
                  {
                    color: showActiveText
                      ? tintColors
                      : titleColor
                      ? titleColor
                      : Colors.charGreen,
                  },
                ]}>
                {titleText ? titleText : i18n.t(title)}
              </Text>
            </View>
            {description ? (
              <View style={descContainer}>
                <Text style={menuDescription}>{i18n.t(description)}</Text>
              </View>
            ) : null}
          </View>
        </View>
        <View style={linkRightContainer}>
          <CustomRadioButton
            width={Sizes.size15}
            height={Sizes.size15}
            change={change}
            tintColors={tintColors}
            value={value}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export {MenuRadio};
