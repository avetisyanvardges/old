import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TouchableHighlight,
  Animated,
  RefreshControl,
} from 'react-native';
import {styles} from './styles';
import {makeAction} from '../../makeAction';
import {connect} from 'react-redux';
import {Bin, Cancel, CheckConfirm} from '../../components/Icons';
import {IconsStyles} from '../../assets/styles';
import NavigationService from '../../NavigationService';
import {
  ADD_NOTIFICATION_REQUEST,
  DELETE_NOTIFICATION_REQUEST,
  SET_NOTIFICATION_AS_READ,
  DELETE_ALL_NOTIFICATIONS,
  GET_NOTIFICATIONS_REQUEST,
  SET_TOAST_MASSAGE,
  SET_ACTIVE_CHAT_ID,
  ACTIVE_CHAT_USER_ID,
  CONTENT_MESSAGE,
  SET_COMMENT_LASTID,
} from '../../actionsTypes';
import ScreenFooter from '../../components/ScreenFooter';
import i18n from '../../assets/i18next';
import {Sizes} from '../../assets/styles';
import Tabs from '../Tabs';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Avatar} from '../../components/Avatar';
import {deviceInfo} from '../../assets/deviceInfo';
import {LineGradientButton} from '../../components';
import {isEmpty} from 'lodash/lang';
import {EmptyNotificationIcon} from '../../components/Icons/EmptyIcons/EmptyNotificationIcon';
import Translation from '../../Translation';
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      markOrRemov: '',
      scrollX: new Animated.Value(-deviceInfo.deviceWidth),
      refreshing: false,
    };
  }

  componentDidMount() {
    this.loadNotification();
  }

  handleNotification = async (notificationData) => {
    const {data, userId} = notificationData.item;
    if (
      data.slug === 'EventView' &&
      notificationData.item.status === 'finished'
    ) {
      this.props.makeAction(SET_TOAST_MASSAGE, {
        visible: true,
        type: 'error',
        text: i18n.t('alerts.eventExpired'),
      });
      return;
    }
    if (data.slug === 'CommentView') {
      this.props.makeAction(SET_COMMENT_LASTID, data?.additionally?.id);
      this.props.navigation.navigate('EventComment', {
        event: {_id: data?.id},
        count: 0,
      });
    }

    if (data.slug === 'ChatScreen') {
      this.props.makeAction(SET_ACTIVE_CHAT_ID, data?.id);
      this.props.makeAction(ACTIVE_CHAT_USER_ID, userId._id);
      let contentData = {
        chatId: data?.id,
        callBack: () => {},
      };
      this.props.makeAction(CONTENT_MESSAGE, contentData);
    }
    const params = {
      id: notificationData?.item?.data.id,
      userData: notificationData?.item?.userId,
      notificationId: notificationData.item._id,
      data: notificationData?.item?.data,
    };
    NavigationService.navigate(notificationData.item.data.slug, params);
    if (notificationData.item.status === 'unread') {
      this.props.makeAction(ADD_NOTIFICATION_REQUEST, {
        status: 'read',
        messageId: notificationData.item._id,
      });
    }
  };

  loadNotification = () => {
    const {profile} = this.props;
    this.props.makeAction(GET_NOTIFICATIONS_REQUEST);
  };

  handleRemove = async (id) => {
    this.props.makeAction(DELETE_NOTIFICATION_REQUEST, {
      noteId: id,
      callBack: () => {
        this.loadNotification();
      },
    });
  };

  refreshing = async () => {
    const {profile} = this.props;
    const {refreshing} = this.state;
    if (!refreshing) {
      this.setState({refreshing: true});
    }
    if (profile._id) {
      this.props.makeAction(GET_NOTIFICATIONS_REQUEST);
    }
    this.setState({refreshing: false});
  };

  render() {
    const {notifications, navigation, unreadNotifications, theme} = this.props;
    const {scrollX, markOrRemov, refreshing} = this.state;
    const {PRIMARY_COLOR_FAINT} = theme.color;
    const {
      container,
      buttons,
      markButton,
      removeButton,
      removeText,
      confirmButtons,
      modalContainer,
      notificationContainer,
      notificationText,
      unreadText,
      rowBack,
      backRightBtn,
      backRightBtnRight,
      confirmContainer,
      horizontalLine,
      confirmButton,
    } = styles(theme);
    let notificationsList = notifications?.length
      ? notifications.map((elem, index) => {
          return {...elem, key: elem._id};
        })
      : [];
    const doneOrCancel = (markOrDel) => {
      Animated.timing(scrollX, {
        toValue: 0,
        duration: 200,
      }).start();
      this.setState({markOrRemov: markOrDel});
    };

    const _renderItem = (note) => {
      return (
        <View style={[modalContainer]}>
          <TouchableHighlight
            underlayColor={PRIMARY_COLOR_FAINT}
            key={note.item.id}
            onPress={() => this.handleNotification(note)}
            style={[
              note.item.status === 'unread'
                ? unreadText
                : notificationContainer,
              {padding: 5},
            ]}>
            <>
              <View>
                <Avatar
                  userId={note.item.userData}
                  width={Sizes.size43}
                  height={Sizes.size43}
                  data={{
                    picture: note.item.data?.picture,
                  }}
                  verified={note.item.userData?.verificationDetails?.verified}
                />
              </View>
              <View style={{marginHorizontal: 7, width: '75%'}}>
                <Text
                  style={notificationText}
                  ellipsizeMode="tail"
                  numberOfLines={2}>
                  {note.item.language[this.props.language]}
                </Text>
              </View>
            </>
          </TouchableHighlight>
        </View>
      );
    };

    const _renderHiddenItem = (data, rowMap) => (
      <View style={rowBack}>
        <TouchableOpacity
          style={[backRightBtn, backRightBtnRight]}
          onPress={() => this.handleRemove(data.item._id)}>
          <Bin
            IconWidth={IconsStyles.medium}
            IconHeight={IconsStyles.medium}
            IconColor={PRIMARY_COLOR_FAINT}
          />
        </TouchableOpacity>
      </View>
    );

    const renderEmptyComponent = () => {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <EmptyNotificationIcon
            IconWidth={Sizes.size85}
            IconHeight={Sizes.size85}
          />
          <Text
            style={{
              paddingTop: 10,
              fontSize: Sizes.size14,
              color: theme?.color?.PRIMARY_COLOR_BOLD,
              textAlign: 'center',
            }}>
            <Translation label={'texts.noNotification'} />
          </Text>
        </View>
      );
    };

    const _cancelDelete = () => {
      Animated.timing(scrollX, {
        toValue: -deviceInfo.deviceWidth,
        duration: 300,
      }).start();
    };

    const removeAll = () => {
      Animated.timing(scrollX, {
        toValue: -deviceInfo.deviceWidth,
        duration: 300,
      }).start();
      this.props.makeAction(DELETE_ALL_NOTIFICATIONS, '');
    };

    const markAsRead = () => {
      this.props.makeAction(SET_NOTIFICATION_AS_READ, '');
    };

    function _renderHeaderComponent() {
      return (
        <>
          <Tabs navigation={navigation} active={'notification'} />
          {!isEmpty(notifications) && (
            <View style={buttons}>
              <View style={markButton}>
                <LineGradientButton
                  marginTop={1}
                  paddingVertical={Sizes.size5}
                  onPress={markAsRead}
                  title={i18n.t('texts.markAllAsRead')}
                />
              </View>
              <TouchableOpacity
                onPress={() => doneOrCancel(removeAll)}
                activeOpacity={0.7}
                style={removeButton}>
                <Text style={removeText}>
                  {i18n.t('texts.removeAllNotifications')}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={confirmButtons}>
            <Animated.View style={[confirmContainer, {right: scrollX}]}>
              <TouchableOpacity
                onPress={() => markOrRemov()}
                style={confirmButton}>
                <CheckConfirm
                  IconWidth={Sizes.size13}
                  IconHeight={Sizes.size13}
                  IconColor={'#A347FF'}
                />
              </TouchableOpacity>

              <View style={horizontalLine} />

              <TouchableOpacity onPress={_cancelDelete} style={confirmButton}>
                <Cancel
                  iconHeight={Sizes.size13}
                  iconWidth={Sizes.size13}
                  iconColor={'#F3267D'}
                />
              </TouchableOpacity>
            </Animated.View>
          </View>
        </>
      );
    }
    return (
      <>
        <View style={container}>
          <SwipeListView
            data={notificationsList}
            renderItem={_renderItem}
            renderHiddenItem={_renderHiddenItem}
            ListHeaderComponent={_renderHeaderComponent()}
            ListEmptyComponent={renderEmptyComponent}
            rightOpenValue={-83}
            previewRowKey={'0'}
            previewOpenValue={-40}
            previewOpenDelay={3000}
            useAnimatedList={true}
            disableRightSwipe={true}
            closeOnScroll={true}
            closeOnRowOpen={true}
            closeOnRowPress={true}
            contentContainerStyle={{flex: !notificationsList.length ? 1 : null}}
            style={{marginBottom: Sizes.size65}}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.refreshing}
                tintColor={'#A347FF'}
              />
            }
          />
        </View>
        <ScreenFooter active={'Notifications'} navigation={navigation} />
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    notifications: store.profileData.notifications,
    profile: store.profileData.profile,
    theme: store.themes.theme,
    language: store.profileData.settings.language,
    unreadNotifications: store.profileData.count,
  };
};

export default connect(mapStateToProps, {makeAction})(Notifications);
