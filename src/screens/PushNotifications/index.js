import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {SafeAreaView, View, Text} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './styles';
import {MenuSwitch} from '../../components/MenuSwitch';
import {Colors} from '../../assets/styles';
import {SET_PUSH_NOTIFICATION_SETTINGS} from '../../actionsTypes';
import i18n from '../../assets/i18next';

class PushNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PushNotificationsElem: this.props.profileData.notification,
      disabledSettings: false,
    };
  }

  componentDidMount() {
    this.getPushNotInfo();
  }

  getPushNotInfo = async () => {
    const {profileData} = this.props;
    const {notification} = profileData;
    // const data = await AsyncStorage.getItem('@pushNotifications');
    // if (data) {
    //   this.setState({ PushNotificationsElem: JSON.parse(data) })
    // }
    if (!this.handlerSwichValue(notification.status)) {
      this.setState({disabledSettings: true});
    }
  };

  changeValue = (value, key) => {
    const {PushNotificationsElem} = this.state;
    if (key === 'status') {
      this.changePushNotificationStatus(value);
    }
    PushNotificationsElem[key] = value ? 'on' : 'off';
    this.setState({PushNotificationsElem});
    const data = {
      body: {
        notification: PushNotificationsElem,
      },
      callBack: () => {},
    };
    this.props.makeAction(SET_PUSH_NOTIFICATION_SETTINGS, data);
  };

  changePushNotificationStatus = (value) => {
    const {PushNotificationsElem} = this.state;
    if (!value) {
      Object.keys(PushNotificationsElem).map((key) => {
        PushNotificationsElem[key] = 'off';
      });
      this.setState({PushNotificationsElem, disabledSettings: true});
    } else {
      this.setState({disabledSettings: false});
    }
  };

  handlerSwichValue = (value) => {
    return value === 'on';
  };

  render() {
    const {navigation, theme} = this.props;
    const {globalContainer, container, underLine, smallTitle} = styles(theme);
    const {PushNotificationsElem, disabledSettings} = this.state;
    const {
      status,
      comments,
      newFriends,
      mentions,
      eventInvitation,
      eventStart,
      eventEnd,
      eventSigned,
      eventWithinRadius,
    } = PushNotificationsElem;
    return (
      <SafeAreaView style={globalContainer}>
        <ScreenHeader
          title={'pushNotifications'}
          leftIcon={'back'}
          leftIconPress={() => {
            navigation.goBack();
          }}
        />

        <View style={container}>
          <MenuSwitch
            title="pushNotificationsText.pushNotifications"
            falseColor={Colors.silver}
            trueColor={Colors.blueViolet}
            thumbColor={Colors.white}
            value={this.handlerSwichValue(status)}
            onValueChange={(value) => this.changeValue(value, 'status')}
          />

          <View style={underLine} />

          <MenuSwitch
            disabled={disabledSettings}
            title="pushNotificationsText.Сomments"
            falseColor={Colors.silver}
            trueColor={Colors.blueViolet}
            thumbColor={Colors.white}
            value={this.handlerSwichValue(comments)}
            onValueChange={(value) => this.changeValue(value, 'comments')}
          />

          {/* <MenuSwitch
            disabled={disabledSettings}
            title="pushNotificationsText.newFriends"
            falseColor={Colors.silver}
            trueColor={Colors.blueViolet}
            thumbColor={Colors.white}
            value={this.handlerSwichValue(newFriends)}
            onValueChange={(value) => this.changeValue(value, 'newFriends')}
          /> */}

          <MenuSwitch
            disabled={disabledSettings}
            title="pushNotificationsText.mentions"
            falseColor={Colors.silver}
            trueColor={Colors.blueViolet}
            thumbColor={Colors.white}
            value={this.handlerSwichValue(mentions)}
            onValueChange={(value) => this.changeValue(value, 'mentions')}
          />

          <View style={underLine} />

          <Text style={smallTitle}>
            {i18n.t('pushNotificationsText.event')}
          </Text>

          {/* <MenuSwitch
            disabled={disabledSettings}
            title="pushNotificationsText.invitationEvent"
            falseColor={Colors.silver}
            trueColor={Colors.blueViolet}
            thumbColor={Colors.white}
            value={this.handlerSwichValue(eventInvitation)}
            onValueChange={(value) => this.changeValue(value, 'eventInvitation')}
          /> */}

          <MenuSwitch
            disabled={disabledSettings}
            title="pushNotificationsText.notificationStartEvent"
            falseColor={Colors.silver}
            trueColor={Colors.blueViolet}
            thumbColor={Colors.white}
            value={this.handlerSwichValue(eventStart)}
            onValueChange={(value) => this.changeValue(value, 'eventStart')}
          />

          <MenuSwitch
            disabled={disabledSettings}
            title="pushNotificationsText.notificationEndEvent"
            falseColor={Colors.silver}
            trueColor={Colors.blueViolet}
            thumbColor={Colors.white}
            value={this.handlerSwichValue(eventEnd)}
            onValueChange={(value) => this.changeValue(value, 'eventEnd')}
          />

          <MenuSwitch
            disabled={disabledSettings}
            title="pushNotificationsText.notificationSignedEvent"
            falseColor={Colors.silver}
            trueColor={Colors.blueViolet}
            thumbColor={Colors.white}
            value={this.handlerSwichValue(eventSigned)}
            onValueChange={(value) => this.changeValue(value, 'eventSigned')}
          />

          <MenuSwitch
            disabled={disabledSettings}
            title="pushNotificationsText.eventWithinRadius"
            falseColor={Colors.silver}
            trueColor={Colors.blueViolet}
            thumbColor={Colors.white}
            value={this.handlerSwichValue(eventWithinRadius)}
            onValueChange={(value) =>
              this.changeValue(value, 'eventWithinRadius')
            }
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
export default connect(mapStateToProps, {makeAction})(PushNotifications);
