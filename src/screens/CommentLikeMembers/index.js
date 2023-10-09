import React, {useEffect, useState} from 'react';

import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {Avatar, ScreenHeader} from '../../components';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {Sizes} from '../../assets/styles';
import {AirbnbRating} from 'react-native-ratings';
import NavigationService from '../../NavigationService';
import Translation from '../../Translation';

const CommentLikeMembers = ({navigation}) => {
  const members = useSelector((store) => store.eventComment.likedMembers);
  useEffect(() => {}, []);
  const dispatch = useDispatch();
  // const [comment, setComment] = useState({
  //   userInfo: commentItem?.user ? commentItem?.user : commentItem,
  //   commentId: commentItem?._id,
  //   commentText: commentItem?.comment,
  //   like: commentItem?.likes,
  //   ownProfile: profileId === commentItem?.user?._id,
  // });
  const {
    memberContainer,
    mainInfo,
    container,
    viewProfile,
    viewProfileText,
  } = styles();

  const renderLikeMembers = ({item}) => {
    return (
      <View style={[container]}>
        <View style={memberContainer}>
          <View>
            <Avatar
              userId={item?._id}
              width={Sizes.size43}
              height={Sizes.size43}
              data={{
                picture: item?.picture,
              }}
              verified={item?.verificationDetails?.verified}
              active={item?.status}
            />
          </View>
          <View style={mainInfo}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{
                color: '#2C2C2C',
                fontSize: 14,
                marginRight: Sizes.size20,
              }}>
              {item?.name ? item?.name : item?.nickname}
            </Text>
            <AirbnbRating
              count={5}
              reviews={false}
              showRating={false}
              defaultRating={Math.round(item?.rating) || 0}
              size={Sizes.size10}
              isDisabled={true}
              selectedColor="#FFA012"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              NavigationService.navigate('UserProfile', {
                userId: item?._id,
              });
            }}
            style={{
              marginLeft: 'auto',
              width: Sizes.size130,
            }}>
            <View style={viewProfile}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={viewProfileText}>
                <Translation label={'texts.viewProfile'} />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View>
      <ScreenHeader
        title={'liked'}
        leftIcon={'back'}
        leftIconPress={() => {
          navigation.goBack();
        }}
      />
      <FlatList data={members} renderItem={renderLikeMembers} />
    </View>
  );
};

export default CommentLikeMembers;
