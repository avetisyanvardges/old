import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {View, Text, TextInput} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './styles';
import {LineGradientButton, ScreenLoader} from '../../components';
import {
  HIDE_TOAST,
  LOADER_VISIBLE,
  RESET_PASSWORD,
  SET_TOAST_MASSAGE,
} from '../../actionsTypes';
import i18n from '../../assets/i18next';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verificationCode: '',
      password: '',
      confirmPassword: '',
    };
  }

  componentWillUnmount() {
    this.setState({
      verificationCode: '',
      password: '',
      confirmPassword: '',
    });
  }
  validate = () => {
    const {password, verificationCode, confirmPassword} = this.state;
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
      this.props.makeAction(LOADER_VISIBLE, true);
      this.props.makeAction(RESET_PASSWORD, {
        password: password,
        verificationCode: verificationCode,
      });
    }
  };

  onChangeText = (text, keyName) => {
    this.setState({[keyName]: text});
  };

  render() {
    const {navigation, count, theme} = this.props;
    const {
      container,
      underLine,
      topTitle,
      settingsInput,
      mb_16,
      mt_57,
      subTitle,
      mt_16,
    } = styles(theme);
    const {verificationCode, password, confirmPassword} = this.state;
    const {LoaderVisible} = this.props.Loader;
    return (
      <>
        {LoaderVisible ? <ScreenLoader /> : null}
        <View
          style={{flex: 1, backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR}}>
          <ScreenHeader
            title={''}
            leftIcon={'back'}
            leftIconPress={() => {
              navigation.goBack();
            }}
          />
          <View style={container}>
            <Text style={topTitle}>{i18n.t('headerTitle.reset_password')}</Text>
            <Text style={[subTitle, mb_16]}>
              {i18n.t('texts.password_reset_code')}
            </Text>

            <TextInput
              maxLength={40}
              style={[settingsInput, mb_16, mt_16]}
              onChangeText={(text) => {
                this.onChangeText(text, 'verificationCode');
              }}
              value={verificationCode}
              placeholder={i18n.t('inputs.placeholder.verification_code')}
              placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
            />

            <TextInput
              maxLength={40}
              style={[settingsInput, mb_16]}
              onChangeText={(text) => {
                this.onChangeText(text, 'password');
              }}
              value={password}
              placeholder={i18n.t('inputs.placeholder.password')}
              placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
            />

            <TextInput
              maxLength={40}
              style={[settingsInput]}
              onChangeText={(text) => {
                this.onChangeText(text, 'confirmPassword');
              }}
              value={confirmPassword}
              placeholder={i18n.t('inputs.placeholder.confirm_password')}
              placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
            />

            <View style={underLine} />

            <LineGradientButton
              disabled={
                !verificationCode ||
                !password ||
                !confirmPassword ||
                password !== confirmPassword
              }
              title={'Confirm'}
              onPress={this.validate}
            />
          </View>
        </View>
      </>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    count: store.profileData.count,
    theme: store.themes.theme,
    profileData: store.profileData.profile,
    Loader: store.loader,
  };
};
export default connect(mapStateToProps, {makeAction})(ChangePassword);
