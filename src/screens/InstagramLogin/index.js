import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {IconsSizes} from '../../assets/styles';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {Instagram} from '../../components/Icons';
import {styles} from './styles';
import InstagramLogin from 'react-native-instagram-login';
import {INSTAGRAM_ID, INSTAGRAM_SECRET} from '../../assets/constants';
import {
  SET_LOGIN_SCREEN_LOADER_VISIBLE,
  SOCIAL_LOGIN,
} from '../../actionsTypes';
import Translation from '../../Translation';

class InstagramComponent extends Component {
  onRequest = async (data) => {
    const requestUrl = `https://graph.instagram.com/me?fields=id,username&access_token=${data.access_token}`;
    try {
      const response = await fetch(requestUrl, {method: 'GET'});
      const data = await response.json();
      if (data.error) {
      } else {
        this.props.makeAction(SET_LOGIN_SCREEN_LOADER_VISIBLE, true);
        this.props.makeAction(SOCIAL_LOGIN, data);
      }
    } catch (error) {
      console.log('request', error.message);
    }
  };

  render() {
    const {theme} = this.props;
    const {content, container, loginTextStyle} = styles(theme);
    return (
      <View style={[content, {flex: 1}]}>
        <TouchableOpacity
          style={container}
          onPress={() => this.instagramLogin.show()}>
          <Instagram
            IconWidth={IconsSizes.small}
            IconHeight={IconsSizes.small}
            IconColor={'#000000'}
          />
          <Text style={loginTextStyle}>
            <Translation label="buttons.socialLogin" />
          </Text>
        </TouchableOpacity>
        <InstagramLogin
          ref={(ref) => (this.instagramLogin = ref)}
          appId={INSTAGRAM_ID}
          appSecret={INSTAGRAM_SECRET}
          redirectUrl="https://www.google.com/"
          scopes={['user_profile', 'user_media']}
          onLoginSuccess={(data) => this.onRequest(data)}
        />
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
  };
};
export default connect(mapStateToProps, {makeAction})(InstagramComponent);
