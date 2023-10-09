import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import i18n from './assets/i18next';
import {SafeAreaView} from 'react-native';
import NavigationService from './NavigationService';
import Navigation from './Navigation';
import {connect} from 'react-redux';
import {makeAction} from './makeAction';
import {Notification} from 'react-native-in-app-message';
import {
  LIGTH_THEME,
  SET_IS_ONLINE,
  GET_APP_VERSION,
  LOADER_VISIBLE,
} from './actionsTypes';
import {
  Toast,
  ToastNotification,
  InAppNotification,
  ScreenLoader,
} from './components';
import {firebase} from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import SocketClient from './services/SocketClient';
import * as Animatable from 'react-native-animatable';
import {setCustomText, setCustomTextInput} from 'react-native-global-props';
import {Fonts} from './assets/styles';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationImage: '',
      notificationName: '',
      notificationMessage: '',
    };
  }

  async componentDidMount() {
    await this.getAppVersion();
    await AsyncStorage.getItem('language').then((language) => {
      i18n.changeLanguage(language);
    });
    await this.props.makeAction(LOADER_VISIBLE, true);

    const customTextInputProps = {style: {fontFamily: Fonts.regular}};
    const customTextProps = {style: {fontFamily: Fonts.regular}};

    setCustomText(customTextProps);
    setCustomTextInput(customTextInputProps);

    NetInfo.addEventListener((networkState) => {
      AsyncStorage.getItem('token').then(async (token) => {
        if (token) {
          if (!networkState.isConnected) {
            NavigationService.navigate('FailingConnection');
          }
        }
      });
    });

    this.getTheme();
    if (this.props.updated) {
      this.intervalInAppNot = setInterval(async () => {
        const tokenAccess = await AsyncStorage.getItem('token');
        if (this.InAppNotificationElement && tokenAccess) {
          clearInterval(this.intervalInAppNot);
          SocketClient.setupInAppNotification(this.InAppNotificationElement);
        }
      }, 300);

      console.disableYellowBox = true;
      this.unsubscribe = NetInfo.addEventListener((state) => {
        this.props.makeAction(SET_IS_ONLINE, state.isConnected);
      });
    }
  }

  async getTheme() {
    let ACTION_TYPE;
    let theme = await AsyncStorage.getItem('Theme');
    if (theme) {
      ACTION_TYPE = theme;
    } else {
      ACTION_TYPE = LIGTH_THEME;
    }
    this.props.makeAction(ACTION_TYPE);
  }

  async getAppVersion() {
    await this.props.makeAction(GET_APP_VERSION);
  }

  notificationRenderItem(notificationElement) {
    return (
      <InAppNotification
        notificationElement={notificationElement}
        makeAction={this.props.makeAction}
      />
    );
  }

  render() {
    const {toastData, toastNotificationData, screenData, updated} = this.props;
    const {userLoading} = screenData;
    return (
      <>
        {userLoading ? <ScreenLoader splashScreen={true} /> : null}
        {toastData.visible &&
        updated &&
        toastNotificationData?.notification?.data?.slug !== 'ChatScreen' ? (
          <Animatable.View
            animation="fadeInDown"
            duration={300}
            easing="ease-in-out-quad"
            style={{position: 'absolute', zIndex: 1000, width: '100%', top: 0}}>
            <Toast text={toastData.text} type={toastData.type} />
          </Animatable.View>
        ) : null}

        <SafeAreaView style={{flex: 1}}>
          {toastNotificationData.visible &&
          toastNotificationData?.notification?.data?.slug !== 'ChatScreen' ? (
            <ToastNotification
              notification={toastNotificationData.notification}
            />
          ) : null}

          <Navigation
            ref={(navigatorRef) => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />

          <Notification
            ref={(ref) => (this.InAppNotificationElement = ref)}
            duration={3000}
            customComponent={this.notificationRenderItem(
              this.InAppNotificationElement,
            )}
            showKnob={false}
            onPress={() => {}}
          />
        </SafeAreaView>
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    toastData: store.toastMessageState,
    toastNotificationData: store.toastNotificationState,
    screenData: store.profileData,
    activeChatId: store.Chat.activeChatId,
    chatContent: store.Chat.chatContent,
    updated: store.appInfo.updated,
  };
};

firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  let notification = await AsyncStorage.getItem('messages');
  if (!notification) {
    notification = [];
  } else {
    notification = JSON.parse(notification);
  }
  notification.push(remoteMessage);
  await AsyncStorage.setItem('messages', JSON.stringify(notification));
});
export default connect(mapStateToProps, {makeAction})(Main);
