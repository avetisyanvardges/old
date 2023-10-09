import React, {Component} from 'react';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {TouchableOpacity, Text, View} from 'react-native';
import {Google} from '../../components/Icons/google';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {
  SET_LOGIN_SCREEN_LOADER_VISIBLE,
  SOCIAL_LOGIN,
} from '../../actionsTypes';
import {styles} from './styles';
import Translation from '../../Translation';
import {Sizes} from '../../assets/styles';

class GoogleLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      androidClientId:
        '599064016739-b7hi4etus7p3t07k2lvgrgp96kj181lq.apps.googleusercontent.com',
      webClientId:
        '599064016739-rpn0uaj8aviiei733qa6co5jn8v6e1tc.apps.googleusercontent.com',
      iosClientId:
        '599064016739-hfev1cp756317lcd2e7skgmicak800nu.apps.googleusercontent.com',
    });
  }

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo.idToken) {
        this.login(userInfo.user);
      }
      await GoogleSignin.signOut();
    } catch (error) {
      console.log('Message', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available or Outdated');
      } else {
        console.log('Some Other Error Happened');
      }
    }
  };

  login = (data) => {
    const {email, familyName, givenName, id, photo} = data;
    const formData = {
      id,
      email,
      first_name: givenName?.trim(),
      last_name: familyName?.trim(),
      picture: photo,
    };
    this.props.makeAction(SET_LOGIN_SCREEN_LOADER_VISIBLE, true);
    this.props.makeAction(SOCIAL_LOGIN, formData);
  };

  render() {
    const {theme} = this.props;
    const {content, loginTextStyle, container} = styles(theme);
    return (
      <TouchableOpacity style={container} onPress={this.signIn}>
        <View style={content}>
          <Google IconWidth={Sizes.size20} IconHeight={Sizes.size20} />
          <Text style={loginTextStyle}>
            <Translation label={'texts.signInWithGoogle'} />
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
  };
};
export default connect(mapStateToProps, {makeAction})(GoogleLogin);
