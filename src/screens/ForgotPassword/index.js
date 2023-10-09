import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {SafeAreaView, View, Text, TextInput} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './styles';
import {LineGradientButton, ScreenLoader} from '../../components';
import {FORGOT_PASSWORD, LOADER_VISIBLE} from '../../actionsTypes';
import i18n from '../../assets/i18next';
import {Sizes} from '../../assets/styles';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  onChangeText = (text, keyName) => {
    this.setState({[keyName]: text});
  };

  validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  submit = () => {
    const {email} = this.state;
    this.props.makeAction(LOADER_VISIBLE, true);
    this.props.makeAction(FORGOT_PASSWORD, {email: email});
  };

  render() {
    const {navigation, theme} = this.props;
    const {
      container,
      underLine,
      topTitle,
      subTitle,
      settingsInput,
      mb_16,
    } = styles(theme);
    const {email} = this.state;
    const {LoaderVisible} = this.props.Loader;
    return (
      <>
        {LoaderVisible ? <ScreenLoader /> : null}
        <SafeAreaView
          style={{flex: 1, backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR}}>
          <View style={{marginTop: Sizes.size15}}>
            <ScreenHeader
              title={''}
              leftIcon={'back'}
              leftIconPress={() => {
                navigation.goBack();
              }}
            />
          </View>
          <View style={container}>
            <Text style={topTitle}>{i18n.t('texts.forgotYourPassword')}</Text>
            <Text style={[subTitle, mb_16]}>
              {i18n.t('texts.password_reset_code')}
            </Text>

            <TextInput
              maxLength={40}
              style={settingsInput}
              onChangeText={(text) => {
                this.onChangeText(text, 'email');
              }}
              value={email}
              placeholder={i18n.t('texts.email')}
              placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
            />
            <View style={underLine} />

            <LineGradientButton
              disabled={!this.validateEmail(email)}
              title={i18n.t('buttons.resetFilter')}
              onPress={this.submit}
            />
          </View>
        </SafeAreaView>
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
export default connect(mapStateToProps, {makeAction})(ForgotPassword);
