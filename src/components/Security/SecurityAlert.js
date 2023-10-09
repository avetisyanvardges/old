import React, {useState} from 'react';
import {View, Text, Linking, TouchableOpacity} from 'react-native';
import i18n from '../../assets/i18next';
import {Sizes} from '../../assets/styles';
import {CheckedIcon} from '../Icons';
import {LineGradientButton} from '../../components';
import {styles} from './styles';
import NavigationService from '../../NavigationService';
import {useSelector} from 'react-redux';
const SecurityAlert = () => {
  const [event, setEvent] = useState({});
  const theme = useSelector((state) => state.themes.theme);
  const {
    container,
    noEventDetected,
    noEventDetectedText,
    button,
    questionContainer,
    question,
    contactUs,
  } = styles(theme);
  return (
    <View style={container}>
      {event ? (
        <View style={noEventDetected}>
          <CheckedIcon
            IconWidth={Sizes.size40}
            IconHeight={Sizes.size40}
            IconColor={'#A347FF'}
          />
          <Text style={noEventDetectedText}>
            {i18n.t('security.securityAlert.noEventDetected')}
          </Text>
        </View>
      ) : (
        <Text>Event</Text>
      )}
      <View style={button}>
        <LineGradientButton
          onPress={NavigationService.back}
          paddingHorizontal={Sizes.size130}
          title={i18n.t('buttons.done')}
        />
        <View style={questionContainer}>
          <Text style={question}>
            {i18n.t('security.securityAlert.haveAquestion')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://mapllo.com');
            }}>
            <Text style={contactUs}>
              {i18n.t('security.securityAlert.contactUs')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SecurityAlert;
