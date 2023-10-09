import React from 'react';
import {Picker} from 'react-native';
import {styles} from './styles';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
const SelectBox = ({selectedValue, onValueChange, items, label}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {container} = styles(theme);
  const {t} = useTranslation();

  return (
    <Picker
      selectedValue={selectedValue}
      style={container}
      onValueChange={onValueChange}>
      <Picker.item
        label={t(`label.${label}`)}
        value=""
        enabled="false"
        color="#aaaaaa"
      />

      {items.map((item, index) => (
        <Picker.Item
          key={index.toString()}
          label={item.label}
          value={item.value}
          color="#aaaaaa"
        />
      ))}
    </Picker>
  );
};

export {SelectBox};
