import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Sizes} from '../../assets/styles';
import {ArrowRight} from '../Icons';
import {styles} from './styles';
import NavigationService from '../../NavigationService';
import {Colors} from '../../assets/styles';
import i18n from '../../assets/i18next';

const MenuLink = ({
  title,
  titleColor,
  navigate,
  showCircle,
  linkState,
  query,
  onPress,
}) => {
  const {
    circle,
    text,
    container,
    titleContainer,
    linkRightContainer,
    linkRightIcon,
    linkStateContainer,
    linkStateText,
  } = styles();
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
        NavigationService.navigate(navigate, {query});
      }}
      activeOpacity={0.7}
      style={container}>
      <View style={titleContainer}>
        {showCircle ? <View style={circle} /> : null}
        <Text
          style={[text, {color: titleColor ? titleColor : '#2C2C2C'}]}
          numberOfLines={1}
          ellipsizeMode="tail">
          {i18n.t(title)}
        </Text>
      </View>
      <View style={linkRightContainer}>
        {linkState ? (
          <View style={linkStateContainer}>
            <Text style={linkStateText} numberOfLines={1} ellipsizeMode="tail">
              {i18n.t(linkState)}
            </Text>
          </View>
        ) : null}
        <View style={linkRightIcon}>
          <ArrowRight
            IconWidth={Sizes.size16}
            IconHeight={Sizes.size16}
            IconColor={Colors.silver}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {MenuLink};
