import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  Linking,
  BackHandler,
} from 'react-native';
import {styles} from './styles';
import {Sizes} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';
import i18n from '../../assets/i18next';
import {LineGradientButton} from '../../components/LineGradientButton';
import SocketClient from '../../services/SocketClient';
import {SvgXml} from 'react-native-svg';
import update from '../../assets/images/svgIcons/update.svg';
import MapploDone from '../../assets/images/svgIcons/Mapllodone.svg';
import download from '../../assets/images/svgIcons/download.svg';

const AppVersion = () => {
  const [link, setLink] = useState();
  useEffect(() => {
    if (deviceInfo.ios) {
      setLink('https://apps.apple.com/us/app/mapllo/id1579691867');
    } else {
      setLink('market://details?id=com.production.mapllo');
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () =>
      BackHandler.exitApp(),
    );
    return () => backHandler.remove();
  }, []);

  const {
    container,
    updateTitle,
    updateDescription,
    updateTextContainer,
    imageContainer,
    updateButton,
    sendButtonText,
  } = styles();
  return (
    <ImageBackground
      resizeMode="cover"
      style={container}
      source={require('../../assets/images/AppVersionBG.png')}>
      <View style={imageContainer}>
        <SvgXml xml={update} width={200} height={350} />
        <View
          style={{
            position: 'absolute',
            marginTop: Sizes.size130,
          }}>
          <View
            style={{
              width: Sizes.size200,
              height: Sizes.size350,
              alignItems: 'center',
            }}>
            <SvgXml xml={MapploDone} />
            <View
              style={{flex: 1, alignItems: 'center', marginTop: Sizes.size55}}>
              <SvgXml xml={download} />
            </View>
          </View>
        </View>
      </View>
      <View style={updateTextContainer}>
        <Text style={updateTitle}>Обновите приложение</Text>
        <Text style={updateDescription}>
          Мы прекрашаем поддержку этой версии приложения.Для продалжения
          обновите приложения в {deviceInfo.ios ? 'App Store' : 'Google Play'}
        </Text>
      </View>
      <View style={updateButton}>
        <LineGradientButton
          title={i18n.t('buttons.update')}
          paddingHorizontal={0.01}
          paddingVertical={0.01}
          marginTop={0.01}
          onPress={() => {
            Linking.openURL(link);
          }}
          testStyle={sendButtonText}
          customStyle={{
            width: '100%',
            paddingVertical: Sizes.size12,
          }}
        />
      </View>
    </ImageBackground>
  );
};

export {AppVersion};
