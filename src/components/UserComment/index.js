import React, {useEffect, useState} from 'react';
import {Text, View, Pressable, FlatList} from 'react-native';
import {Avatar} from '../Avatar';
import {Colors, Sizes} from '../../assets/styles';
import {styles} from './styles';
import {HeartActive, HeartInActive} from '../Icons';
import {ADD_LIKE_FROM_COMMENT} from '../../actionsTypes';
import {useDispatch} from 'react-redux';
import {makeAction} from '../../makeAction';
import i18n from '../../assets/i18next';
import NavigationService from '../../NavigationService';

const UserComment = ({
  profileId,
  onLongPress,
  nickName,
  commentItem,
  replyComment,
  selectMentionUser,
  renderUserComment,
  mention,
  likeMembers,
  repliedComment,
  replyCommentCount,
}) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isLike: commentItem?.liked || false,
    longPress: false,
    lastTap: null,
    nickname: [],
  });

  const [comment, setComment] = useState({
    userInfo: commentItem?.user ? commentItem?.user : commentItem,
    commentId: commentItem?._id,
    commentText: commentItem?.comment,
    mentioned: commentItem?.mentioned,
    like: commentItem?.likes,
    repliedId: commentItem?.repliedId,
    newComment: commentItem?.newComment,
    repliedCount: commentItem?.repliedCount,
    repliedUsers: commentItem?.repliedUsers,
    ownProfile: profileId === commentItem?.user?._id,
  });

  const [showReply, setShowReply] = useState(false);

  const [likes, setLikes] = useState(commentItem?.likes || 0);

  const navigateToProfile = (mention) => {
    if (comment.mentioned) {
      const mentionNickname = mention.split('@');
      const user = comment.mentioned.find((users) => {
        return mentionNickname[1] === users.nickname;
      });

      if (user) {
        NavigationService.navigate('UserProfile', {
          userId: user?._id,
        });
      }
    }
  };

  const {
    memberContainer,
    mainInfo,
    container,
    likeText,
    infoLine,
    underLine,
  } = styles();

  const HASHTAG_FORMATTER = (string) => {
    const word = string.split(' ');
    return word.filter(Boolean).map((v, i) => {
      const nick = v.replace('@', '');
      if (
        v.startsWith('@') &&
        comment?.mentioned[0]?.nickname?.includes(nick)
      ) {
        return (
          <Text
            key={i}
            style={{color: '#3761CD', fontSize: Sizes.size10}}
            onPress={() => navigateToProfile(v)}>
            {' ' + v + ' '}
          </Text>
        );
      } else if (v.startsWith('#')) {
        return (
          <Text key={i} style={{color: '#3761CD'}}>
            {' ' + v + ' '}
          </Text>
        );
      } else {
        return (
          <Text key={i} style={{color: Colors.charGreen}}>
            {v + ' '}
          </Text>
        );
      }
    });
  };
  const likeCounter = () => {
    if (state.isLike) {
      setState({...state, isLike: false});
      if (likes !== 0) {
        setLikes(likes - 1);
      }
    } else {
      setState({...state, isLike: true});
      setLikes(likes + 1);
    }
  };

  const handleDoubleTap = () => {
    if (commentItem?._id) {
      const now = Date.now();
      const DOUBLE_PRESS_DELAY = 300;
      if (state.lastTap && now - state.lastTap < DOUBLE_PRESS_DELAY) {
        likeCounter();
        dispatch(makeAction(ADD_LIKE_FROM_COMMENT, {id: comment.commentId}));
      } else {
        setState({...state, lastTap: now});
      }
    }
  };

  const likeComment = () => {
    if (commentItem?._id) {
      likeCounter();
      dispatch(makeAction(ADD_LIKE_FROM_COMMENT, {id: comment.commentId}));
    }
  };

  const renderReplyComments = ({item}) => {
    return (
      <UserComment
        commentItem={item}
        onLongPress={(own) => {
          onLongPress(own);
        }}
        replyComment={replyComment}
        likeMembers={likeMembers}
        renderUserComment={renderUserComment}
      />
    );
  };

  return (
    <>
      <Pressable
        onPress={mention ? selectMentionUser : handleDoubleTap}
        onLongPress={() => {
          onLongPress(comment);
        }}>
        <View style={[container]}>
          <View style={memberContainer}>
            <View>
              <Avatar
                userId={comment.userInfo?._id}
                width={Sizes.size35}
                height={Sizes.size35}
                data={{
                  picture: comment.userInfo?.picture,
                }}
                onPressAvatar={() => {}}
                verified={comment.userInfo?.verificationDetails?.verified}
                active={comment.userInfo?.status}
              />
            </View>
            <View style={mainInfo}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: '#2C2C2C',
                    fontSize: 11,
                    fontWeight: 'bold',
                  }}>
                  {comment.userInfo?.name
                    ? comment.userInfo?.name
                    : comment.userInfo?.nickname}{' '}
                  {comment.commentText ? (
                    <Text style={{fontWeight: '400'}}>
                      {HASHTAG_FORMATTER(comment.commentText)}
                    </Text>
                  ) : null}
                </Text>
              </View>
              {nickName && (
                <Text style={{fontSize: 12, color: Colors.gray}}>
                  @{comment.userInfo?.nickname}
                </Text>
              )}
              {!mention ? (
                <View style={infoLine}>
                  {likes ? (
                    <Pressable onPress={() => likeMembers(comment?.commentId)}>
                      <Text style={likeText}>
                        {i18n.t('texts.like')}: {likes}{' '}
                      </Text>
                    </Pressable>
                  ) : null}
                  {!comment.repliedId ? (
                    <Pressable
                      style={{marginHorizontal: likes && Sizes.size10}}
                      onPress={() => replyComment(comment)}>
                      <Text style={likeText}>{i18n.t('texts.reply')}</Text>
                    </Pressable>
                  ) : null}
                </View>
              ) : null}
            </View>
            <Pressable
              onPress={likeComment}
              style={{
                width: Sizes.size50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {state.isLike ? (
                <HeartActive IconWidth={15} IconHeight={15} />
              ) : (
                <HeartInActive IconWidth={15} IconHeight={15} />
              )}
            </Pressable>
          </View>
        </View>
      </Pressable>
      {!comment.repliedId && replyCommentCount ? (
        <Pressable
          onPress={() => setShowReply(!showReply)}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 20,
              borderColor: '#E3E3E3',
              backgroundColor: '#E3E3E3',
              borderWidth: 0.4,
              marginRight: Sizes.size5,
            }}
          />
          <Text
            style={{
              fontSize: Sizes.size10,
              fontWeight: '400',
              lineHeight: Sizes.size12,
              color: Colors.silver,
            }}>
            {!showReply
              ? `${i18n.t('texts.view')} ${replyCommentCount} ${i18n.t(
                  'texts.more_replies',
                )}`
              : `${i18n.t('texts.hide')}`}
          </Text>
        </Pressable>
      ) : null}
      {showReply && (
        <View style={{alignItems: 'flex-end'}}>
          <View style={{width: '90%'}}>
            <FlatList
              keyExtractor={(item) => item._id.toString()}
              data={repliedComment}
              renderItem={renderReplyComments}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default UserComment;
