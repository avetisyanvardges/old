import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './styles';
import {LineGradientButton} from '../../components';
import {
  CHANGE_PASSWORD_NEW_PASSWORD,
  HIDE_TOAST,
  SET_CHANGE_PASSWORD_SCREEN_LOADER_VISIBLE,
  SET_TOAST_MASSAGE,
} from '../../actionsTypes';
import i18n from '../../assets/i18next';
import {deviceInfo} from '../../assets/deviceInfo';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    };
  }

  validate = () => {
    const {oldPassword, newPassword, confirmPassword} = this.state;
    if (newPassword && newPassword.trim().length < 6) {
      this.props.makeAction(HIDE_TOAST);
      this.props.makeAction(SET_TOAST_MASSAGE, {
        visible: true,
        type: 'error',
        text: i18n.t('alerts.passwordCharacters'),
      });
    } else if (newPassword && !confirmPassword) {
      this.props.makeAction(HIDE_TOAST);
      this.props.makeAction(SET_TOAST_MASSAGE, {
        visible: true,
        type: 'error',
        text: i18n.t('alerts.confirmPasswordIsRequired'),
      });
    } else if (newPassword !== confirmPassword) {
      this.props.makeAction(HIDE_TOAST);
      this.props.makeAction(SET_TOAST_MASSAGE, {
        visible: true,
        type: 'error',
        text: i18n.t('alerts.passwordDoesntMatch'),
      });
    } else {
      this.props.makeAction(SET_CHANGE_PASSWORD_SCREEN_LOADER_VISIBLE, true);
      this.props.makeAction(CHANGE_PASSWORD_NEW_PASSWORD, {
        password: oldPassword,
        newPassword: newPassword,
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
    } = styles(theme);
    const {PRIMARY_COLOR_LIGHT} = theme.color;
    const {oldPassword, newPassword, confirmPassword} = this.state;
    return (
      <KeyboardAvoidingView
        behavior={deviceInfo.ios ? 'padding' : null}
        style={{flex: 1}}>
        <ScrollView>
          <ScreenHeader
            title={'password'}
            leftIcon={'back'}
            leftIconPress={() => {
              navigation.goBack();
            }}
          />
          <View style={container}>
            <Text style={topTitle}>
              {i18n.t('links.password.change_password')}
            </Text>
            <TextInput
              maxLength={40}
              placeholderTextColor={PRIMARY_COLOR_LIGHT}
              style={[settingsInput, mb_16, mt_57]}
              onChangeText={(text) => {
                this.onChangeText(text, 'oldPassword');
              }}
              value={oldPassword}
              placeholder={
                i18n.t('inputs.placeholder.enter_old_password') + ' *'
              }
            />

            <TextInput
              maxLength={40}
              placeholderTextColor={PRIMARY_COLOR_LIGHT}
              style={[settingsInput, mb_16]}
              onChangeText={(text) => {
                this.onChangeText(text, 'newPassword');
              }}
              value={newPassword}
              placeholder={i18n.t('inputs.placeholder.newPassword') + ' *'}
            />

            <TextInput
              maxLength={40}
              placeholderTextColor={PRIMARY_COLOR_LIGHT}
              style={[settingsInput]}
              onChangeText={(text) => {
                this.onChangeText(text, 'confirmPassword');
              }}
              value={confirmPassword}
              placeholder={
                i18n.t('inputs.placeholder.confirm_new_password') + ' *'
              }
            />

            <View style={underLine} />

            <LineGradientButton
              disabled={
                !oldPassword ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
              title={i18n.t('links.password.confirm')}
              onPress={this.validate}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    count: store.profileData.count,
    theme: store.themes.theme,
    profileData: store.profileData.profile,
  };
};
export default connect(mapStateToProps, {makeAction})(ChangePassword);
