import React, {useState} from 'react';
import {View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../assets/i18next';
import {Colors} from '../../assets/styles';
import {MenuSwitch} from '../MenuSwitch';
import {styles} from './style';

const NetworkStatus = ({info, asyncInfo}) => {
  const {description, descriptionText} = styles();
  const [value, setValue] = useState(true);

  const handlerSwichValue = (value) => {
    return value === 'show';
  };

  const SaveState = (find) => {
    if (find) {
      asyncInfo[info] = 'show';
    } else {
      asyncInfo[info] = 'off';
    }
    AsyncStorage.setItem('@privacy', JSON.stringify(asyncInfo));
    setValue(find);
  };

  return (
    <View>
      <MenuSwitch
        title="switch.show_network"
        falseColor={Colors.silver}
        trueColor={Colors.blueViolet}
        thumbColor={Colors.white}
        value={handlerSwichValue(asyncInfo[info])}
        onValueChange={(res) => SaveState(res)}
      />
      <View style={description}>
        <Text style={descriptionText}>
          {i18n.t('privacy.networkStatus.content')}
        </Text>
      </View>
    </View>
  );
};

export {NetworkStatus};
