import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {AccessToken, LoginManager} from 'react-native-fbsdk';
import {
  SET_LOGIN_SCREEN_LOADER_VISIBLE,
  SOCIAL_LOGIN,
} from '../../actionsTypes';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {Facebook} from '../Icons/facebook';
import {Sizes} from '../../assets/styles';
import {styles} from './styles';
import Translation from '../../Translation';

class FacebookLogin extends Component {
  login = (data) => {
    const {email, last_name, first_name, id, picture} = data;
    const formData = {
      id,
      email,
      first_name: first_name?.trim(),
      last_name: last_name?.trim(),
      picture: picture?.data?.url || '',
    };
    this.props.makeAction(SET_LOGIN_SCREEN_LOADER_VISIBLE, true);
    this.props.makeAction(SOCIAL_LOGIN, formData);
  };

  handleFacebookLogin = async () => {
    const result = await LoginManager.logInWithPermissions([
      'email',
      'public_profile',
    ]);
    console.log(result, 'result');
    try {
      if (result.error) {
        console.log('login has error: ', result.error);
      }
      if (result.isCancelled) {
        console.log('Login cancelled');
      } else {
        AccessToken.getCurrentAccessToken().then((data) => {
          const {accessToken} = data;
          this.getUserInfo(accessToken);
        });
      }
    } catch (e) {
      console.log(e, 'ERROR BACEBOOK');
    }
  };

  getUserInfo = (accessToken) => {
    fetch(
      'https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name,picture&access_token=' +
        accessToken,
    )
      .then((response) => response.json())
      .then((json) => {
        this.login({...json, accessToken});
      })
      .catch(() => {
        console.log('ERROR GETTING DATA FROM FACEBOOK');
      });
  };

  render() {
    const {theme} = this.props;
    const {content, container, loginTextStyle} = styles(theme);

    return (
      <>
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={this.handleFacebookLogin}>
          <View style={content}>
            <View style={container}>
              <Facebook
                IconWidth={Sizes.size23}
                IconHeight={Sizes.size23}
                IconColor={'#000000'}
              />
              <Text style={loginTextStyle}>
                <Translation label="buttons.socialLogin" />
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
  };
};
export default connect(mapStateToProps, {makeAction})(FacebookLogin);
