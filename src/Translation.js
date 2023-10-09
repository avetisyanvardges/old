import React from 'react';
import {Text} from 'react-native';
import {useTranslation} from 'react-i18next';

const Translation = ({label, style}) => {
  const {t} = useTranslation();
  const capitalize = (tr) => {
    return tr.charAt(0).toUpperCase() + tr.slice(1);
  };
  return (
    <Text style={style} numberOfLines={1} ellipsizeMode={'tail'}>
      {capitalize(t(label))}
    </Text>
  );
};

export default Translation;
