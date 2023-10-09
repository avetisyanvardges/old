import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './styles';
import {LineGradientButton} from '../../components';
import ConfirmationCode from '../../components/ConfirmationCode';
import * as Animatable from 'react-native-animatable';
import {CHANGE_EMAIL, CHANGE_EMAIL_SECOND_CODE} from '../../actionsTypes';
import i18n from '../../assets/i18next';
import moment from 'moment';

class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: 0,
      email: '',
      step: 1,
      confirmCode: '',
      timerSeconds: '',
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  onChangeText = (text, keyName) => {
    this.setState({[keyName]: text});
  };

  validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  sendEmail = () => {
    const {step, email, confirmCode} = this.state;
    if (step === 1) {
      const data = {
        email,
        callBack: () => {
          this.startTimer();
          this.setState({step: 2});
        },
      };
      this.props.makeAction(CHANGE_EMAIL_SECOND_CODE, data);
    } else if (step === 2) {
      const data = {
        email,
        code: confirmCode,
        callBack: () => {
          this.props.navigation.navigate('Menu');
        },
      };
      this.props.makeAction(CHANGE_EMAIL, data);
    }
  };

  startTimer = () => {
    let start = moment('02:00', 'm:ss');
    let seconds = start.minutes() * 60;
    this.interval = setInterval(() => {
      this.timerDisplay = start.subtract(1, 'second').format('mm:ss');
      seconds--;
      this.setState({timerSeconds: this.timerDisplay});
      if (seconds === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  };

  resendCode = () => {
    const {email} = this.state;
    clearInterval(this.interval);
    this.startTimer();
    const data = {
      email,
      callBack: () => {
        this.startTimer();
        this.setState({step: 2});
      },
    };
    this.props.makeAction(CHANGE_EMAIL_SECOND_CODE, data);
  };

  render() {
    const {navigation, count, theme} = this.props;
    const {
      container,
      underLine,
      timerStyle,
      topTitle,
      subTitle,
      timerContainer,
      settingsInput,
      mb_16,
    } = styles(theme);
    const {email, step, confirmCode} = this.state;
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR}}>
        <ScreenHeader
          title={'email'}
          leftIcon={'back'}
          leftIconPress={() => {
            navigation.goBack();
          }}
        />
        <View style={container}>
          <Text style={topTitle}>{i18n.t('links.email.enter_your_email')}</Text>
          <Text style={[subTitle, mb_16]}>
            {i18n.t('links.email.send_you_code')}
          </Text>

          <TextInput
            maxLength={40}
            editable={step !== 2}
            selectTextOnFocus={step !== 2}
            style={settingsInput}
            onChangeText={(text) => {
              this.onChangeText(text, 'email');
            }}
            value={email}
            placeholder={i18n.t('links.email.enter_your_email')}
            placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
          />
          <View style={underLine} />
          {step === 2 ? (
            <View>
              <ConfirmationCode
                value={confirmCode}
                setValue={(text) => {
                  this.onChangeText(text, 'confirmCode');
                }}
              />
              <Animatable.View
                useNativeDriver={true}
                animation="fadeInUp"
                easing="ease-out-cubic">
                <TouchableOpacity
                  onPress={this.resendCode}
                  style={timerContainer}>
                  <Text style={timerStyle}>
                    {i18n.t('links.number.send_again')}{' '}
                    {this.state.timerSeconds}
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>
          ) : null}

          <LineGradientButton
            disabled={
              !this.validateEmail(email) ||
              (step === 2 && confirmCode.length < 4) ||
              this.state.timerSeconds === '00:00'
            }
            title={i18n.t('links.number.send_code')}
            onPress={this.sendEmail}
          />
        </View>
      </SafeAreaView>
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
export default connect(mapStateToProps, {makeAction})(Email);
