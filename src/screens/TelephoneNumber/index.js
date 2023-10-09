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
import i18n from '../../assets/i18next';
import ConfirmationCode from '../../components/ConfirmationCode';
import moment from 'moment';
import {Sizes} from '../../assets/styles';
import CountryPicker from 'react-native-country-picker-modal';
import {Treacle} from '../../components/Icons';
import * as Animatable from 'react-native-animatable';
import {HIDE_TOAST, SET_TOAST_MASSAGE} from '../../actionsTypes';

class TelephoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timerSeconds: '',
      phoneNumber: null,
      confirmCode: '',
      countryCode: {
        callingCode: ['7'],
        cca2: 'RU',
        currency: ['RUB'],
        flag: 'flag-ru',
        name: 'Russia',
        region: 'Europe',
        subregion: 'Eastern Europe',
      },
      visible: false,
      step: 1,
    };
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onChangeText = (text, keyName) => {
    this.setState({[keyName]: text});
  };

  startTimer = () => {
    let countDownDate = moment().add(120, 'seconds');
    this.timer = setInterval(() => {
      let diff = countDownDate.diff(moment());
      if (diff <= 0) {
        clearInterval(this.timer);
      } else {
        this.setState({timer: moment.utc(diff).format('mm:ss')});
      }
    }, 1000);
  };

  showModal = () => {
    this.setState({visible: true});
  };
  hideModal = () => {
    this.setState({visible: false});
  };
  sendCode = () => {
    const {step, phoneNumber, confirmCode} = this.state;
    if (step === 1) {
      const data = {
        phoneNumber,
      };
      this.startTimer();
      this.setState({step: 2});
    } else if (step === 2) {
      const data = {
        phoneNumber,
        confirmCode,
      };
      this.props.makeAction(HIDE_TOAST);
      this.props.makeAction(SET_TOAST_MASSAGE, {
        visible: true,
        type: 'success',
        text: 'Ваш Номер телефона успешно обнавлен.',
      });
      this.props.navigation.navigate('Menu');
    }
  };

  startTimer = () => {
    let start = moment('02:00', 'mm:ss');
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
    clearInterval(this.interval);
    this.startTimer();
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
      countryPickerText,
      hide,
      countryInputContainer,
      callingCodeContainer,
      treacleContainer,
    } = styles(theme);
    const {countryCode, step, phoneNumber, confirmCode} = this.state;

    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR}}>
        <ScreenHeader
          title={'telephoneNumber'}
          leftIcon={'back'}
          leftIconPress={() => {
            navigation.goBack();
          }}
        />
        <View style={container}>
          <Text style={topTitle}>
            {i18n.t('links.number.enter_your_number')}
          </Text>
          <Text style={[subTitle, mb_16]}>
            {i18n.t('links.number.send_you_sms')}
          </Text>

          <View style={countryInputContainer}>
            <TouchableOpacity
              disabled={step === 2}
              style={callingCodeContainer}
              onPress={this.showModal}>
              <Text style={countryPickerText}>
                {countryCode.cca2} +{countryCode.callingCode[0]}
              </Text>
              <View style={treacleContainer}>
                <Treacle
                  IconWidth={Sizes.size11}
                  IconHeight={Sizes.size8}
                  IconColor={'#2C2C2C'}
                />
              </View>
            </TouchableOpacity>
            <TextInput
              maxLength={40}
              editable={step !== 2}
              selectTextOnFocus={step !== 2}
              keyboardType="numeric"
              autoCompleteType="cc-number"
              style={settingsInput}
              onChangeText={(text) => {
                this.onChangeText(text, 'phoneNumber');
              }}
              value={phoneNumber}
              placeholder={i18n.t('links.number.enter_your_number')}
              placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
            />
          </View>
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
              !phoneNumber ||
              (step === 2 && confirmCode.length < 4) ||
              this.state.timerSeconds === '00:00'
            }
            title={i18n.t('links.number.send_code')}
            onPress={this.sendCode}
          />
        </View>

        <View style={!this.state.visible ? {display: 'none'} : {opacity: 0}}>
          <CountryPicker
            onClose={this.hideModal}
            visible={this.state.visible}
            onSelect={(e) => {
              this.setState({countryCode: e});
            }}
            withAlphaFilter
            withFilter
            withCallingCode
            withEmoji
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
export default connect(mapStateToProps, {makeAction})(TelephoneNumber);
