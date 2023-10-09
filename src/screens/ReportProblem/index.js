import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {View, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './styles';
import {LineGradientButton, ScreenLoader} from '../../components';
import {LOADER_VISIBLE, REPORT_SUPPORT} from '../../actionsTypes';
import i18n from '../../assets/i18next';
import {deviceInfo} from '../../assets/deviceInfo';

class ReportProblem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      messageSubject: '',
      message: '',
    };
  }

  validate = () => {
    const {name, email, messageSubject, message} = this.state;
    const data = {
      body: {
        name,
        email,
        messageSubject,
        message,
      },
      callBack: () => this.props.navigation.goBack(),
    };
    this.props.makeAction(LOADER_VISIBLE, true);
    this.props.makeAction(REPORT_SUPPORT, data);
  };

  onChangeText = (text, keyName) => {
    this.setState({[keyName]: text});
  };

  validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  render() {
    const {navigation, theme} = this.props;
    const {container, settingsInput, mb_16, mt_57, textArea} = styles(theme);
    const {name, email, messageSubject, message} = this.state;
    const {LoaderVisible} = this.props.Loader;
    return (
      <>
        {LoaderVisible ? <ScreenLoader /> : null}
        <KeyboardAvoidingView
          behavior={deviceInfo.ios ? 'padding' : null}
          style={{flex: 1}}>
          <ScrollView>
            <View
              style={{
                flex: 1,
                backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
              }}>
              <ScreenHeader
                title={'reportProblem'}
                leftIcon={'back'}
                leftIconPress={() => {
                  navigation.goBack();
                }}
              />
              <View style={container}>
                <TextInput
                  maxLength={40}
                  style={[settingsInput, mb_16, mt_57]}
                  onChangeText={(text) => {
                    this.onChangeText(text, 'name');
                  }}
                  value={name}
                  placeholder={i18n.t('reportProblem.name')}
                  placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
                />

                <TextInput
                  maxLength={40}
                  style={[settingsInput, mb_16]}
                  onChangeText={(text) => {
                    this.onChangeText(text, 'email');
                  }}
                  value={email}
                  placeholder={i18n.t('reportProblem.email')}
                  placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
                />

                <TextInput
                  maxLength={40}
                  style={[settingsInput, mb_16]}
                  onChangeText={(text) => {
                    this.onChangeText(text, 'messageSubject');
                  }}
                  value={messageSubject}
                  placeholder={i18n.t('reportProblem.messageSubject')}
                  placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
                />

                <TextInput
                  style={[settingsInput, textArea, mb_16]}
                  maxLength={270}
                  multiline={true}
                  onChangeText={(text) => {
                    this.onChangeText(text, 'message');
                  }}
                  value={message}
                  placeholder={i18n.t('reportProblem.yourMessage')}
                  placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
                />

                <LineGradientButton
                  disabled={
                    !message ||
                    !messageSubject ||
                    !this.validateEmail(email) ||
                    !name
                  }
                  title={i18n.t('buttons.done')}
                  onPress={this.validate}
                />
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
    theme: store.themes.theme,
    Loader: store.loader,
  };
};
export default connect(mapStateToProps, {makeAction})(ReportProblem);
