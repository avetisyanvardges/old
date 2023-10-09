import React from 'react';
import {TouchableOpacity, Text, View, TouchableHighlight} from 'react-native';
import {styles} from './styles';
import {Bin} from '../Icons';
import {IconsStyles, Sizes} from '../../assets/styles';
import {useSelector} from 'react-redux';
import {SwipeListView} from 'react-native-swipe-list-view';
import {
  ACTIVE_CHAT_USER_ID,
  CONTENT_MESSAGE,
  DELETE_MESSAGE_LIST,
  SET_ACTIVE_CHAT_ID,
} from '../../actionsTypes';
import {Avatar} from '../Avatar';
import Translation from '../../Translation';
import {EmptyNotificationIcon} from '../Icons/EmptyIcons/EmptyNotificationIcon';
import {EmptyMessageIcon} from "../Icons/EmptyIcons/EmptyMessageIcon";

const ChatScreenListContent = ({
  listData,
  navigation,
  makeAction,
  headerComponent,
  refreshControl,
}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {PRIMARY_COLOR_FAINT, PRIMARY_COLOR_LIGHT} = theme.color;
  const {
    container,
    backRightBtn,
    backRightBtnRight,
    rowBack,
    membername,
  } = styles(theme);
  const deleteChatList = (data) => {
    const {item} = data;
    const dataInfo = {
      chatId: item.chatId,
      callBack: () => {},
    };
    makeAction(DELETE_MESSAGE_LIST, dataInfo);
  };
  const renderItem = (data, rowMap) => {
    const {item} = data;
    const {memberList} = item;
    return (
      <TouchableHighlight
        underlayColor={PRIMARY_COLOR_FAINT}
        onPress={async () => {
          await makeAction(SET_ACTIVE_CHAT_ID, item.chatId);
          await makeAction(ACTIVE_CHAT_USER_ID, item.memberList._id);
          let contentData = {
            chatId: item.chatId,
            callBack: () => {},
          };
          makeAction(CONTENT_MESSAGE, contentData);
          navigation.navigate('ChatScreen');
        }}>
        <View style={container}>
          <View>
            <Avatar
              margin={2.5}
              borderWidth={1.5}
              radius={Sizes.size14}
              userId={item.memberList._id}
              onPressAvatar={() => {}}
              width={Sizes.size43}
              height={Sizes.size43}
              data={{
                picture: memberList.picture,
              }}
              verified={memberList?.verificationDetails?.verified}
            />
          </View>
          <View
            style={{
              marginLeft: Sizes.size10,
            }}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={[membername, {color: PRIMARY_COLOR_LIGHT}]}>
              {memberList?.name ? memberList?.name : memberList?.nickname}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                marginBottom: 5,
                color: PRIMARY_COLOR_LIGHT,
                flex: 1,
                paddingRight: 50,
              }}>
              {item?.message}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  const renderHiddenItem = (data, rowMap) => (
    <View style={rowBack}>
      <TouchableOpacity
        style={[backRightBtn, backRightBtnRight]}
        onPress={() => deleteChatList(data)}>
        <Bin
          IconWidth={IconsStyles.medium}
          IconHeight={IconsStyles.medium}
          IconColor={PRIMARY_COLOR_FAINT}
        />
      </TouchableOpacity>
      {/* <TouchableOpacity
                style={[backRightBtn, backRightBtnLeft]}
                onPress={() => ''}>
                <Text style={backTextWhite}>
                    <Mute
                        IconWidth={IconsStyles.medium}
                        IconHeight={IconsStyles.medium}
                        IconColor={PRIMARY_COLOR_FAINT}
                    />
                </Text>
            </TouchableOpacity> */}
    </View>
  );
  const onRowDidOpen = (rowKey) => {};
  const _emptyComponent = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <EmptyMessageIcon
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
          <Translation label={'texts.noMessage'} />
        </Text>
      </View>
    );
  };
  return (
    <>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        ListEmptyComponent={_emptyComponent}
        onRowDidOpen={onRowDidOpen}
        ListHeaderComponent={headerComponent}
        refreshControl={refreshControl}
        contentContainerStyle={{flex: !listData.length ? 1 : null}}
        previewOpenDelay={3000}
        rightOpenValue={-80}
        previewOpenValue={-40}
        previewRowKey={'0'}
        useAnimatedList={true}
        disableRightSwipe={true}
        closeOnScroll={true}
        closeOnRowOpen={true}
        closeOnRowPress={true}
      />
    </>
  );
};
export {ChatScreenListContent};
