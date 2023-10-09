import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Linking,
  KeyboardAvoidingView,
  ImageBackground,
} from 'react-native';
import {IconsSizes, Sizes} from '../../assets/styles';
import {
  ScreenLoader,
  FloatingTitleInput,
  LineGradientButton,
} from '../../components';
import {connect} from 'react-redux';
import {
  SET_REGISTER_SCREEN_LOADER_VISIBLE,
  REGISTER,
  SET_TOAST_MASSAGE,
  HIDE_TOAST,
  GET_PRIVACY_FILES,
  GET_TERMS_FILES,
} from '../../actionsTypes';
import {makeAction} from '../../makeAction';
import {styles} from './styles';
import {
  CheckWithoutBorder,
  ClosedEye,
  Eye,
  MaplloText,
} from '../../components/Icons';
import i18n from '../../assets/i18next';
import Translation from '../../Translation';
import {deviceInfo} from '../../assets/deviceInfo';

class SignUp extends Component {
  state = {
    name: '',
    nickname: '',
    newImage: {},
    email: '',
    phone: '',
    picture: {},
    password: '',
    confirmPassword: '',
    passwordShow: false,
    confirmPasswordShow: false,
    selectedValue: null,
    checked: false,
  };

  componentDidMount() {
    this.props.makeAction(SET_REGISTER_SCREEN_LOADER_VISIBLE, false);
    this.props.makeAction(GET_PRIVACY_FILES);
    this.props.makeAction(GET_TERMS_FILES);
  }

  handelChange = (text, keyName) => {
    if (keyName === 'nickname') {
      if (!/^[A-Za-z0-9\-_@]*$/gi.test(text)) {
        return;
      }
    }

    this.setState({[keyName]: text});
  };

  disabletButton = () => {
    const {
      name,
      nickname,
      phone,
      password,
      confirmPassword,
      checked,
    } = this.state;
    return (
      !name ||
      !nickname ||
      !phone ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword ||
      !checked
    );
  };

  privacyPolicy = () => {
    const {checked} = this.state;
    this.setState({checked: !checked});
  };

  register = async () => {
    const {
      name,
      nickname,
      email,
      phone,
      password,
      confirmPassword,
    } = this.state;
    if (password && password.length < 6) {
      this.props.makeAction(HIDE_TOAST);
      this.props.makeAction(SET_TOAST_MASSAGE, {
        visible: true,
        type: 'error',
        text: i18n.t('alerts.passwordCharacters'),
      });
    } else if (password && !confirmPassword) {
      this.props.makeAction(HIDE_TOAST);
      this.props.makeAction(SET_TOAST_MASSAGE, {
        visible: true,
        type: 'error',
        text: i18n.t('alerts.confirmPasswordIsRequired'),
      });
    } else if (password !== confirmPassword) {
      this.props.makeAction(HIDE_TOAST);
      this.props.makeAction(SET_TOAST_MASSAGE, {
        visible: true,
        type: 'error',
        text: i18n.t('alerts.passwordDoesntMatch'),
      });
    } else {
      const formData = {
        name: name?.trim(),
        nickname: nickname?.trim(),
        email: email?.trim(),
        password: password,
        phone: phone,
      };
      this.props.makeAction(SET_REGISTER_SCREEN_LOADER_VISIBLE, true);
      this.props.makeAction(REGISTER, {
        formData: formData,
      });
    }
  };

  pickPrivacyFile = () => {
    const {privacyFile} = this.props.privacyFile;
    Linking.openURL(privacyFile);
  };

  pickTermsFile = () => {
    const {terms} = this.props.terms;
    Linking.openURL(terms);
  };

  render() {
    const {navigation, theme} = this.props;
    const {checked} = this.state;
    const {screenLoaderVisible} = this.props.screenData;
    const {
      name,
      nickname,
      email,
      phone,
      password,
      confirmPassword,
      passwordShow,
      confirmPasswordShow,
    } = this.state;
    const {
      container,
      contentContainer,
      formContainer,
      imageContainer,
      signUpText,
      inputStyles,
      buttonContainer,
      inputContainer,
      passwordInputStyles,
      signInTextStyle,
      createAccountContent,
      privacy,
      createAccountText,
      checkMark,
      agreeText,
      termsServices,
      privacyPolicy,
      privacyText,
    } = styles(theme);
    const {deviceHeight} = deviceInfo;
    return (
      <>
        {screenLoaderVisible ? <ScreenLoader /> : null}
        <KeyboardAvoidingView behavior={deviceInfo.ios ? 'padding' : null}>
          <ScrollView>
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
                  <Text style={signUpText}>
                    <Translation label={'texts.signUp'} />
                  </Text>
                  <View style={inputContainer}>
                    <FloatingTitleInput
                      maxLength={40}
                      onChangeText={(text) => {
                        this.handelChange(text, 'name');
                      }}
                      value={name}
                      returnKeyType={'done'}
                      floatingTitleInputStyles={inputStyles}
                      placeholder={'firstName'}
                      required={true}
                    />
                  </View>
                  <View style={inputContainer}>
                    <FloatingTitleInput
                      maxLength={40}
                      onChangeText={(text) => {
                        this.handelChange(text, 'nickname');
                      }}
                      value={nickname}
                      returnKeyType={'done'}
                      floatingTitleInputStyles={inputStyles}
                      placeholder={'lastName'}
                      required={true}
                    />
                  </View>

                  <View style={inputContainer}>
                    <FloatingTitleInput
                      maxLength={40}
                      keyboardType={'phone-pad'}
                      onChangeText={(text) => {
                        this.handelChange(
                          text.replace(/[^0-9+]/g, ''),
                          'phone',
                        );
                      }}
                      value={phone}
                      returnKeyType={'done'}
                      floatingTitleInputStyles={inputStyles}
                      placeholder={'phone_number'}
                      required={true}
                    />
                  </View>
                  <View style={inputContainer}>
                    <FloatingTitleInput
                      maxLength={40}
                      keyboardType={'email-address'}
                      onChangeText={(text) => {
                        this.handelChange(text, 'email');
                      }}
                      value={email}
                      returnKeyType={'done'}
                      floatingTitleInputStyles={inputStyles}
                      placeholder={'emailSignUp'}
                    />
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
                      floatingTitleInputStyles={[
                        inputStyles,
                        passwordInputStyles,
                      ]}
                      placeholder={'password'}
                      required={true}
                    />
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
                  <View style={inputContainer}>
                    <FloatingTitleInput
                      maxLength={40}
                      onChangeText={(text) => {
                        this.handelChange(text, 'confirmPassword');
                      }}
                      value={confirmPassword}
                      onSubmitEditing={this.validate}
                      returnKeyType={'done'}
                      style={inputStyles}
                      secureTextEntry={!confirmPasswordShow}
                      placeholder={'confirm_password'}
                      required={true}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          confirmPasswordShow: !confirmPasswordShow,
                        });
                      }}>
                      {confirmPasswordShow ? (
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

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.privacyPolicy}
                    style={privacy}>
                    <TouchableOpacity
                      style={checkMark}
                      onPress={this.privacyPolicy}>
                      {checked ? (
                        <CheckWithoutBorder
                          IconWidth={IconsSizes.small}
                          IconHeight={IconsSizes.small}
                          IconColor={'red'}
                        />
                      ) : null}
                    </TouchableOpacity>
                    <View style={privacyText}>
                      <Text style={agreeText}>
                        <Translation label={'texts.privacyPolicy'} />
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.pickTermsFile();
                        }}>
                        <Text style={termsServices}>
                          <Translation label={'texts.termsServices'} />
                        </Text>
                      </TouchableOpacity>
                      <Text style={agreeText}>&</Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.pickPrivacyFile();
                        }}>
                        <Text style={privacyPolicy}>
                          <Translation label={'texts.PrivacyPolicy'} />
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>

                  <View style={buttonContainer}>
                    <View
                      style={{
                        width: '100%',
                      }}>
                      <LineGradientButton
                        disabled={this.disabletButton()}
                        onPress={() => this.register()}
                        title={<Translation label={'buttons.sign_up'} />}
                      />
                    </View>
                  </View>
                  <View style={createAccountContent}>
                    <Text style={createAccountText}>
                      <Translation label={'texts.alreadyHaveAnAccount'} />
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Login');
                      }}>
                      <Text style={signInTextStyle}>
                        {' '}
                        <Translation label={'buttons.signIn'} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.registerScreenData,
    privacyFile: store.registerScreenData,
    terms: store.registerScreenData,
    netInfo: store.netInfo,
    theme: store.themes.theme,
  };
};
export default connect(mapStateToProps, {makeAction})(SignUp);
