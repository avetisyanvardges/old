import React, {Component} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {IconsSizes, Sizes} from '../../assets/styles';
import {Vk} from '../../components/Icons';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import VKLogin from 'react-native-vkontakte-login';
import {styles} from './styles';
import {
  SOCIAL_LOGIN,
  SET_LOGIN_SCREEN_LOADER_VISIBLE,
} from '../../actionsTypes';
import {VK_ID} from '../../assets/constants';
import Translation from '../../Translation';

class VkLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    VKLogin.initialize(VK_ID);
  }

  login = (data) => {
    const {last_name, first_name, email, id} = data;
    const formData = {
      id: `${id}`,
      email,
      first_name: first_name?.trim(),
      last_name: last_name?.trim(),
      picture: '',
    };
    this.props.makeAction(SET_LOGIN_SCREEN_LOADER_VISIBLE, true);
    this.props.makeAction(SOCIAL_LOGIN, formData);
  };

  signInWithVk = async () => {
    try {
      const data = await VKLogin.login(['email']);
      this.onRequest(data);
      await VKLogin.logout();
    } catch (e) {
      console.log(e);
    }
  };

  onRequest = async (result) => {
    const {user_id, access_token} = result;
    const reqUrl = `https://api.vk.com/method/account.getProfileInfo?user_id=${user_id}&access_token=${access_token}&v=5.84`;
    try {
      const response = await fetch(reqUrl, {method: 'POST'});
      const data = await response.json();
      if (data.error) {
        return;
      } else {
        this.login({...data.response, email: result.email});
      }
    } catch (error) {
      console.log('request', error.message);
    }
  };

  render() {
    const {theme} = this.props;
    const {content, container, loginTextStyle} = styles(theme);
    return (
      <TouchableOpacity
        style={{flex: 1, marginLeft: Sizes.size6}}
        onPress={this.signInWithVk}>
        <View style={content}>
          <View style={container}>
            <Vk
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
    );
  }
}

const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
  };
};
export default connect(mapStateToProps, {makeAction})(VkLogin);
