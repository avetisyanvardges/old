import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {IconsStyles, Sizes} from '../../assets/styles';
import {useSelector} from 'react-redux';
import {Search} from '../Icons';
import Translation from '../../Translation';
const ChatSearchButton = ({press}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {iconsContent, searchInputContainer} = styles(theme);
  const {PRIMARY_COLOR_BOLD} = theme.color;
  return (
    <View style={{backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR}}>
      <TouchableOpacity
        onPress={() => {
          if (press) {
            press();
          }
        }}
        style={searchInputContainer}>
        <TouchableOpacity style={iconsContent}>
          <Search
            IconWidth={IconsStyles.medium}
            IconHeight={IconsStyles.medium}
            IconColor={PRIMARY_COLOR_BOLD}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: Sizes.size15,
            color: theme?.PRIMARY_TEXT_COLOR,
          }}>
          <Translation label={'inputs.placeholder.search'} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export {ChatSearchButton};
