import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {styles} from './styles';
import {IconsStyles, Sizes} from '../../assets/styles';
import {useSelector} from 'react-redux';
import {Cancel, Search} from '../Icons';
import i18n from '../../assets/i18next';

const SearchInput = ({handelChange, resetInput}) => {
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    handelChange('');
  }, []);

  const theme = useSelector((state) => state.themes.theme);
  const {iconsContent, searchInputContainer, textInputStyle} = styles(theme);
  const {PRIMARY_COLOR_BOLD, PRIMARY_COLOR_LIGHT} = theme.color;

  const handelChangeText = async (text) => {
    setSearchText(text);
    handelChange(text);
  };

  return (
    <View style={{backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR}}>
      <View style={searchInputContainer}>
        <View style={iconsContent}>
          <Search
            IconWidth={IconsStyles.medium}
            IconHeight={IconsStyles.medium}
            IconColor={PRIMARY_COLOR_BOLD}
          />
        </View>

        <TextInput
          maxLength={40}
          placeholderTextColor={PRIMARY_COLOR_LIGHT}
          value={searchText}
          onChangeText={(text) => handelChangeText(text)}
          placeholder={i18n.t('inputs.placeholder.search')}
          style={textInputStyle}
        />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {searchText ? (
            <TouchableOpacity
              style={iconsContent}
              onPress={() => {
                resetInput();
                handelChangeText('');
              }}>
              <Cancel
                iconWidth={IconsStyles.small}
                iconHeight={IconsStyles.small}
                iconColor={PRIMARY_COLOR_BOLD}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export {SearchInput};
