import React, {useEffect} from 'react';
import {View, Text, TouchableHighlight, Image} from 'react-native';
import styles from './styles';
import {useSelector} from 'react-redux';
import NavigationService from '../../NavigationService';
import {
  ACTIVE_CHAT_USER_ID,
  CONTENT_MESSAGE,
  SET_ACTIVE_CHAT_ID,
  SET_COMMENT_LASTID,
} from '../../actionsTypes';
import {isEmpty} from 'lodash';
const InAppNotification = ({notificationElement, makeAction}) => {
  const notificationInfo = useSelector((state) => state.Chat.getMessage);
  const activeChatId = useSelector((state) => state.Chat.activeChatId);
  const activeChatUserId = useSelector((state) => state.Chat.activeChatUserId);
  const updated = useSelector((state) => state.appInfo.updated);

  const notificationPress = () => {
    if (activeChatId !== notificationInfo?.chatId) {
      makeAction(SET_ACTIVE_CHAT_ID, notificationInfo?.chatId);
      makeAction(ACTIVE_CHAT_USER_ID, notificationInfo?.userId);
      const data = {chatId: notificationInfo?.chatId, callBack: () => {}};
      makeAction(CONTENT_MESSAGE, data);
      NavigationService.navigate('ChatScreen');
    } else if (notificationInfo?.notificationType === 'comment') {
      makeAction(SET_COMMENT_LASTID, notificationInfo?.commentId);
      NavigationService.navigate('EventComment', {
        event: {_id: notificationInfo?.eventId},
        commentId: notificationInfo?.commentId,
        clickNotification: true,
      });
    }
    notificationElement.hide();
  };
  return (
    <>
      {!isEmpty(notificationInfo) && updated && (
        <TouchableHighlight
          underlayColor="#f2f2f2"
          onPress={notificationPress}
          style={styles.notificationContainer}>
          <>
            <View style={styles.notificationContent}>
              <View style={styles.notificationImageContainer}>
                <Image
                  resizeMode={'cover'}
                  style={styles.notificationImage}
                  source={notificationInfo?.notificationImage}
                />
              </View>
              <View style={styles.notificationInfoContainer}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.notificationInfoName}>
                  {notificationInfo?.notificationName}
                </Text>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={styles.notificationInfoMessage}>
                  {notificationInfo?.notificationMessage}
                </Text>
              </View>
            </View>
            <View style={styles.notificationBottomBorderContainer}>
              <View style={styles.notificationBottomBorderItem} />
            </View>
          </>
        </TouchableHighlight>
      )}
    </>
  );
};

export {InAppNotification};
