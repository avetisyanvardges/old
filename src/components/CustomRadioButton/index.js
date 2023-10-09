import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {useSelector} from 'react-redux';
const CustomRadioButton = ({value, change, tintColors, width, height}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {customCheckboxContainer, RadioCircleItem} = styles(theme);
  const {SECONDARY_TEXT_COLOR} = theme;
  return (
    <TouchableOpacity
      style={[
        customCheckboxContainer,
        {
          height,
          width,
        },
      ]}
      underlayColor={SECONDARY_TEXT_COLOR}
      onPress={change}>
      {value ? (
        <View
          style={[
            RadioCircleItem,
            {backgroundColor: tintColors ? tintColors : ''},
          ]}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export {CustomRadioButton};
