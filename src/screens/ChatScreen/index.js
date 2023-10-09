import React, {Component} from 'react';
import {
  View,
  BackHandler,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {styles} from './styles';
import {makeAction} from '../../makeAction';
import {connect} from 'react-redux';

import {
  NEW_MESSAGE,
  SET_CONTENT_MESSAGE,
  CREATE_NEW_CHAT,
  GET_MESSAGE_LIST,
  SET_ACTIVE_CHAT_ID,
} from '../../actionsTypes';
import ChatList from '../../components/ChatList';
import {Avatar, MessageBarr, ScreenLoader} from '../../components';
import {withNavigation} from 'react-navigation';
import {IconsStyles, Sizes} from '../../assets/styles';
import {ArrowLeft} from '../../components/Icons';
import {AirbnbRating} from 'react-native-ratings';
import {deviceInfo} from '../../assets/deviceInfo';

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      message: '',
      chatId: this.props?.activeChatId,
      userInfo: this.props.navigation.getParam('userInfo', 'value'),
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({chatId: this.props?.activeChatId});
    });
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      async () => {
        await this.props.makeAction(GET_MESSAGE_LIST);
        await this.props.navigation.goBack();
      },
    );
  }
  componentWillUnmount() {
    this.props.makeAction(SET_CONTENT_MESSAGE, []);
    this.props.makeAction(SET_ACTIVE_CHAT_ID, null);
    this.backHandler.remove();
    this.focusListener.remove();
  }
  onSend = async () => {
    const {chatId} = this.state;
    if (!chatId) {
      const data = {
        createdInfo: {
          members: [this.props.activeChatUserId],
        },
        callBack: (response) => {
          this.setState({chatId: response.data.chats}, async () => {
            await this.props.makeAction(
              SET_ACTIVE_CHAT_ID,
              response.data.chats,
            );
            await this.createNewMessage();
          });
        },
      };

      this.props.makeAction(CREATE_NEW_CHAT, data);

      return;
    } else {
      this.createNewMessage();
    }
  };

  createNewMessage = () => {
    const {message, chatId} = this.state;
    const data = {
      messageData: {
        // to: this.props.activeChatUserId,
        // from: this.props.screenData.profile?._id,
        content: message.trim(),
        chatId: this.props?.activeChatId,
      },
      callBack: (response) => {
        console.log(
          '-----------------------------++++++++++++++++++++++++++++',
        );
        this.props.makeAction(SET_CONTENT_MESSAGE, [
          response.data.messages,
          ...this.props.chatContent,
        ]);
      },
    };
    this.props.makeAction(NEW_MESSAGE, data);
    this.setState({
      message: '',
    });
  };
  handelChange = (text, keyName) => {
    this.setState({[keyName]: text});
  };

  render() {
    const {theme, userData} = this.props;
    const {
      container,
      headerContainer,
      iconContainer,
      touchableIconContainer,
      iconWidth,
      avatarContainer,
      userName,
      eventItemHeader,
    } = styles(theme);
    const {PRIMARY_BACKGROUND_COLOR} = theme;
    const {message} = this.state;
    const {LoaderVisible} = this.props.Loader;
    return (
      <>
        {LoaderVisible ? <ScreenLoader /> : null}
        <KeyboardAvoidingView
          behavior={deviceInfo.ios ? 'padding' : null}
          style={{flex: 1}}>
          <View style={container}>
            <View style={headerContainer}>
              <View style={[iconContainer, {justifyContent: 'center'}]}>
                <TouchableOpacity
                  style={[
                    touchableIconContainer,
                    iconWidth,
                    {paddingHorizontal: Sizes.size11},
                  ]}
                  onPress={() => {
                    this.props.makeAction(GET_MESSAGE_LIST);
                    this.props.makeAction(SET_CONTENT_MESSAGE, []);
                    this.props.navigation.goBack();
                  }}>
                  <ArrowLeft
                    IconWidth={IconsStyles.medium}
                    IconHeight={IconsStyles.medium}
                    IconColor={theme?.color?.SENDER_MESSAGE}
                  />
                </TouchableOpacity>
                <View style={avatarContainer}>
                  <Avatar
                    userId={userData?._id}
                    onPressAvatar={() => {}}
                    width={Sizes.size32}
                    height={Sizes.size32}
                    data={{
                      picture: userData?.picture,
                    }}
                    verified={userData?.verificationDetails?.verified}
                    active={userData?.status}
                  />
                </View>
                <View style={eventItemHeader}>
                  <Text ellipsizeMode="tail" numberOfLines={1} style={userName}>
                    {userData?.name ? userData?.name : userData?.nickname}
                  </Text>
                  <AirbnbRating
                    count={5}
                    reviews={false}
                    showRating={false}
                    defaultRating={userData?.rating || 0}
                    size={Sizes.size10}
                    isDisabled={true}
                    selectedColor="#FFA012"
                  />
                </View>
              </View>
            </View>

            <ChatList />
            <MessageBarr
              inactiveSend={!message.trim()}
              send={this.onSend}
              value={message}
              onChange={(text) => this.handelChange(text, 'message')}
            />
          </View>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    chatContent: store.Chat.chatContent,
    theme: store.themes.theme,
    Loader: store.loader,
    activeChatId: store.Chat.activeChatId,
    activeChatUserId: store.Chat.activeChatUserId,
    userData: store.Chat.userData,
  };
};

export default withNavigation(
  connect(mapStateToProps, {makeAction})(ChatScreen),
);
