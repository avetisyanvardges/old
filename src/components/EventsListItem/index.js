import React, {Component, useCallback} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  Alert,
  Animated,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
import {
  Colors,
  Fonts,
  fullScreen,
  IconsSizes,
  IconsStyles,
  Sizes,
} from '../../assets/styles';
import {Avatar} from '../Avatar';
import {AirbnbRating} from 'react-native-ratings';
import {
  ActiveFavorites,
  ArrowLeft,
  BigEye,
  Bin,
  Cancel,
  CheckConfirm,
  ChooseLocation,
  CommentIcon,
  Edit,
  Favorites,
  JoinedUsers,
  More,
  Play,
  SendIcon,
} from '../Icons';
import Share from 'react-native-share';
import {makeAction} from '../../makeAction';
import RBSheet from 'react-native-raw-bottom-sheet';
import Translation from '../../Translation';
import {deviceInfo} from '../../assets/deviceInfo';
import i18n from '../../assets/i18next';
import {reportTypes} from '../../assets/utils/reportTypes';
import {
  ACTIVE_CHAT_USER_ID,
  CONTENT_MESSAGE,
  DELETE_EVENT_REQUEST,
  GET_CHAT_BY_USER_ID,
  LOADER_VISIBLE,
  REJECT_EVENT,
  SAVE_EVENT,
  SELECTED_EVENT,
  SEND_REPORT_REASON,
  SEND_REQUEST_EVENT,
  SET_ACTIVE_CHAT_ID,
  SET_EVENT_LOADER,
} from '../../actionsTypes';
import MapServices from '../../services/Map';
import CustomSlider from '../CustomSlider';
import Members from '../../screens/Members';
import Video from 'react-native-video';
import moment from 'moment';
import 'moment/locale/en-au';
import 'moment/locale/ru';
import {LineGradientButton} from '../LineGradientButton';
import GestureRecognizer from 'react-native-swipe-gestures';
import DeviceInfo from 'react-native-device-info';
import {isEmpty} from 'lodash';
import InAppReview from 'react-native-in-app-review';
import * as Animatable from 'react-native-animatable';
import ShareEventView from '../ShareEventComponent';
import {InstagramIcon} from '../Icons/Social/InstagramIcon';
import {FacebookIcon} from '../Icons/Social/FacebookIcon';
import {MoreIcon} from '../Icons/Social/MoreIcon';
import {debounce, throttle} from 'lodash/function';

class EventsListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionMove: false,
      loadMore: false,
      isActiveInappropriateContent: false,
      showMembersModal: false,
      confirmDelete: new Animated.Value(-Sizes.size150),
      chatId: null,
      view: false,
      shareView: false,
    };
    this.myRef = React.createRef();
  }
  eventRef = React.createRef();
  componentDidMount() {
    if (this.openMemberModal) {
      clearTimeout(this.openMemberModal);
    }
    let loc = this.props.settings.language === 'en' ? 'en-au' : 'ru';
    moment.locale(loc);
    this.openMemberModal = setTimeout(() => {
      const {item} = this.props;
      const isFinished = item?.status === 'finished';
      if (!isFinished) {
        this.setState({showMembersModal: this.props.showMembersList || false});
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.closeModal !== prevProps.closeModal) {
      this.setState({showMembersModal: false});
    }
  }

  componentWillUnmount() {
    this.setState({
      description: null,
      loadMore: false,
      isActiveInappropriateContent: false,
    });
  }

  cannotEdit = () => {
    Alert.alert(
      i18n.t(''),
      i18n.t('alerts.youCannotEditThisEvent'),
      [
        {
          text: 'OK',
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  handleUpdate = () => {
    const {item} = this.props;
    if (item?.status === 'in_progress') {
      this.cannotEdit();
    } else {
      this.props.navigation.navigate('EditEvent', {eventId: item._id});
    }
  };

  handleDelete = async () => {
    await this.props.makeAction(LOADER_VISIBLE, true);
    const {item} = await this.props;
    await this.props.makeAction(DELETE_EVENT_REQUEST, {eventId: item._id});
  };

  saveEvent = () => {
    const {item, eventDetailsUpdate} = this.props;
    const data = {
      callBack: (res) => {
        if (eventDetailsUpdate) {
          eventDetailsUpdate();
        } else {
          this.props?.refreshEvents();
        }
      },
      error: () => {},
      eventId: item._id,
    };
    this.props.makeAction(SAVE_EVENT, data);
  };

  sendReport = (content) => {
    const {item, screenData} = this.props;
    this._RBSheetReport.close();
    // this[RBSheet + 'general'].close();
    const data = {
      content: content,
      userId: screenData.profile._id,
      eventId: item._id,
    };
    this.props.makeAction(SEND_REPORT_REASON, data);
  };

  goToEventView = () => {
    const {item} = this.props;
    this.props.navigation.navigate('EventView', {
      id: item._id,
    });
  };

  navigateToChat = (userId) => {
    const {item} = this.props;
    const data = {
      callBack: (res) => {
        this.props.makeAction(SET_ACTIVE_CHAT_ID, res.data.chatId);
        this.props.makeAction(ACTIVE_CHAT_USER_ID, userId);
        let data = {
          chatId: res.data.chatId,
          callBack: () => {},
        };
        this.props.makeAction(CONTENT_MESSAGE, data);
        this.props.navigation.navigate('ChatScreen');
      },
      error: () => {},
      userId,
    };
    this.props.makeAction(GET_CHAT_BY_USER_ID, data);
  };

  navigateToComment = () => {
    this.props.navigation.navigate('EventComment', {
      event: this.props.item,
    });
  };

  sendRequest = () => {
    const {item, screenData, eventDetailsUpdate} = this.props;
    const data = {
      callBack: (res) => {
        if (eventDetailsUpdate) {
          eventDetailsUpdate();
        } else {
          this.props?.refreshEvents();
        }
        // refreshEvents
      },
      error: () => {},
      userId: screenData.profile._id,
      eventId: item._id,
    };
    this.props.makeAction(SEND_REQUEST_EVENT, data);
  };

  rejectEvent = (id) => {
    const {eventDetailsUpdate} = this.props;
    const data = {
      callBack: () => {
        if (eventDetailsUpdate) {
          eventDetailsUpdate();
        } else {
          this.props?.refreshEvents();
        }
      },
      error: () => {},
      id,
    };
    this.props.makeAction(REJECT_EVENT, data);
  };
  viewVideo = () => {
    !this.state.view
      ? this.setState({view: true})
      : this.setState({view: false});
  };

  isIosVideoModal = (
    config,
    isFullScreen,
    uploadedFile,
    fullVideo,
    playButton,
    modalContainer,
    closeVideo,
    closeVideoContainer,
    modalContent,
    item,
  ) => {
    return (
      <GestureRecognizer
        onSwipeRight={this.viewVideo}
        config={config}
        style={{
          flex: 1,
        }}>
        <Modal
          statusBarTranslucent={true}
          transparent={true}
          visible={true}
          animationType="slide"
          style={{flex: 1}}
          onRequestClose={this.viewVideo}>
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={'rgba(0,0,0,0.3)'}
            onPress={this.viewVideo}
            style={modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={modalContent}>
                <View style={closeVideoContainer}>
                  <TouchableOpacity style={closeVideo} onPress={this.viewVideo}>
                    <Cancel
                      iconWidth={IconsStyles.small}
                      iconHeight={IconsStyles.small}
                      iconColor="white"
                    />
                  </TouchableOpacity>
                </View>
                <Video
                  source={{
                    uri: uploadedFile,
                  }}
                  ref={(ref) => {
                    this.player = ref;
                  }}
                  muted={!!isFullScreen}
                  controls={!!isFullScreen}
                  hideShutterView={true}
                  onLoad={(res) => {
                    console.log(res, ' VIDEO LOAD');
                  }}
                  resizeMode={'cover'}
                  style={isFullScreen ? fullVideo : playButton}
                  paused={!isFullScreen}
                />
              </View>
            </TouchableWithoutFeedback>
          </TouchableHighlight>
        </Modal>
      </GestureRecognizer>
    );
  };

  isAndroidVideoModal = (
    config,
    isFullScreen,
    uploadedFile,
    fullVideo,
    playButton,
    modalContainer,
    closeVideo,
    closeVideoContainer,
    modalContent,
    item,
  ) => {
    console.log(uploadedFile, 999);
    return (
      <GestureRecognizer
        onSwipeRight={this.viewVideo}
        config={config}
        style={{
          position: 'absolute',
          top: -5,
          zIndex: 999,
        }}>
        <View
          style={{width: fullScreen.width, height: fullScreen.height + 150}}>
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={'rgba(0,0,0,0.3)'}
            onPress={this.viewVideo}
            style={modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={modalContent}>
                <View style={closeVideoContainer}>
                  <TouchableOpacity style={closeVideo} onPress={this.viewVideo}>
                    <Cancel
                      iconWidth={IconsStyles.small}
                      iconHeight={IconsStyles.small}
                      iconColor="white"
                    />
                  </TouchableOpacity>
                </View>
                <Video
                  source={{
                    uri: uploadedFile,
                  }}
                  ref={(ref) => {
                    this.player = ref;
                  }}
                  muted={!!isFullScreen}
                  controls={!!isFullScreen}
                  hideShutterView={true}
                  onLoad={(res) => console.log(res)}
                  resizeMode={'contain'}
                  style={isFullScreen ? fullVideo : playButton}
                  paused={!isFullScreen}
                />
              </View>
            </TouchableWithoutFeedback>
          </TouchableHighlight>
        </View>
      </GestureRecognizer>
    );
  };
  HASHTAG_FORMATTER = (string) => {
    if (string) {
      const word = string.split(' ');
      return word.filter(Boolean).map((v, i) => {
        if (v.startsWith('#') || v.startsWith('@')) {
          return (
            <Text key={i} style={{color: '#3761CD'}}>
              {v + ' '}
            </Text>
          );
        } else {
          return <Text key={i}>{v + ' '}</Text>;
        }
      });
    }
  };

  showComment = () => {
    const {item, routeName} = this.props;
    const {comment, commentCount} = item;
    if (routeName === 'EventView' && !isEmpty(comment)) {
      return (
        <>
          <View
            style={{
              borderColor: '#E3E3E3',
              backgroundColor: '#E3E3E3',
              borderWidth: 0.4,
              marginVertical: Sizes.size10,
            }}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: Sizes.size12,
                fontWeight: DeviceInfo.ios ? '500' : 'bold',
                color: Colors.charGreen,
              }}>
              {comment?.user.name || comment?.user.nickname}
            </Text>
            <Text
              style={{
                fontSize: Sizes.size12,
                fontWeight: '400',
                color: Colors.charGreen,
                marginLeft: Sizes.size7,
              }}>
              {this.HASHTAG_FORMATTER(comment?.comment)}
            </Text>
          </View>
          <Pressable onPress={this.navigateToComment}>
            <Text
              style={{
                fontSize: Sizes.size12,
                fontWeight: '400',
                color: Colors.silver,
                marginTop: Sizes.size7,
              }}>
              {i18n.t('texts.see_all_comment') + ` (${commentCount})`}
            </Text>
          </Pressable>
        </>
      );
    }
  };

  showVideo = (screen) => {
    const {item, theme} = this.props;
    const {
      fullVideo,
      playButton,
      modalContainer,
      closeVideo,
      closeVideoContainer,
      modalContent,
    } = styles(theme);
    const uploadedFile = item?.file?.length ? item.file[0].url : '';
    const isFullScreen = screen === 'fullScreen';
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <>
        {isFullScreen ? (
          deviceInfo.ios ? (
            this.isIosVideoModal(
              config,
              isFullScreen,
              uploadedFile,
              fullVideo,
              playButton,
              modalContainer,
              closeVideo,
              closeVideoContainer,
              modalContent,
              item,
            )
          ) : (
            this.isAndroidVideoModal(
              config,
              isFullScreen,
              uploadedFile,
              fullVideo,
              playButton,
              modalContainer,
              closeVideo,
              closeVideoContainer,
              modalContent,
              item,
            )
          )
        ) : (
          <Video
            source={{
              uri: uploadedFile ? uploadedFile : '',
            }}
            ref={(ref) => (this.player = ref)}
            muted={!!isFullScreen}
            controls={!!isFullScreen}
            hideShutterView={true}
            resizeMode={'cover'}
            style={isFullScreen ? fullVideo : playButton}
            paused={!isFullScreen}
          />
        )}
      </>
    );
  };
  onCapture = (uri) => {
    console.log('do something with ', uri);
  };

  render() {
    const {
      item,
      navigation,
      theme,
      eventDetails,
      screenData,
      routeName,
      eventLoader,
      loader,
    } = this.props;
    const {
      descriptionMove,
      loadMore,
      isActiveInappropriateContent,
      showMembersModal,
      confirmDelete,
    } = this.state;
    const {
      locationButton,
      removeIconContainer,
      greyText,
      spamRbsHeetContainer,
      spamTitle,
      videoBlock,
      videoControl,
      closeVideo,
      sendButtonGradient,
      sendButton,
      sendButtonText,
      usersDataContainer,
      boldDesc,
      videoView,
      eventItemHeader,
      eventItemUsername,
      leftEventContainer,
      leftEventText,
      deleteRequestContainer,
      deleteRequestText,
      moreContainer,
      eventDetailContainer,
      eventDetail,
      eventDetailHeader,
      customSliderContainer,
      disabledLink,
    } = styles(theme);
    const {GRADIENT_COLOR, PRIMARY_BACKGROUND_COLOR} = theme;
    const {
      PRIMARY_COLOR_BOLD,
      PRIMARY_COLOR_LIGHT,
      INPUT_DEFAULT_COLOR,
      SECONDARY_COLOR_LIGHT,
    } = theme.color;
    const {createdBy, status} = item;
    const STATUS_BAR = StatusBar.statusBarHeight || 24;
    const isFinished = item.status === 'finished';
    const shareEvent = async (item) => {
      this.props.makeAction(LOADER_VISIBLE, true);
      this.setState({shareView: true});
    };

    const shareEventViewShot = (item) => {
      return (
        <Animatable.View
          useNativeDriver={true}
          animation="fadeInUpBig"
          easing="ease-in-out"
          style={{
            paddingRight: Sizes.size5,
          }}>
          <ShareEventView
            item={item}
            onPress={() => {
              this.setState({shareView: false});
              this.props.makeAction(LOADER_VISIBLE, false);
            }}
          />
        </Animatable.View>
      );
    };
    const sendRequestSwitch = (request) => {
      let requestStatus = request?.status ? request?.status : '';
      switch (requestStatus) {
        case '':
          return (
            <>
              <LineGradientButton
                onPress={this.sendRequest}
                title={i18n.t('buttons.join')}
                paddingHorizontal={0.01}
                paddingVertical={0.01}
                marginTop={0.01}
                testStyle={sendButtonText}
                customStyle={{
                  width: Sizes.size148,
                  paddingVertical: Sizes.size6,
                }}
              />
              {/* <LinearGradient
                start={{ x: 0, y: 0.9 }}
                end={{ x: 1.3, y: 0.5 }}
                colors={GRADIENT_COLOR}
                style={sendButtonGradient}>
                <TouchableOpacity onPress={this.sendRequest} style={sendButton}>
                  <Text style={sendButtonText}>{i18n.t('buttons.join')}</Text>
                </TouchableOpacity>
              </LinearGradient> */}
            </>
          );

        case 'approved':
          return (
            <TouchableOpacity
              onPress={() => {
                this.rejectEvent(item?.sendRequest?._id);
              }}
              style={leftEventContainer}>
              <Text style={leftEventText}>{i18n.t('buttons.leave')}</Text>
            </TouchableOpacity>
          );

        case 'pending':
          return (
            <TouchableOpacity
              onPress={() => {
                this.rejectEvent(item?.sendRequest?._id);
              }}
              style={deleteRequestContainer}>
              <Text style={deleteRequestText}>
                {i18n.t('buttons.delete_a_request')}
              </Text>
            </TouchableOpacity>
          );
        default:
          break;
      }
    };

    const androidVideoParams = () => {
      return deviceInfo.android && routeName === 'EventView';
    };
    InAppReview.isAvailable();
    return (
      <>
        <View
          style={[
            eventDetailContainer,
            {
              width: androidVideoParams() ? fullScreen.width : null,
              height: androidVideoParams()
                ? fullScreen.height + Sizes.size10
                : null,
            },
          ]}>
          <View style={eventDetail}>
            {eventDetails ? (
              <View style={eventDetailHeader}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EventsList');
                  }}>
                  <ArrowLeft
                    IconWidth={IconsStyles.medium}
                    IconHeight={IconsStyles.medium}
                    IconColor={'#818195'}
                  />
                </TouchableOpacity>
              </View>
            ) : null}

            <View>
              <Avatar
                userId={createdBy?._id}
                onPressAvatar={() => {}}
                width={Sizes.size35}
                height={Sizes.size35}
                data={{
                  picture: createdBy?.picture,
                }}
                verified={createdBy?.verificationDetails?.verified}
                active={status}
              />
            </View>
            <View style={eventItemHeader}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={eventItemUsername}>
                {createdBy?.name ? createdBy?.name : createdBy?.nickname}
              </Text>
              <AirbnbRating
                count={5}
                reviews={false}
                showRating={false}
                defaultRating={Math.round(createdBy?.rating) || 0}
                size={Sizes.size10}
                isDisabled={true}
                selectedColor="#FFA012"
              />
            </View>
            {item.createdBy?._id !== screenData.profile?._id && !isFinished ? (
              <TouchableOpacity
                onPress={() => {
                  this._RBSheetReport.open();
                }}
                style={moreContainer}>
                <More
                  IconHeight={IconsStyles.medium}
                  IconWidth={IconsStyles.medium}
                  IconColor={PRIMARY_COLOR_BOLD}
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={customSliderContainer}>
            <CustomSlider
              imageStyle={{
                height: Sizes.size355,
                width:
                  routeName === 'EventView'
                    ? deviceInfo.deviceWidth
                    : deviceInfo.deviceWidth - Sizes.size20,
              }}
              pressOnImage={() => {
                if (routeName === 'EventsList') {
                  this.goToEventView();
                }
              }}
              addEvent={false}
              data={item.image}
            />
            <TouchableOpacity
              onPress={() => {
                MapServices.setGoBackInMap(true);
                this.props.makeAction(SELECTED_EVENT, item);
                this.props.navigation.push('Menu');
              }}
              style={locationButton}>
              <ChooseLocation
                IconWidth={Sizes.size24}
                IconHeight={Sizes.size24}
                IconColor={PRIMARY_COLOR_LIGHT}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingVertical: Sizes.size11,
              paddingHorizontal: Sizes.size12,
            }}>
            {!isFinished ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: Sizes.size13,
                  marginTop: Sizes.size4,
                }}>
                {item.createdBy?._id !== screenData.profile?._id
                  ? sendRequestSwitch(item?.sendRequest)
                  : null}
                <TouchableOpacity
                  onPress={() => {
                    this.setState({showMembersModal: true});
                  }}
                  style={
                    item.createdBy?._id !== screenData.profile?._id
                      ? {paddingLeft: Sizes.size14}
                      : null
                  }>
                  <JoinedUsers
                    IconWidth={Sizes.size24}
                    IconHeight={Sizes.size24}
                    IconColor={PRIMARY_COLOR_LIGHT}
                    activeIndicatore={item?.receivedRequest}
                  />
                </TouchableOpacity>

                {/* {eventDetails && item.createdBy?._id !== screenData.profile?._id ? (
                <TouchableOpacity
                  onPress={() => {
                    this.navigateToChat(item.createdBy?._id);
                  }}
                  style={{
                    paddingHorizontal: Sizes.size8,
                  }}>
                  <Messages
                    IconWidth={Sizes.size24}
                    IconHeight={Sizes.size24}
                    IconColor={PRIMARY_COLOR_LIGHT}
                  />
                </TouchableOpacity>
              ) : null} */}

                <TouchableOpacity
                  onPress={this.navigateToComment}
                  style={{paddingLeft: Sizes.size14}}>
                  <CommentIcon
                    IconWidth={Sizes.size21}
                    IconHeight={Sizes.size21}
                    IconColor={PRIMARY_COLOR_LIGHT}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => shareEvent(item)}
                  style={{
                    paddingLeft: Sizes.size14,
                  }}>
                  {loader && this.state.shareView ? (
                    <ActivityIndicator
                      size={Sizes.size24}
                      color={Colors.silver}
                    />
                  ) : (
                    <SendIcon
                      IconWidth={Sizes.size24}
                      IconHeight={Sizes.size24}
                      IconColor={PRIMARY_COLOR_LIGHT}
                    />
                  )}
                </TouchableOpacity>

                {item.createdBy?._id === screenData.profile?._id &&
                routeName === 'EventView' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      flex: 1,
                    }}>
                    {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                    {/*  {item?.viewCount && (*/}
                    {/*    <View*/}
                    {/*      style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                    {/*      <BigEye*/}
                    {/*        IconColor={PRIMARY_COLOR_LIGHT}*/}
                    {/*        IconWidth={Sizes.size10}*/}
                    {/*        IconHeight={Sizes.size10}*/}
                    {/*      />*/}
                    {/*      <Text*/}
                    {/*        style={{*/}
                    {/*          fontSize: Sizes.size10,*/}
                    {/*          fontWeight: '400',*/}
                    {/*          lineHeight: Sizes.size12,*/}
                    {/*          marginHorizontal: Sizes.size7,*/}
                    {/*        }}>*/}
                    {/*        {item?.viewCount}*/}
                    {/*      </Text>*/}
                    {/*    </View>*/}
                    {/*  )}*/}
                    {/*  {item?.savedCount ? (*/}
                    {/*    <View*/}
                    {/*      style={{*/}
                    {/*        marginHorizontal: Sizes.size4,*/}
                    {/*        flexDirection: 'row',*/}
                    {/*        alignItems: 'center',*/}
                    {/*      }}>*/}
                    {/*      <Favorites*/}
                    {/*        IconWidth={Sizes.size10}*/}
                    {/*        IconHeight={Sizes.size10}*/}
                    {/*        IconColor={PRIMARY_COLOR_LIGHT}*/}
                    {/*      />*/}
                    {/*      <Text*/}
                    {/*        style={{*/}
                    {/*          fontSize: Sizes.size10,*/}
                    {/*          fontWeight: '400',*/}
                    {/*          lineHeight: Sizes.size12,*/}
                    {/*          marginHorizontal: Sizes.size7,*/}
                    {/*        }}>*/}
                    {/*        {item?.savedCount}*/}
                    {/*      </Text>*/}
                    {/*    </View>*/}
                    {/*  ) : null}*/}
                    {/*</View>*/}
                    <TouchableOpacity
                      onPress={this.handleUpdate}
                      style={{
                        marginRight: Sizes.size14,
                      }}>
                      <Edit
                        IconWidth={Sizes.size24}
                        IconHeight={Sizes.size24}
                        IconColor={PRIMARY_COLOR_LIGHT}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        Animated.timing(this.state.confirmDelete, {
                          toValue: 0,
                          duration: 300,
                        }).start();
                      }}>
                      <Bin
                        IconWidth={Sizes.size22}
                        IconHeight={Sizes.size22}
                        IconColor={PRIMARY_COLOR_LIGHT}
                      />
                    </TouchableOpacity>

                    <Animated.View
                      style={{
                        padding: Sizes.size5,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        backgroundColor: 'white',
                        position: 'absolute',
                        right: confirmDelete,
                        top: 0,
                        width: Sizes.size103,
                        height: Sizes.size39,
                        borderRadius: Sizes.size9,
                        borderWidth: 0.5,
                        borderColor: '#E3E3E3',
                      }}>
                      <TouchableOpacity
                        disabled={loader}
                        onPress={this.handleDelete}
                        style={{
                          padding: Sizes.size5,
                        }}>
                        {loader ? (
                          <ActivityIndicator
                            size={Sizes.size20}
                            color={'#A347FF'}
                          />
                        ) : (
                          <CheckConfirm IconHeight={12} IconWidth={13} />
                        )}
                      </TouchableOpacity>
                      <View
                        style={{
                          borderWidth: 0.5,
                          borderColor: '#E3E3E3',
                          height: '100%',
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          Animated.timing(this.state.confirmDelete, {
                            toValue: -Sizes.size150,
                            duration: 300,
                          }).start();
                        }}
                        style={{
                          padding: Sizes.size5,
                        }}>
                        <Cancel
                          iconHeight={Sizes.size13}
                          iconWidth={Sizes.size13}
                          iconColor={'red'}
                        />
                      </TouchableOpacity>
                    </Animated.View>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={{
                      marginLeft: 'auto',
                    }}
                    onPress={() => {
                      this.saveEvent();
                    }}>
                    {item?.isSaved ? (
                      <ActiveFavorites
                        IconWidth={Sizes.size24}
                        IconHeight={Sizes.size24}
                        IconColor={'#F3267D'}
                      />
                    ) : (
                      <Favorites
                        IconWidth={Sizes.size24}
                        IconHeight={Sizes.size24}
                        IconColor={PRIMARY_COLOR_LIGHT}
                      />
                    )}
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
            {eventDetails ? (
              <>
                <View
                  style={{
                    marginBottom: Sizes.size12,
                    width: '100%',
                  }}>
                  <Text
                    ellipsizeMode="tail"
                    style={{
                      width: '90%',
                      color: '#818195',
                      fontSize: Sizes.size10,
                    }}>
                    {moment(item.date).format('MMMM Do, YYYY  |  HH:mm')}
                    {item?.createdBy?._id === screenData?.profile?._id ||
                    item?.sendRequest?.status === 'approved'
                      ? `, ${item?.location?.name}`
                      : ''}
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: '#E3E3E3',
                    backgroundColor: '#E3E3E3',
                    borderWidth: 0.4,
                    marginBottom: Sizes.size10,
                  }}
                />
              </>
            ) : null}

            <View
              style={{
                marginBottom: Sizes.size8,
              }}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  color: INPUT_DEFAULT_COLOR,
                  fontSize: Sizes.size15,
                  fontWeight: deviceInfo.ios ? '500' : 'bold',
                  lineHeight: 18,
                  fontFamily: Fonts.medium,
                }}>
                {item.title}
              </Text>
            </View>
            <View>
              <Text
                numberOfLines={2}
                style={{
                  color: INPUT_DEFAULT_COLOR,
                  fontSize: Sizes.size12,
                  fontWeight: 'normal',
                  lineHeight: 18,
                }}>
                {descriptionMove || eventDetails
                  ? item?.description
                  : item?.description?.slice(0, 80)}

                {item.description?.length > 80 && !loadMore && !eventDetails ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        descriptionMove: true,
                        loadMore: true,
                      });
                    }}>
                    <Text
                      style={{
                        fontSize: Sizes.size12,
                        fontWeight: 'normal',
                        color: '#999999',
                        marginVertical: -3,
                        marginHorizontal: 5,
                      }}>
                      {i18n.t('texts.more')}
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </Text>
            </View>
            {this.showComment()}
          </View>
          {showMembersModal ? (
            <Members
              refreshEvents={this.props?.refreshEvents}
              closeMembersModal={() => this.setState({showMembersModal: false})}
              eventId={item?._id}
              createdById={item.createdBy._id}
            />
          ) : null}
          {/* <RBSheet
          ref={(ref) => {
            this[RBSheet + 'general'] = ref;
          }}
          height={Sizes.size80}
          openDuration={250}
          closeOnDragDown={true}
          customStyles={{
            container: {
              backgroundColor: PRIMARY_BACKGROUND_COLOR,
            },
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              paddingHorizontal: Sizes.size10,
            }}>

            {item.createdBy?._id !== screenData.profile?._id ?
              <TouchableOpacity
                onPress={() => {
                  this[RBSheet + 'general'].close();
                  setTimeout(() => {
                    this[RBSheet + 'report'].open();
                  }, 500);
                }}
                style={removeIconContainer}>
                <Text style={greyText}>{i18n.t('texts.complain')}</Text>
              </TouchableOpacity>
              : null}


            <TouchableOpacity
              activeOpacity={1}
              disabled={true}
              style={[removeIconContainer, disabledLink]} >
              <Text style={greyText}>{i18n.t('texts.copy_link')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              disabled={true}
              style={[removeIconContainer, disabledLink]} >
              <Text style={greyText}>{i18n.t('texts.showSimilar')}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              disabled={true}
              style={[removeIconContainer, disabledLink]} >
              <Text style={greyText}>{i18n.t('texts.hideFromFeed')}</Text>
            </TouchableOpacity>
          </View>
        </RBSheet> */}

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
                backgroundColor: PRIMARY_BACKGROUND_COLOR,
                height: isActiveInappropriateContent
                  ? deviceInfo.deviceHeight - STATUS_BAR
                  : 160,
                borderTopLeftRadius: Sizes.size20,
                borderTopRightRadius: Sizes.size20,
              },
            }}>
            {!isActiveInappropriateContent ? (
              <View style={spamRbsHeetContainer}>
                <View>
                  <Text style={spamTitle}>
                    <Translation label={'spamInfo.title'} />
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.sendReport(i18n.t('spamInfo.thisSpam'));
                  }}
                  style={removeIconContainer}>
                  <Text style={greyText}>
                    <Translation label={'spamInfo.thisSpam'} />
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      isActiveInappropriateContent: true,
                    });
                  }}
                  style={removeIconContainer}>
                  <Text style={greyText}>
                    <Translation label={'spamInfo.inappropriateContent'} />
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
                      IconColor={PRIMARY_COLOR_LIGHT}
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
          {item?.file?.length ? (
            <View style={usersDataContainer}>
              <Text style={boldDesc}>
                <Translation label={'texts.attachedFiles'} />
              </Text>
              <View style={videoView}>
                {this.showVideo('partScreen')}
                <TouchableOpacity onPress={this.viewVideo}>
                  <Play
                    style={{justifyContent: 'center', alignItems: 'center'}}
                    IconHeight={IconsStyles.bigSize}
                    IconWidth={IconsStyles.bigSize}
                    IconColor={SECONDARY_COLOR_LIGHT}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {this.state.view && item?.file?.length
            ? // <View style={videoBlock}>
              //   <View style={videoControl}>
              //     <TouchableOpacity onPress={this.viewVideo}>
              //       <Cancel
              //         style={closeVideo}
              //         iconWidth={IconsStyles.small}
              //         iconHeight={IconsStyles.small}
              //         iconColor="white"
              //       />
              //     </TouchableOpacity>
              //   </View>
              this.showVideo('fullScreen')
            : // </View>
              null}
        </View>
        {this.state.shareView && shareEventViewShot(item)}
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    theme: store.themes.theme,
    activeChatId: store.Chat.activeChatId,
    settings: store.profileData.settings,
    comments: store.eventComment.comments,
    commentCount: store.eventComment.commentCount,
    eventLoader: store.eventList.eventLoader,
    loader: store.loader.LoaderVisible,
  };
};

export default connect(mapStateToProps, {makeAction})(EventsListItem);
