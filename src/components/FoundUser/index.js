import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {Sizes} from '../../assets/styles';
import {useSelector} from 'react-redux';
import {Avatar} from '..';

const FoundUser = ({user, onPress, closeModal}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {userName, userImage, userContainer} = styles(theme);
  const {SECONDARY_TEXT_COLOR} = theme;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onPress();
      }}>
      <View style={userContainer}>
        <Avatar
          data={user}
          verified={user?.verificationDetails?.verified}
          userId={user?._id}
          onPressAvatar={closeModal}
          width={Sizes.size35}
          height={Sizes.size35}
        />
        <Text ellipsizeMode="tail" numberOfLines={1} style={[userName]}>
          {user?.name ? user?.name : user?.nickname}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export {FoundUser};
