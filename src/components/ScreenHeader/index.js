import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './styles';
import {ArrowLeft} from '../Icons';
import {Sizes, IconsStyles} from '../../assets/styles';
import {useSelector} from 'react-redux';
const ScreenHeader = ({title, leftIcon, leftIconPress, eventTitle}) => {
  const theme = useSelector((state) => state.themes.theme);
  const {
    headerContainer,
    iconContainer,
    titleStyle,
    touchableIconContainer,
    iconWidth,
    titleContainerCenter,
  } = styles(theme);
  const {t} = useTranslation();
  return (
    <View style={headerContainer}>
      <View style={[iconContainer, {justifyContent: 'center', width: '20%'}]}>
        {leftIcon === 'back' ? (
          <TouchableOpacity
            style={[
              touchableIconContainer,
              iconWidth,
              {paddingHorizontal: Sizes.size11},
            ]}
            onPress={leftIconPress}>
            <ArrowLeft
              IconWidth={IconsStyles.medium}
              IconHeight={IconsStyles.medium}
              IconColor={theme?.color?.SENDER_MESSAGE}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={[titleContainerCenter]}>
        <Text
          style={[titleStyle, touchableIconContainer]}
          numberOfLines={1}
          ellipsizeMode={'tail'}>
          {eventTitle ? eventTitle : title ? t(`headerTitle.${title}`) : ''}
        </Text>
      </View>

      {/* {rightIcon === 'notification' ?
                <TouchableOpacity style={[iconContainer, touchableIconContainer, { justifyContent: 'center', width: '20%' }]} onPress={() => { notificationIconPress() }}>
                    {unreadNotifications !== 0 ? <View style={touchable}></View> : null}
                    <Notification IconWidth={IconsStyles.medium} IconHeight={IconsStyles.medium} IconColor={theme?.color?.SENDER_MESSAGE} />
                </TouchableOpacity> : null} */}
      {/* {rightIcon === 'more' ? <TouchableOpacity onPress={rightIconPress} style={[touchableIconContainer, { paddingLeft: Sizes.size30, justifyContent: 'center', width: '20%' }]}>
                <Settings IconWidth={IconsStyles.medium} IconHeight={IconsStyles.medium} IconColor={theme?.color?.SENDER_MESSAGE} />
            </TouchableOpacity> : null} */}
    </View>
  );
};
export {ScreenHeader};
