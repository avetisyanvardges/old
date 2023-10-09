import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {ChatListActionSheet} from '../../../components';
import {useSelector} from 'react-redux';
import {Colors} from '../../../assets/styles';
const ChatListMessageContent = ({item, isUser, convertDate}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {
    senderContainer,
    errorIcon,
    messageContentContainer,
    message,
    dataContainer,
    data,
    userContainer,
    messageContainerError,
    screen,
  } = styles(theme);
  const {PLACEHOLDER_TEXT_COLOR, GRAY_TEXT} = theme.color;
  return (
    <View style={screen}>
      <View
        style={[
          senderContainer,
          isUser(item?.from?._id) ? userContainer : null,
        ]}>
        {isUser(item?.from?._id) && item?.status === 'failed' ? (
          <TouchableOpacity
            onPress={() => {
              ChatListActionSheet(
                () => {
                  console.log('tryAgain');
                },
                () => {
                  console.log('DeleteMessage');
                },
                () => {
                  console.log('Cancle');
                },
              );
            }}>
            <Image
              style={errorIcon}
              source={require('../../../assets/images/error-messages.png')}
            />
          </TouchableOpacity>
        ) : null}
        <View
          style={[
            messageContentContainer,
            isUser(item?.from?._id)
              ? {
                  backgroundColor: '#F3F3F3',
                  borderWidth: 1,
                  borderColor: '#F3F3F3',
                }
              : {
                  backgroundColor: '#FFFFFF',
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                },
            isUser(item?.from?._id) && item?.status === 'failed'
              ? messageContainerError
              : null,
          ]}>
          <View>
            <Text
              style={[
                message,
                isUser(item?.from?._id)
                  ? {color: Colors.silver}
                  : {color: Colors.silver},
                isUser(item?.from?._id) && item?.status === 'failed'
                  ? {color: GRAY_TEXT}
                  : null,
              ]}>
              {item?.message}
            </Text>
          </View>
          <View style={dataContainer}>
            <Text
              style={[
                data,
                isUser(item?.from?._id)
                  ? {color: Colors.silver}
                  : {color: Colors.silver},
                isUser(item?.from?._id) && item.status === 'failed'
                  ? {color: PLACEHOLDER_TEXT_COLOR}
                  : null,
              ]}>
              {convertDate(new Date(item?.createdAt))}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export {ChatListMessageContent};
