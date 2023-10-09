import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Alert,
  FlatList,
  TouchableWithoutFeedback,
  Text,
  Keyboard,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import * as Animatable from 'react-native-animatable';
import {deviceInfo} from '../../assets/deviceInfo';
import UserComment from '../../components/UserComment';
import {
  BLOCK_USER,
  DELETE_EVENT_COMMENT,
  EMPTY_EVENT_COMMENT,
  GET_COMMENT_FROM_EVENT,
  GET_LIKED_MEMBERS_FROM_COMMENT,
  LOADER_VISIBLE,
  REPORT_COMMENT,
  SEARCH_USER,
  SEND_EVENT_COMMENT,
  SET_EVENT_DATA,
  SET_EVENT_LOADER,
  SET_REPLY_COMMENT,
} from '../../actionsTypes';
import {Avatar, MessageBarr, ScreenLoader} from '../../components';
import {Colors, fullScreen, IconsStyles, Sizes} from '../../assets/styles';
import Translation from '../../Translation';
import i18n from '../../assets/i18next';
import {ArrowLeft} from '../../components/Icons';
import {reportTypes} from '../../assets/utils/reportTypes';
import RBSheet from 'react-native-raw-bottom-sheet';
import {styles} from './styles';
import {withNavigationFocus} from 'react-navigation';
import SocketClient from '../../services/SocketClient';

class EventComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isLike: false,
      focused: false,
      mentions: false,
      userList: [],
      mentionUser: [],
      mentionIds: [],
      repliedId: '',
      selected: false,
      selectedComment: {},
      keyboardHeight: '',
      newCommentId: this.props.navigation.getParam('commentId', 'NO-ID'),
      ownProfile: '',
      count: this.props.navigation.getParam('count', 0),
      isActiveInappropriateContent: false,
      updatedData: false,
      isDisabled: true,
      refreshing: false,
      empty: false,
    };
    this.onEndReachedCalledDuringMomentum = true;
    SocketClient.commentRoom(this.state.event?._id);
  }
  async componentDidMount() {
    await this.props.makeAction(SET_EVENT_LOADER, true);
    await this.setEventData();
    await this.getEventComment();

    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide,
    );
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.value !== this.state.value) {
      if (
        this.state.value.length === 0 ||
        this.state.value.trim().length === 0
      ) {
        this.setState({isDisabled: true});
      } else {
        this.setState({isDisabled: false});
      }
    }
  }

  componentWillUnmount() {
    this.keyboardWillShowListener.remove();
    this.keyboardDidHideListener.remove();
    this.props.makeAction(EMPTY_EVENT_COMMENT);
  }

  keyboardWillShow = (e) => {
    console.log(e);
    this.setState({
      keyboardHeight: e.endCoordinates.height + 180,
    });
  };

  keyboardWillHide = (e) => {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
    });
  };

  setEventData = () => {
    const event = this.props.navigation.getParam('event', 'NO-EVENT');
    if (event) {
      const eventData = {
        description: event?.description,
        title: event?.title,
        user: event?.createdBy,
        _id: event?._id,
      };
      this.props.makeAction(SET_EVENT_DATA, eventData);
    }
  };

  commentSectionColor = () => {
    const commentId = this.props.navigation.getParam('event', 'NO-EVENT');
    console.log(commentId);
  };

  getEventComment = (item) => {
    const {lastId, count, empty} = this.state;
    const {eventData} = this.props;
    const data = {
      callBack: (res) => {
        if (res.data.comments.length === 0) {
          this.setState({empty: true});
        } else {
          this.setState({empty: false});
        }
        this.setState({updatedData: true, count: 10});
      },
      id: eventData?._id,
      lastId,
      count,
    };
    if (!empty) {
      this.props.makeAction(GET_COMMENT_FROM_EVENT, data);
    }
  };

  sendReport = (content) => {
    const {selectedComment} = this.state;
    this._RBSheetReport.close();
    const data = {
      content: content,
      commentId: selectedComment.id,
      repliedId: selectedComment.repliedId,
    };
    this.props.makeAction(REPORT_COMMENT, data);
  };

  blockUser = (blockedId) => {
    const data = {
      callBack: (res) => {
        this._RBSheetReport.close();
      },
      error: () => {
        this._RBSheetReport.close();
      },
      blockedId,
    };
    this.props.makeAction(BLOCK_USER, data);
  };

  refreshing = async () => {
    const {refreshing} = this.state;
    if (!refreshing) {
      await this.setState({refreshing: true});
    }
    await this.props.makeAction(LOADER_VISIBLE, true);
    await this.getEventComment();
    await this.setState({refreshing: false});
  };

  sendComment = () => {
    const {value, repliedId} = this.state;
    const {eventData} = this.props;
    const mentionIds = [];
    const char = value.match(/@[A-Za-z0-9_-]*/g);
    if (!char) {
      this.setState({mentionIds: []});
    } else {
      this.state.mentionUser.map((user) => {
        char.map((j) => {
          const mentionNickname = j.split('@');
          if (user.nickname === mentionNickname[mentionNickname.length - 1]) {
            mentionIds.push(user.id);
          }
        });
      });
    }
    const data = {
      eventId: eventData?._id,
      comment: value.trim(),
      repliedId: repliedId ? repliedId : null,
      mentionIds: mentionIds,
    };

    this.props.makeAction(SEND_EVENT_COMMENT, data);
    this.setState({value: '', repliedId: '', mentionIds: ''});
  };

  render() {
    const {navigation, theme, eventLoader, eventData, profileData} = this.props;
    const {
      value,
      isLike,
      mentions,
      userList,
      selected,
      page,
      isActiveInappropriateContent,
      selectedComment,
      updatedData,
      isDisabled,
      refreshing,
    } = this.state;
    const {
      spamRbsHeetContainer,
      spamTitle,
      removeIconContainer,
      greyText,
      underLine,
    } = styles();
    const STATUS_BAR = StatusBar.statusBarHeight || 24;

    const MENTIONS_FORMATTER = (string) => {
      const words = string.split(' ');
      words.forEach((word, index) => {
        const isLastWord = index === words.length - 1;
        if (word.startsWith('@')) {
          if (isLastWord) {
            this.setState({mentions: true});
            const searchItem = word.split('@');
            const data = {
              callBack: (response) => {
                this.setState({userList: response.data.list});
              },
              error: (error) => {},
              query: searchItem[searchItem.length - 1],
            };
            this.props.makeAction(SEARCH_USER, data);
          }
        } else {
          this.setState({mentions: false});
        }
      });
    };

    const longPressInComment = (id, comment) => {
      this.setState({
        selected: !selected,
        selectedComment: {
          id: comment.commentId,
          user: comment.userInfo,
          repliedId: comment.repliedId,
        },
        ownProfile: !comment.repliedId
          ? comment.ownProfile
          : profileData?._id === comment?.userInfo?._id,
      });
      if (!this.state.ownProfile) {
        this._RBSheetReport.open();
      } else {
        this._RBSheetDelete.open();
      }
    };
    const cancelSelected = () => {
      this.setState({selected: !selected});
    };

    const deleteComment = () => {
      this.props.makeAction(DELETE_EVENT_COMMENT, {
        id: this.state.selectedComment.id,
        repliedId: this.state.selectedComment.repliedId,
      });
      this.setState({selected: !selected});
      this._RBSheetDelete.close();
    };

    const selectMentionUser = (item) => {
      const user = {
        nickname: item?.nickname,
        id: item?._id,
      };
      this.setState({mentionUser: [...this.state.mentionUser, user]});
      const lastIndex = value.lastIndexOf('@');
      const result = value.substring(0, lastIndex) + `@${item?.nickname}` + ' ';
      this.setState({
        value: result,
        mentions: false,
      });
    };

    const renderMentionList = ({item}) => {
      return (
        <UserComment
          commentItem={item}
          like={false}
          nickName={true}
          mention={true}
          selectMentionUser={() => selectMentionUser(item)}
        />
      );
    };

    const replyComment = (item) => {
      selectMentionUser(item.userInfo);
      this.setState({focused: true});
      setTimeout(() => {
        this.setState({repliedId: item.commentId});
      }, 50);
    };

    const likeMembers = (item) => {
      const data = {
        id: item,
        limitCount: 10,
        page: 0,
      };
      this.props.makeAction(GET_LIKED_MEMBERS_FROM_COMMENT, data);
      navigation.navigate('CommentLikeMembers');
    };

    const renderUserComment = ({item, index}) => {
      return (
        <UserComment
          commentItem={item}
          onLongPress={(own) => {
            longPressInComment(item?._id, own);
          }}
          cancelSelected={cancelSelected}
          profileId={profileData?._id}
          repliedComment={item?.repliedUsers}
          replyComment={replyComment}
          replyCommentCount={item?.repliedCount}
          likeMembers={likeMembers}
          renderUserComment={renderUserComment}
          selectMentionUser={selectMentionUser}
        />
      );
    };

    const changeText = (text) => {
      if (text.length > 500) {
        Alert.alert(
          'Your message is too long',
          'The body of your message is too long \nto send. Please shorten your \nmessage and try again.',
        );
        text = text.slice(0, 500);
      }
      MENTIONS_FORMATTER(text);
      this.setState({value: text});
    };
    function listHeaderComponent() {
      return (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: Sizes.size18,
              marginVertical: Sizes.size7,
            }}>
            <View>
              <View style={{marginRight: Sizes.size10}}>
                <Avatar
                  // onPressAvatar={this.closeModal}
                  userId={eventData?.user?._id}
                  width={Sizes.size43}
                  height={Sizes.size43}
                  data={{
                    picture: eventData?.user?.picture,
                  }}
                  verified={eventData?.verificationDetails?.verified}
                  active={eventData?.user?.status}
                />
              </View>
            </View>
            <View style={{width: Sizes.size200}}>
              <Text
                style={{
                  fontSize: Sizes.size14,
                  fontWeight: deviceInfo.ios ? '400' : 'bold',
                  lineHeight: Sizes.size17,
                  color: Colors.charGreen,
                }}>
                {eventData?.user?.name || eventData?.user?.nickname}
                <Text
                  style={{
                    fontWeight: deviceInfo.ios ? '400' : null,
                    fontSize: Sizes.size12,
                    lineHeight: Sizes.size14,
                  }}>
                  {'  '}
                  {eventData?.description}
                </Text>
              </Text>
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <View style={underLine} />
          </View>
        </>
      );
    }

    const loadMore = () => {
      this.getEventComment();
    };

    return (
      <>
        {eventLoader ? <ScreenLoader /> : null}
        <TouchableWithoutFeedback>
          <KeyboardAvoidingView
            behavior={deviceInfo.ios ? 'padding' : null}
            style={{flex: 1}}>
            <ScreenHeader
              title={'comments'}
              leftIcon={'back'}
              leftIconPress={() => {
                navigation.goBack();
              }}
            />
            <View style={{flex: 1}}>
              <FlatList
                keyExtractor={(item, index) => item._id.toString()}
                data={this.props.comments}
                ListHeaderComponent={listHeaderComponent()}
                renderItem={renderUserComment}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={this.refreshing}
                    tintColor={'#A347FF'}
                  />
                }
                showsVerticalScrollIndicator={false}
                onEndReached={loadMore}
                onEndReachedThreshold={10}
                extraData={updatedData}
              />
              {mentions ? (
                <Animatable.View
                  animation={mentions ? 'fadeInUpBig' : 'fadeOutDownBig'}
                  duration={300}
                  style={{
                    height: fullScreen.height - this.state.keyboardHeight,
                    zIndex: 999,
                    backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
                  }}>
                  <FlatList
                    data={userList}
                    renderItem={renderMentionList}
                    keyboardShouldPersistTaps="handled"
                  />
                </Animatable.View>
              ) : null}
              <MessageBarr
                value={value}
                onChange={(text) => changeText(text)}
                send={this.sendComment}
                focused={this.state.focused}
                inactiveSend={isDisabled}
              />
            </View>
            <RBSheet
              ref={(ref) => {
                this._RBSheetReport = ref;
              }}
              openDuration={250}
              onClose={() => {
                this.setState({
                  isActiveInappropriateContent: false,
                });
              }}
              closeOnDragDown={true}
              customStyles={{
                container: {
                  backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
                  height: isActiveInappropriateContent
                    ? deviceInfo.deviceHeight - STATUS_BAR
                    : 200,
                  borderTopLeftRadius: Sizes.size20,
                  borderTopRightRadius: Sizes.size20,
                },
              }}>
              {!isActiveInappropriateContent ? (
                <View style={spamRbsHeetContainer}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: Sizes.size7,
                    }}>
                    <Text
                      style={{
                        fontSize: Sizes.size15,
                        fontWeight: 'bold',
                        lineHeight: 18,
                        color: Colors.charGreen,
                      }}>
                      {selectedComment?.user?.nickname}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        isActiveInappropriateContent: true,
                      });
                    }}
                    style={removeIconContainer}>
                    <Text style={greyText}>
                      <Translation label={'spamInfo.comment.report'} />
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.blockUser(selectedComment?.user?._id)}
                    style={removeIconContainer}>
                    <Text
                      style={{
                        fontSize: Sizes.size14,
                        color: Colors.red,
                        marginBottom: Sizes.size6,
                      }}>
                      {i18n.t('texts.blockThisUser') +
                        ' ' +
                        selectedComment?.user?.nickname}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={spamRbsHeetContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          isActiveInappropriateContent: false,
                        });
                      }}>
                      <ArrowLeft
                        IconWidth={IconsStyles.medium}
                        IconHeight={IconsStyles.medium}
                        IconColor={theme?.PRIMARY_COLOR_LIGHT}
                      />
                    </TouchableOpacity>
                    <Text
                      style={[
                        spamTitle,
                        {
                          marginRight: 'auto',
                          marginLeft: 'auto',
                        },
                      ]}>
                      <Translation label={'spamInfo.title'} />
                    </Text>
                  </View>
                  <Text style={[greyText, {marginVertical: Sizes.size15}]}>
                    <Translation label={'spamInfo.subTitile'} />
                  </Text>
                  <ScrollView>
                    {reportTypes.map((elem, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            this.sendReport(
                              i18n.t(
                                `spamInfo.inappropriateSubContentTitle.${elem.label}`,
                              ),
                            )
                          }
                          key={index.toString()}
                          style={removeIconContainer}>
                          <Text key={index} style={greyText}>
                            <Translation
                              label={`spamInfo.inappropriateSubContentTitle.${elem.label}`}
                            />
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}
            </RBSheet>
            <RBSheet
              ref={(ref) => {
                this._RBSheetDelete = ref;
              }}
              openDuration={250}
              onClose={() => {
                this.setState({
                  isActiveInappropriateContent: false,
                });
              }}
              closeOnDragDown={true}
              customStyles={{
                container: {
                  backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
                  height: isActiveInappropriateContent
                    ? deviceInfo.deviceHeight - STATUS_BAR
                    : 200,
                  borderTopLeftRadius: Sizes.size20,
                  borderTopRightRadius: Sizes.size20,
                },
              }}>
              <View style={spamRbsHeetContainer}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginVertical: Sizes.size7,
                  }}>
                  <Text
                    style={{
                      fontSize: Sizes.size15,
                      fontWeight: 'bold',
                      lineHeight: 18,
                      color: Colors.charGreen,
                    }}>
                    {selectedComment?.user?.nickname}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={deleteComment}
                  style={removeIconContainer}>
                  <Text style={greyText}>
                    <Translation label={'spamInfo.comment.delete'} />
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    theme: store.themes.theme,
    profileData: store.profileData.profile,
    comments: store.eventComment.comments,
    eventData: store.eventComment.eventData,
    eventLoader: store.eventList.eventLoader,
  };
};
export default connect(mapStateToProps, {makeAction})(
  withNavigationFocus(EventComment),
);
