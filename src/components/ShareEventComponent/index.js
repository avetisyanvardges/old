import React, {useCallback, useState, useRef, useEffect} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  Modal,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {Colors, IconsSizes, IconsStyles, Sizes} from '../../assets/styles';
import {Avatar} from '../Avatar';
import {AirbnbRating} from 'react-native-ratings';
import {More} from '../Icons';
import * as Animatable from 'react-native-animatable';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {LOADER_VISIBLE, SHARE_EVENT} from '../../actionsTypes';
import ImageColors from 'react-native-image-colors';
import Share, {ShareAsset} from 'react-native-share';
import RBSheet from 'react-native-raw-bottom-sheet';
import {InstagramIcon} from '../Icons/Social/InstagramIcon';
import {FacebookIcon} from '../Icons/Social/FacebookIcon';
import {MoreIcon} from '../Icons/Social/MoreIcon';
import {Social} from 'react-native-share/src/types';
import moment from 'moment';
import {apiSocketUrl} from '../../assets/constants';

const ShareEventView = ({item, onPress}) => {
  const eventRef = useRef();
  const _RBsheet = useRef();
  const _RBsheet1 = useRef();
  const dispatch = useDispatch();
  const theme = useSelector((store) => store.themes.theme);
  const {createdBy, description, verified, image, _id, title} = item;
  const {PRIMARY_COLOR_BOLD} = theme.color;
  const [source, setSource] = useState(null);
  const [onloadEventImg, setEventImg] = useState(false);
  const [onloadConnectImg, setConnectImg] = useState(false);
  const [background, setBackground] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (image) {
      ImageColors.getColors(image[0].url, {
        fallback: '#A347FF',
        quality: 'low',
        pixelSpacing: 5,
        cache: false,
        key: 'unique_key',
      }).then((res) => {
        _RBsheet1.current.open();
        if (res.platform === 'android') {
          setBackground(res.average);
          setModalVisible(true);
          this.props.makeAction(LOADER_VISIBLE, false);
          return;
        }
        if (res.platform === 'ios') {
          setBackground(res.primary);
          setModalVisible(true);
          this.props.makeAction(LOADER_VISIBLE, false);
          return;
        }
      });
    }
  }, [image]);

  useEffect(() => {
    if (onloadEventImg && onloadConnectImg && background) {
      onPressCaptureModalContent();
    }
  }, [onloadEventImg, onloadConnectImg, background]);

  const onPressCaptureModalContent = useCallback(() => {
    captureRef(eventRef, {
      format: 'jpg',
      quality: 0.7,
    }).then((uri) => {
      setSource(uri);
      _RBsheet.current.open();
    });
  }, []);

  const {
    cardTitle,
    cardDescription,
    cardTitleContainer,
    contentFeedBack,
    flexCenter,
    nameContainer,
    topbarContainer,
    backgroundImage,
    flex,
    joinText,
  } = styles(theme);
  return (
    <>
      <RBSheet
        ref={_RBsheet1}
        customStyles={{
          container: {
            height: '100%',
            backgroundColor: background,
          },
        }}
        animationType="slide"
        visible={modalVisible}>
        <View ref={eventRef} style={contentFeedBack}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: Sizes.size25,
              backgroundColor: background,
            }}>
            <View style={{height: Sizes.size430}}>
              <View
                style={{
                  height: '15%',
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  padding: Sizes.size13,
                  flexDirection: 'row',
                  backgroundColor: 'white',
                }}>
                <View>
                  <Avatar
                    margin={2.2}
                    borderWidth={1}
                    radius={Sizes.size12}
                    userId={createdBy?._id}
                    width={Sizes.size35}
                    height={Sizes.size35}
                    data={{picture: createdBy?.picture}}
                    verified={verified}
                  />
                </View>
                <View style={topbarContainer}>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={nameContainer}>
                    {createdBy?.name ? createdBy?.name : createdBy?.nickname}
                  </Text>
                  <View style={{}}>
                    <AirbnbRating
                      count={5}
                      reviews={false}
                      showRating={false}
                      defaultRating={Math.round(createdBy?.rating) || 0}
                      size={Sizes.size7}
                      isDisabled={true}
                      selectedColor="#FFA012"
                    />
                  </View>
                </View>
                <TouchableOpacity
                  style={{
                    transform: [{rotate: '90deg'}],
                    marginLeft: 'auto',
                    padding: Sizes.size2,
                  }}>
                  <More
                    IconHeight={IconsStyles.medium}
                    IconWidth={IconsStyles.medium}
                    IconColor={PRIMARY_COLOR_BOLD}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  height: Sizes.size370,
                }}>
                <Image
                  onLoad={() => setEventImg(true)}
                  style={backgroundImage}
                  resizeMode="cover"
                  source={{uri: image[0].url}}
                />
                <View style={cardTitleContainer}>
                  <View style={{marginTop: Sizes.size15}}>
                    <Text
                      ellipsizeMode="tail"
                      style={{
                        width: '90%',
                        color: Colors.silver,
                        fontSize: Sizes.size11,
                        fontWeight: '400',
                        lineHeight: Sizes.size14,
                      }}>
                      {moment(item.date).format('MMMM Do, YYYY  |  HH:mm')}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                      marginVertical: Sizes.size5,
                    }}>
                    <View style={flex}>
                      <View>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={1}
                          style={cardTitle}>
                          {title}
                        </Text>
                        <Text
                          ellipsizeMode="tail"
                          numberOfLines={2}
                          style={cardDescription}>
                          {description}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <Pressable
              style={{
                width: '100%',
                marginTop: Sizes.size14,
                paddingHorizontal: Sizes.size7,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}}>
                <Text style={joinText}>Присоединяйся в </Text>
              </View>
              <Image
                onLoad={() => setConnectImg(true)}
                source={require('../../assets/images/maplloInLogin.png')}
                style={{width: 66, height: 22, resizeMode: 'contain'}}
              />
            </Pressable>
          </View>
        </View>
        <RBSheet
          ref={_RBsheet}
          openDuration={250}
          closeOnDragDown={true}
          onClose={() => onPress()}
          customStyles={{
            container: {
              height: Sizes.size87,
              backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
              paddingBottom: Sizes.size20,
              borderTopLeftRadius: Sizes.size20,
              borderTopRightRadius: Sizes.size20,
            },
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Pressable
              style={{marginHorizontal: Sizes.size20, alignItems: 'center'}}
              onPress={async () => {
                const shareOptions = {
                  url: `${apiSocketUrl}/share/event/${_id}`,
                };
                await Share.open(shareOptions)
                  .then()
                  .catch((e) => {
                    onPress();
                  });
                await onPress();
              }}>
              <InstagramIcon
                IconWidth={Sizes.size32}
                IconHeight={Sizes.size32}
                IconColor={Colors.silver}
              />
            </Pressable>
            <Pressable
              style={{marginHorizontal: Sizes.size20, alignItems: 'center'}}
              onPress={async () => {
                const shareOptions = {
                  attributionURL: `${apiSocketUrl}/share/event/${_id}`,
                  url: source,
                };
                await Share.open(shareOptions)
                  .then()
                  .catch((e) => {
                    onPress();
                  });
                await onPress();
              }}>
              {source ? (
                <FacebookIcon
                  IconWidth={Sizes.size28}
                  IconHeight={Sizes.size28}
                  IconColor={Colors.silver}
                />
              ) : (
                <ActivityIndicator
                  size={IconsSizes.normal}
                  color={Colors.silver}
                />
              )}
            </Pressable>
          </View>
        </RBSheet>
      </RBSheet>
    </>
  );
};

export default ShareEventView;
