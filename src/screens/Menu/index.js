import React, {Component} from 'react';
import {
  View,
  BackHandler,
  AppState,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScreenFooter, ScreenLoader} from '../../components';
import {styles} from './styles';
import {makeAction} from '../../makeAction';
import {connect} from 'react-redux';
import Map from '../map';
import {
  SET_EVENT_VIEW_LOADER_VISIBLE,
  GET_TYPES_REQUEST,
  ADD_NOTIFICATION_REQUEST,
  SET_TOAST_NOTIFICATION,
  HIDE_TOAST_NOTIFICATION,
  SET_ACTIVE_CHAT_ID,
  ACTIVE_CHAT_USER_ID,
  CONTENT_MESSAGE,
  SELECTED_EVENT,
  GET_NOTIFICATIONS_REQUEST,
  GET_EVENT_BY_ID,
  GET_COMMENT_FROM_EVENT,
  SET_COMMENT_LASTID,
} from '../../actionsTypes';
import {deviceInfo} from '../../assets/deviceInfo';
import {firebase} from '@react-native-firebase/messaging';
import NavigationService from '../../NavigationService';
import {withNavigation} from 'react-navigation';
import MapServices from '../../services/Map';
import SocketClient from '../../services/SocketClient';
import {isEmpty} from 'lodash';
import {apiSocketUrl} from '../../assets/constants';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskModalVisible: false,
      filterModalVisible: false,
      myEvents: false,
      isEnabled: false,
      isNear: false,
      menuOpened: false,
      searchType: '',
      myList: [],
    };
    this.bottomSheetRef = React.createRef();
  }

  async componentDidMount() {
    const {navigation} = this.props;
    Linking.getInitialURL().then(this._handleOpenURL);
    Linking.addEventListener('url', (event) => this._handleOpenURL(event.url));

    this.subscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange,
    );
    this.focusListener = navigation.addListener('willBlur', () => {
      MapServices.setGoBackInMap(false);
      this.props.makeAction(SELECTED_EVENT, null);
    });

    this.props.makeAction(SET_EVENT_VIEW_LOADER_VISIBLE, true);
    this.props.makeAction(GET_TYPES_REQUEST);

    firebase.messaging().onMessage(async (remoteMessage) => {
      if (!isEmpty(remoteMessage.data)) {
        console.log(remoteMessage);
        this.props.makeAction(GET_NOTIFICATIONS_REQUEST);
        remoteMessage.onPress = () => {
          this.handleNotification(remoteMessage);
          this.props.makeAction(SET_TOAST_NOTIFICATION, {
            notification: null,
            visible: false,
          });
        };
        if (remoteMessage.data.slug === 'CommentView') {
          this.props.makeAction(SET_TOAST_NOTIFICATION, {
            notification: remoteMessage,
            visible: false,
          });
        } else {
          this.props.makeAction(SET_TOAST_NOTIFICATION, {
            notification: remoteMessage,
            visible: true,
          });
        }
        this.props.makeAction(HIDE_TOAST_NOTIFICATION);
      }
    });

    firebase.messaging().onNotificationOpenedApp(async (remoteMessage) => {
      await this.handleNotification(remoteMessage);
    });

    firebase
      .messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          this.interval = setInterval(() => {
            if (NavigationService.navigate) {
              clearInterval(this.interval);
              this.handleNotification(remoteMessage);
            }
          }, 100);
        }
      });

    this.willFocusSub = this.props.navigation.addListener('willFocus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    });

    this.willBlurSub = this.props.navigation.addListener('willBlur', () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackButton,
      );
    });

    this.willBlurSub = this.props.navigation.addListener('willBlur', () => {
      this.setState({
        menuOpened: false,
      });
    });
  }

  componentWillUnmount() {
    this.subscription.remove();
    this.willFocusSub.remove();
    this.willBlurSub.remove();
    this.willBlurSub.remove();
    this.focusListener.remove();
  }

  _handleOpenURL = (url) => {
    const prefix = url.split(':');
    let regexpUrl;
    if (prefix[0] === 'https') {
      regexpUrl = `${apiSocketUrl}/`;
    } else {
      regexpUrl = 'mapllo://';
    }
    const domain = url.replace(regexpUrl, '').split('/');
    if (domain[1] === 'event') {
      NavigationService.navigate('EventView', {
        id: domain[2],
      });
    } else {
      NavigationService.navigate('UserProfile', {
        userId: domain[2],
      });
    }
  };

  handleAppStateChange = async (nextAppState) => {
    console.log(nextAppState, 'NEXT');
    if (nextAppState === 'background' || nextAppState === 'inactive') {
      await SocketClient.disconnectedSocket();
    }
  };

  handleNotification = async (notificationData) => {
    try {
      const {navigation, makeAction} = this.props;
      const {data} = notificationData;
      const additionally = data?.additionally
        ? JSON.parse(data?.additionally)
        : null;
      if (data.slug === 'ChatScreen') {
        makeAction(SET_ACTIVE_CHAT_ID, data.id);
        makeAction(ACTIVE_CHAT_USER_ID, data.userId);
        let contentData = {chatId: data?.id, callBack: () => {}};
        makeAction(CONTENT_MESSAGE, contentData);
      }
      if (data.slug === 'EventView') {
        makeAction(GET_EVENT_BY_ID, {id: data.id});
        makeAction(GET_TYPES_REQUEST, '');
      }
      if (data.slug === 'CommentView') {
        const additionally = JSON.parse(data?.additionally);
        makeAction(SET_COMMENT_LASTID, additionally.id);
        await NavigationService.navigate('EventComment', {
          event: {_id: data.id},
          count: 0,
        });
      }

      const query = {
        id: data?.id,
        notificationId: data?.notificationId,
        data: {additionally: additionally},
      };
      const addNotInfo = {
        status: 'read',
        messageId: notificationData.data.notificationId,
      };
      navigation.navigate(data.slug, query);
      makeAction(ADD_NOTIFICATION_REQUEST, addNotInfo);
    } catch (error) {
      toString(error, 'error handleNotification');
    }
  };

  handleBackButton = async () => {
    // await SocketClient.disconnectedSocket();
    await BackHandler.exitApp();
    return true;
  };
  pressOnMarker = (event) => {
    if (!event) {
      MapServices.setGoBackInMap(false);
    }
    this.props.makeAction(SELECTED_EVENT, event);
  };
  render() {
    const {theme, navigation, selectedEvent} = this.props;
    const {container} = styles(theme);

    return (
      <>
        <View style={container}>
          <Map
            bottomSheetRef={this.bottomSheetRef}
            selectedEvent={selectedEvent}
            pressOnMarker={this.pressOnMarker}
            leftIcon={'menu'}
          />
          <View
            style={{
              width: deviceInfo.deviceWidth,
              height: 50,
              position: 'absolute',
              bottom: 0,
              zIndex: 100,
            }}>
            <ScreenFooter
              active={'Menu'}
              navigation={navigation}
              bottomSheetRef={this.bottomSheetRef}
              onPress={() => {
                MapServices.setGoBackInMap(false);
                this.pressOnMarker(null);
                this.props.makeAction(SELECTED_EVENT, null);
              }}
            />
          </View>
        </View>
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.eventScreenLoader,
    profileData: store.profileData.profile,
    eventList: store.eventList.eventList,
    filtersData: store.filtersData,
    userLocation: store.profileData.location,
    theme: store.themes.theme,
    selectedEvent: store.eventList.selectedEvent,
  };
};

export default connect(mapStateToProps, {makeAction})(withNavigation(Menu));
