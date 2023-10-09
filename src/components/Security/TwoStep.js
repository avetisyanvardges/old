import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import Translation from '../../Translation';
import {Colors, Sizes} from '../../assets/styles';
import {MenuRadio} from '../MenuRadio';
import {styles} from './styles';
import {Email, Sms} from '../Icons';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from '../../assets/i18next';
import {LineGradientButton} from '..';
import NavigationService from '../../NavigationService';
const TwoStep = () => {
  const [selected, setSelected] = useState();
  const [activeRadio, setActiveRadio] = useState();
  const steps = [
    {
      title: 'security.twoStep.sms',
      description: 'security.twoStep.smsDescription',
      icon: (
        <Sms
          IconColor={Colors.silver}
          IconHeigth={Sizes.size21}
          IconWidth={Sizes.size21}
        />
      ),
      tintColors: Colors.blueViolet,
    },
    {
      title: 'security.twoStep.email',
      description: 'security.twoStep.emailDescription',
      icon: (
        <Email
          IconColor={Colors.silver}
          IconHeigth={Sizes.size21}
          IconWidth={Sizes.size21}
        />
      ),
      tintColors: Colors.blueViolet,
    },
  ];
  useEffect(() => {
    getStep();
  }, []);

  const getStep = async () => {
    const stepTitle = await AsyncStorage.getItem('@twoStep');
    const parseTitle = JSON.parse(stepTitle);
    setSelected(parseTitle);
  };

  const saveStep = () => {
    const stringify = JSON.stringify(activeRadio.title);
    AsyncStorage.setItem('@twoStep', stringify);
    setSelected(activeRadio.title);
  };

  const {
    underLine,
    content,
    protectTitle,
    protectDesc,
    confirmTitle,
    radioContainer,
  } = styles();
  const renderItem = ({item}) => {
    const value = selected === item.title;
    return (
      <View style={radioContainer}>
        <MenuRadio
          title={item.title}
          description={item.description}
          icon={item.icon}
          tintColors={item.tintColors}
          value={value}
          onPress={() => {
            setActiveRadio(item);
            setSelected(item.title);
          }}
          change={() => {
            setActiveRadio(item);
            setSelected(item.title);
          }}
        />
      </View>
    );
  };
  return (
    <View style={content}>
      <Translation
        style={protectTitle}
        label={'security.twoStep.protectYourAccount'}
      />
      <Translation
        style={protectDesc}
        label={'security.twoStep.protectDescription'}
      />
      <View style={underLine} />
      <Translation
        style={confirmTitle}
        label={'security.twoStep.confirm_code_title'}
      />
      <FlatList
        data={steps}
        renderItem={renderItem}
        ListFooterComponent={
          <LineGradientButton
            marginTop={Sizes.size54}
            title={i18n.t('texts.acceptSecurity')}
            onPress={() => {
              saveStep();
              NavigationService.back();
            }}
          />
        }
      />
    </View>
  );
};

export default TwoStep;
