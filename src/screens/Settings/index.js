import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {
  Verification,
  NotVerifyIcon,
  BigEye,
  BlackMaplloLogo,
} from '../../components/Icons';
import {Sizes, IconsStyles} from '../../assets/styles';
import {styles} from './styles';
import {LoginManager} from 'react-native-fbsdk';
import {
  LOGOUT,
  DARK_THEME,
  LIGTH_THEME,
  GET_USER_INFORMATION,
  SET_LOGIN_SCREEN_LOADER_VISIBLE,
  SET_USER_LOADING,
} from '../../actionsTypes';
import AsyncStorage from '@react-native-community/async-storage';
import {LineGradientButton, MenuLink} from '../../components';
import i18n from '../../assets/i18next';
import {deviceInfo} from '../../assets/deviceInfo';
import Share from 'react-native-share';
import {apiSocketUrl} from '../../assets/constants';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSocial: false,
      isDark: false,
    };
  }

  componentDidMount() {
    this.props.makeAction(GET_USER_INFORMATION);
    this.handleTheme();
    const {profile} = this.props.screenData;
    if (profile.loginType === 'social') {
      this.setState({isSocial: true});
    }
  }

  async handleTheme() {
    let them;
    await AsyncStorage.getItem('Theme').then((res) => (them = res));
    if (them && them === DARK_THEME) {
      this.setState({isDark: true});
    } else {
      this.setState({isDark: false});
    }
  }

  itemPress = async (item) => {
    this.props.navigation.navigate(item);
  };

  logout = () => {
    this.props.makeAction(SET_USER_LOADING, true);
    LoginManager.logOut();
    this.props.makeAction(LOGOUT);
  };

  toggleSwitchTheme = (event) => {
    let ACTION_TYPE;
    if (event) {
      ACTION_TYPE = DARK_THEME;
    } else {
      ACTION_TYPE = LIGTH_THEME;
    }
    this.setState({isDark: event});
    this.props.makeAction(ACTION_TYPE);
    AsyncStorage.setItem('Theme', ACTION_TYPE);
  };

  shareProfileLink = async () => {
    const {_id} = this.props.screenData.profile;
    const shareOptions = {
      url: `${apiSocketUrl}/share/user/${_id}`,
    };
    await Share.open(shareOptions);
  };

  verificationButton = (status) => {
    const {navigation, theme} = this.props;
    const {
      notVerifyContainer,
      notVerifyIcon,
      pandingContainer,
      pandingText,
    } = styles(theme);
    switch (status) {
      case 'verified':
        return (
          <LineGradientButton
            title={i18n.t('texts.accountVerification')}
            onPress={() => {
              navigation.navigate('AccountVerification');
            }}
            rightIcon={
              <Verification
                IconWidth={IconsStyles.medium}
                IconHeight={IconsStyles.medium}
                IconColor={'white'}
              />
            }
          />
        );
      case 'pending':
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AccountVerification');
            }}
            activeOpacity={0.7}
            style={pandingContainer}>
            <Text style={pandingText}>{i18n.t('texts.checkAccount')}</Text>

            <BigEye
              IconWidth={Sizes.size20}
              IconHeight={Sizes.size16}
              IconColor={'#FFFFFF'}
            />
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AccountVerification');
            }}
            activeOpacity={0.7}
            style={notVerifyContainer}>
            <Text style={notVerifyIcon}>
              {' '}
              {i18n.t('texts.accountVerification')}
            </Text>
            <NotVerifyIcon
              IconWidth={IconsStyles.medium}
              IconHeight={IconsStyles.medium}
              IconColor={'#818195'}
            />
          </TouchableOpacity>
        );
    }
  };

  render() {
    const {navigation, theme, profileData} = this.props;
    const {
      container,
      eventsList,
      eventsListIos,
      underLine,
      ligthButtonText,
      ligthButton,
      blackLogoContainer,
    } = styles(theme);
    const status = profileData.verificationDetails?.verified;
    return (
      <KeyboardAvoidingView behavior={deviceInfo.ios ? 'padding' : null}>
        <ScrollView style={{backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR}}>
          <ScreenHeader
            title={'settings'}
            leftIcon={'back'}
            leftIconPress={() => {
              navigation.goBack();
            }}
          />

          <View style={container}>
            <View
              style={[
                {marginBottom: Sizes.size10},
                eventsList,
                deviceInfo.ios ? eventsListIos : {},
              ]}>
              {/* <Text
                style={[grayText, Platform.OS === 'ios' ? eventsListIos : {}]}>
                <Translation label={`texts.theme`} />
              </Text>

              <Switch
                trackColor={{ false: '#767577', true: '#EDDEF9' }}
                thumbColor={'#fff'}
                ios_backgroundColor="#3E3E3E"
                value={isDark}
                onValueChange={this.toggleSwitchTheme}
              /> */}
            </View>
            <MenuLink
              showCircle={true}
              title={'headerTitle.account'}
              navigate={'Account'}
            />

            <MenuLink
              showCircle={true}
              title={'headerTitle.privacyPolicy'}
              navigate={'PrivacyPolicy'}
            />

            <MenuLink
              showCircle={true}
              title={'headerTitle.security'}
              navigate={'Security'}
            />

            <MenuLink
              showCircle={true}
              title={'headerTitle.pushNotification'}
              navigate={'PushNotifications'}
            />

            <MenuLink
              showCircle={true}
              title={'headerTitle.appLanguage'}
              navigate={'ChangeLanguage'}
            />

            <MenuLink
              showCircle={true}
              title={'headerTitle.reportProblem'}
              navigate={'ReportProblem'}
            />

            <MenuLink
              showCircle={true}
              title={'headerTitle.information'}
              navigate={'Information'}
            />
            <MenuLink
              showCircle={true}
              title={'headerTitle.about'}
              navigate={'GeneralInfo'}
              query={'Settings'}
            />

            <View style={underLine} />

            <MenuLink
              showCircle={false}
              title={'headerTitle.supportCenter'}
              onPress={() => {
                Linking.openURL('https://mapllo.com');
              }}
              titleColor="#A347FF"
            />

            <View style={{marginTop: Sizes.size34}}>
              {/* {this.verificationButton(status)} */}
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={[ligthButton]}
              onPress={this.shareProfileLink}>
              <Text style={ligthButtonText}>
                {i18n.t('texts.share_account')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.logout}
              activeOpacity={0.7}
              style={ligthButton}>
              <Text style={ligthButtonText}>{i18n.t('texts.sign_out')}</Text>
            </TouchableOpacity>

            <View style={blackLogoContainer}>
              <BlackMaplloLogo IconWidth={Sizes.size60} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    theme: store.themes.theme,
    profileData: store.profileData.profile,
  };
};
export default connect(mapStateToProps, {makeAction})(Settings);
