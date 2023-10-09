import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {styles} from './styles';
import {
  ArowLeftSwuare,
  Camera,
  ImageUpload,
  SendIcon,
  Voice,
} from '../../components/Icons';
import {useSelector} from 'react-redux';
import {Colors, Sizes} from '../../assets/styles';
import i18n from '../../assets/i18next';
import {deviceInfo} from '../../assets/deviceInfo';

const MessageBarr = ({value, onChange, inactiveSend, send, focused}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {
    container,
    messageContainer,
    sendButtonContainer,
    inputContainer,
    input,
    sendButton,
    messageRightIcons,
    rightIcon,
  } = styles(theme);
  const {PRIMARY_COLOR_LIGHT} = theme.color;
  const [isFocus, setisFocus] = useState(false);
  const myTextInputRef = useRef();

  useEffect(() => {
    if (focused) {
      myTextInputRef.current.focus();
    }
  }, [focused]);

  const changeText = (text) => {
    if (text.length > 500) {
      Alert.alert(
        'Your message is too long',
        'The body of your message is too long \nto send. Please shorten your \nmessage and try again.',
      );
      text = text.slice(0, 500);
    }
    onChange(text);
  };

  return (
    <View
      style={[
        container,
        isFocus && deviceInfo.deviceHeight > 670
          ? {paddingBottom: Sizes.size30}
          : null,
      ]}>
      <View style={messageContainer}>
        <View style={inputContainer}>
          {/* <View style={{ width: Sizes.size30 }}>
              <Camera
                iconWidth={Sizes.size28}
                iconHeight={Sizes.size25}
                iconColor={Colors.blueViolet}
              />
            </View> */}
          <TextInput
            ref={myTextInputRef}
            style={[input]}
            placeholder={i18n.t('inputs.placeholder.sendMessage')}
            value={value}
            onChangeText={(text) => changeText(text)}
            placeholderTextColor={PRIMARY_COLOR_LIGHT}
            multiline={true}
            onFocus={() => {
              setisFocus(true);
            }}
            onBlur={() => {
              setisFocus(false);
            }}
          />

          {/* <View style={messageRightIcons}>

              {value ? (

              ) : (
                null
                <>
                  <View style={rightIcon}>
                    <ImageUpload
                      iconWidth={Sizes.size23}
                      iconHeight={Sizes.size23}
                      iconColor={Colors.silver}
                    />
                  </View>
                  <View>
                    <Voice
                      IconWidth={Sizes.size20}
                      IconHeight={Sizes.size25}
                      IconColor={Colors.silver}
                    />
                  </View>
                </>
              )}
            </View> */}
        </View>
        <View style={sendButtonContainer}>
          <TouchableOpacity
            style={[sendButton, inactiveSend ? {opacity: 0.7} : {}]}
            disabled={inactiveSend}
            onPress={() => {
              send();
            }}>
            <ArowLeftSwuare
              IconWidth={Sizes.size30}
              IconHeight={Sizes.size30}
              IconColor={Colors.blueViolet}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export {MessageBarr};
