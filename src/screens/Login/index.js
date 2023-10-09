import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  ScreenLoader,
  FloatingTitleInput,
  LineGradientButton,
} from '../../components';
import {connect} from 'react-redux';
import {
  SET_LOGIN_SCREEN_LOADER_VISIBLE,
  LOGIN,
  GET_USER_INFORMATION,
  SOCIAL_LOGIN,
  GET_NOTIFICATIONS_REQUEST,
  CHANGE_SETTINGS_REQUEST,
  GET_FIREBASE_TOKEN,
} from '../../actionsTypes';
import {makeAction} from '../../makeAction';
import {styles} from './styles';
import {Sizes, IconsSizes, PaddingMargin} from '../../assets/styles';
import {
  CheckWithoutBorder,
  ClosedEye,
  Eye,
  MaplloText,
} from '../../components/Icons';
import FacebookLogin from '../../components/FacebookLogin';
import GoogleLogin from '../../screens/GoogleLogin';
import VkLogin from '../VkLogin';
import Translation from '../../Translation';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import {deviceInfo} from '../../assets/deviceInfo';
import SocketClient from '../../services/SocketClient';
import NavigationService from '../../NavigationService';
import i18n from '../../assets/i18next';
import {withNavigationFocus} from 'react-navigation';
import InAppReview from 'react-native-in-app-review';
import {ApiUrl} from '../../assets/constants';

const languages = [
  {label: 'ENG', value: 'en'},
  {label: 'RU', value: 'ru'},
];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordShow: false,
      check: false,
      activeLanguage: '',
    };
  }

  async componentDidMount() {
    this.detectLanguage();

    await AsyncStorage.getItem('token').then(async (token) => {
      if (token) {
        const data = {
          callBack: (response) => {
            const {data} = response;
            this.props.makeAction(GET_NOTIFICATIONS_REQUEST);
            AsyncStorage.getItem('loginCount').then((count) => {
              if (count) {
                if (count == 10) {
                  if (InAppReview.isAvailable()) {
                    InAppReview.RequestInAppReview();
                    AsyncStorage.setItem('loginCount', JSON.stringify(1));
                  }
                } else {
                  const parseCount = JSON.parse(count) + 1;
                  AsyncStorage.setItem(
                    'loginCount',
                    JSON.stringify(parseCount),
                  );
                }
              } else {
                AsyncStorage.setItem('loginCount', JSON.stringify(1));
              }
            });
          },
        };
        await this.props.makeAction(GET_USER_INFORMATION, data);
        await this.props.makeAction(GET_FIREBASE_TOKEN);
        await SocketClient.setup();
        NavigationService.navigate('Menu');
      } else {
        this.props.makeAction(SET_LOGIN_SCREEN_LOADER_VISIBLE, false);
      }
    });

    this.willBlurSub = this.props.navigation.addListener('willBlur', () => {
      this.setState({
        username: '',
        password: '',
        passwordShow: false,
      });
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.detectLanguage();
    }
  }

  handelChange = (text, keyName) => {
    this.setState({[keyName]: text});
  };

  detectLanguage = async () => {
    await AsyncStorage.getItem('language').then(async (language) => {
      this.setState({activeLanguage: language || 'ru'});
    });
  };

  validateEmail = (text, keyName) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      this.setState({username: text, check: false});
      return false;
    } else {
      this.setState({[keyName]: text, check: true});
    }
  };

  onAppleButtonPress = async () => {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    if (appleAuthRequestResponse.identityToken) {
      this.props.makeAction(SET_LOGIN_SCREEN_LOADER_VISIBLE, true);
      this.props.makeAction(SOCIAL_LOGIN, {
        first_name: appleAuthRequestResponse.fullName.givenName?.trim(),
        last_name: appleAuthRequestResponse.fullName.familyName?.trim(),
        username: appleAuthRequestResponse.fullName.nickname?.trim(),
        email: appleAuthRequestResponse.email,
        id: appleAuthRequestResponse.user,
        picture: null,
      });
    }
  };

  login = () => {
    const {username, password} = this.state;
    this.props.makeAction(SET_LOGIN_SCREEN_LOADER_VISIBLE, true);
    this.props.makeAction(LOGIN, {username: username, password: password});
  };
  disabledLoginButton = () => {
    const {username, password} = this.state;
    return !username || !password;
  };

  changeLanguage = (value) => {
    i18n.changeLanguage(value);
    AsyncStorage.setItem('language', value);
    this.setState({activeLanguage: value});
  };

  render() {
    const {navigation, theme} = this.props;
    const {PRIMARY_COLOR} = theme.color;
    const {
      container,
      contentContainer,
      orTextContent,
      formContainer,
      loginText,
      buttonContainer,
      inputContainer,
      createAccountText,
      createAccountContent,
      forgotPasswordText,
      forgotPasswordContainer,
      createNewText,
      socialLogin,
      lines,
      scrollViewBackground,
      imageContainer,
      orText,
      languageContainer,
      languageContainerItem,
      languageContainerItemText,
    } = styles(theme);
    const {screenLoaderVisible} = this.props.screenData;
    const {
      username,
      password,
      passwordShow,
      check,
      activeLanguage,
    } = this.state;
    const {deviceHeight} = deviceInfo;
    return screenLoaderVisible ? (
      <ScreenLoader splashScreen={true} />
    ) : (
      <KeyboardAvoidingView behavior={deviceInfo.ios ? 'padding' : null}>
        <ScrollView style={scrollViewBackground}>
          <View style={container}>
            <View
              style={{
                width: '100%',
                height:
                  deviceHeight < 570
                    ? Sizes.size130
                    : deviceHeight < 668 || deviceHeight < 737
                    ? Sizes.size180
                    : Sizes.size215,
              }}>
              <ImageBackground
                resizeMode="cover"
                style={{flex: 1}}
                source={require('../../assets/images/LoginGradient.png')}>
                <View style={imageContainer}>
                  <MaplloText
                    IconWidth={deviceHeight < 570 ? Sizes.size160 : null}
                    deviceHeight={deviceHeight < 570 ? Sizes.size30 : null}
                  />
                </View>
              </ImageBackground>
            </View>
            <View style={contentContainer}>
              <View style={formContainer}>
                <View
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
                  }}>
                  <View style={languageContainer}>
                    {languages.map((elem, index) => {
                      return (
                        <TouchableOpacity
                          key={index.toString()}
                          onPress={() => this.changeLanguage(elem.value)}
                          style={languageContainerItem}>
                          <Text
                            style={[
                              languageContainerItemText,
                              {
                                color:
                                  activeLanguage === elem.value
                                    ? '#A347FF'
                                    : '#818195',
                              },
                            ]}>
                            {elem.label}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <Text style={loginText}>
                    <Translation label={'texts.Login'} />
                  </Text>
                  <View style={inputContainer}>
                    <FloatingTitleInput
                      maxLength={40}
                      keyboardType={'email-address'}
                      onChangeText={(text) => {
                        this.validateEmail(text, 'username');
                      }}
                      value={username}
                      placeholder={'email'}
                    />
                    {check ? (
                      <CheckWithoutBorder
                        style={{paddingHorizontal: 10}}
                        IconWidth={IconsSizes.small}
                        IconHeight={IconsSizes.small}
                        IconColor={PRIMARY_COLOR}
                      />
                    ) : null}
                  </View>

                  <View style={inputContainer}>
                    <FloatingTitleInput
                      maxLength={40}
                      secureTextEntry={!passwordShow}
                      onChangeText={(text) => {
                        this.handelChange(text, 'password');
                      }}
                      value={password}
                      returnKeyType={'done'}
                      placeholder={'password'}
                    />
                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({passwordShow: !passwordShow});
                        }}>
                        {passwordShow ? (
                          <Eye
                            IconWidth={24}
                            IconHeight={24}
                            IconColor={'#818195'}
                          />
                        ) : (
                          <ClosedEye
                            IconWidth={24}
                            IconHeight={24}
                            IconColor={'#818195'}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={buttonContainer}>
                    <View style={{width: '100%'}}>
                      <LineGradientButton
                        disabled={this.disabledLoginButton()}
                        onPress={this.login}
                        title={<Translation label={'buttons.signIn'} />}
                      />
                    </View>
                  </View>

                  <TouchableOpacity
                    style={forgotPasswordContainer}
                    onPress={() => {
                      navigation.navigate('ForgotPassword');
                    }}>
                    <Text style={forgotPasswordText}>
                      <Translation label={'texts.forgotPassword'} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: Sizes.size15,
                  flex: 1,
                }}>
                <View style={orTextContent}>
                  <View style={lines} />
                  <Text style={orText}>
                    <Translation label={'texts.or'} />
                  </Text>
                  <View style={lines} />
                </View>
                {deviceInfo.ios && (
                  <View
                    style={{
                      marginVertical: Sizes.size15,
                    }}>
                    <AppleButton
                      buttonStyle={AppleButton.Style.BLACK}
                      buttonType={AppleButton.Type.SIGN_IN}
                      style={{
                        width: '100%', // You must specify a width
                        height: Sizes.size45, // You must specify a height
                      }}
                      onPress={() => this.onAppleButtonPress()}
                    />
                  </View>
                )}
                <GoogleLogin />
                <View style={socialLogin}>
                  <FacebookLogin />
                  <VkLogin />
                </View>
                <View style={createAccountContent}>
                  <Text style={createAccountText}>
                    <Translation label={'texts.dontHaveAnAccount'} />
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SignUp');
                    }}>
                    <Text style={createNewText}>
                      <Translation label={'texts.createNew'} />{' '}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.loginScreenData,
    netInfo: store.netInfo,
    theme: store.themes.theme,
    profile: store.profileData.profile,
    settings: store.profileData.settings,
    eventUrl: store.eventScreenLoader.eventUrl,
  };
};
export default connect(mapStateToProps, {makeAction})(
  withNavigationFocus(Login),
);
