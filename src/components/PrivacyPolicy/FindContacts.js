import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import i18n from '../../assets/i18next';
import {Colors} from '../../assets/styles';
import {MenuSwitch} from '../MenuSwitch';
import {styles} from './style';

const FindContacts = ({info, asyncInfo}) => {
  const {description, descriptionText, deleteContainer, deleteText} = styles();
  const [value, setValue] = useState();

  const handlerSwichValue = (value) => {
    return value === 'all';
  };

  const SaveState = (find) => {
    if (find) {
      asyncInfo[info] = 'all';
    } else {
      asyncInfo[info] = 'none';
    }
    AsyncStorage.setItem('@privacy', JSON.stringify(asyncInfo));
    setValue(find);
  };
  return (
    <View>
      <MenuSwitch
        title="switch.sync"
        falseColor={Colors.silver}
        trueColor={Colors.blueViolet}
        thumbColor={Colors.white}
        value={handlerSwichValue(asyncInfo[info])}
        onValueChange={(res) => SaveState(res)}
      />
      <View style={description}>
        <Text style={descriptionText}>
          {i18n.t('privacy.findContacts.sync_desc')}
        </Text>
      </View>
      <TouchableOpacity style={deleteContainer}>
        <Text style={deleteText}>
          {i18n.t('privacy.findContacts.delete_title')}
        </Text>
      </TouchableOpacity>
      <View style={description}>
        <Text style={descriptionText}>
          {i18n.t('privacy.findContacts.delete_desc')}
        </Text>
      </View>
    </View>
  );
};

export {FindContacts};
