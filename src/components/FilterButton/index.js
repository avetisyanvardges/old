import React from 'react';
import {TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {Filter} from '../Icons';
import {IconsSizes} from '../../assets/styles';
import {useSelector} from 'react-redux';
const FilterButton = () => {
  const theme = useSelector((state) => state.themes.theme);
  const {container} = styles(theme);
  const {SECONDARY_COLOR_LIGHT} = theme.color;

  return (
    <TouchableOpacity style={container}>
      <Filter
        IconColor={SECONDARY_COLOR_LIGHT}
        IconHeight={IconsSizes.normal}
        IconWidth={IconsSizes.normal}
      />
    </TouchableOpacity>
  );
};

export {FilterButton};
