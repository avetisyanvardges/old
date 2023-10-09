import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {IconsStyles, Sizes} from '../../assets/styles';
import {Cancel} from '../Icons';
import {styles} from './style';
import {Colors} from '../../assets/styles';
import {Avatar} from '../Avatar';

const UserComp = ({data, active, name, unBlockUser}) => {
  const {container, userInfo, userName, unBlockUserStyle} = styles();

  return (
    <View style={container}>
      <View style={userInfo}>
        <View>
          <Avatar
            CheckMarkWidth={Sizes.size15}
            verified={data?.verified}
            width={Sizes.size38}
            height={Sizes.size38}
            data={data}
            active={active}
          />
        </View>
        <Text style={userName}>{name}</Text>
      </View>
      <TouchableOpacity
        style={unBlockUserStyle}
        activeOpacity={0.7}
        onPress={() => unBlockUser(data._id)}>
        <Cancel
          iconWidth={IconsStyles.small}
          iconHeight={IconsStyles.small}
          iconColor={Colors.gray}
        />
      </TouchableOpacity>
    </View>
  );
};

export {UserComp};
