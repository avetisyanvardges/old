import React, {Component} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
import {Colors, IconsStyles, Shadow, Sizes} from '../../assets/styles';
import {Avatar} from '../Avatar';
import {AirbnbRating} from 'react-native-ratings';
import {ArrowLeft, CommentIcon, icons, More} from '../Icons';
import {makeAction} from '../../makeAction';
import RBSheet from 'react-native-raw-bottom-sheet';
import Translation from '../../Translation';
import {deviceInfo} from '../../assets/deviceInfo';
import i18n from '../../assets/i18next';
import {reportTypes} from '../../assets/utils/reportTypes';
import {SEND_REPORT_REASON} from '../../actionsTypes';
import * as Animatable from 'react-native-animatable';
import NavigationService from '../../NavigationService';
import moment from 'moment';

class MapEventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMore: false,
      isActiveInappropriateContent: false,
      showModal: true,
    };
  }

  componentDidMount() {
    let loc = this.props.settings.language === 'en' ? 'en-au' : 'ru';
    moment.locale(loc);
  }

  sendReport = (content) => {
    const {item, screenData} = this.props;
    this[RBSheet + 'report'].close();
    // this[RBSheet + 'general'].close();
    const data = {
      content: content,
      userId: screenData._id,
      eventId: item._id,
    };
    this.props.makeAction(SEND_REPORT_REASON, data);
  };

  render() {
    const {navigation, openModal, theme, event, screenData, item} = this.props;
    const {loadMore, isActiveInappropriateContent, showModal} = this.state;
    const {
      locationButton,
      removeIconContainer,
      greyText,
      spamRbsHeetContainer,
      spamTitle,
      cardTitle,
      cardTitleContainer,
      contentFeedBack,
      flexCenter,
      nameContainer,
      topbarContainer,
      backgroundImage,
      flex,
      cardDescription,
      disabledLink,
    } = styles(theme);
    const {GRADIENT_COLOR, PRIMARY_BACKGROUND_COLOR} = theme;
    const {
      PRIMARY_COLOR_BOLD,
      PRIMARY_COLOR_LIGHT,
      INPUT_DEFAULT_COLOR,
    } = theme.color;
    const {createdBy, description} = item;
    const STATUS_BAR = StatusBar.statusBarHeight || 24;

    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={true}
        style={{
          alignItems: 'center',
        }}>
        <Animatable.View
          duration={300}
          useNativeDriver={true}
          animation="zoomIn"
          easing="ease-out-cubic"
          style={{flex: 1}}>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
              this.props.pressOnMarker(null);
            }}
            style={flexCenter}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={contentFeedBack}>
                <View
                  style={{
                    padding: Sizes.size13,
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Avatar
                      margin={2.2}
                      borderWidth={1}
                      radius={Sizes.size12}
                      onPressAvatar={() => {
                        this.props.pressOnMarker(null);
                      }}
                      userId={createdBy?._id}
                      width={Sizes.size35}
                      height={Sizes.size35}
                      data={{picture: item.picture}}
                      verified={item.verified}
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
                        defaultRating={Math.round(item?.createdBy?.rating) || 0}
                        size={Sizes.size10}
                        isDisabled={true}
                        selectedColor="#FFA012"
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      this[RBSheet + 'report'].open();
                    }}
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
                <TouchableOpacity
                  onPress={() => {
                    this.props.pressOnMarker(null);
                    NavigationService.navigate('EventView', {
                      id: item._id,
                    });
                  }}
                  activeOpacity={0.7}
                  style={{
                    height: Sizes.size340,
                  }}>
                  <Image
                    style={backgroundImage}
                    resizeMode="cover"
                    source={{uri: item?.image?.url}}
                  />
                  <View style={cardTitleContainer}>
                    <View style={{marginTop: Sizes.size15}}>
                      <Text
                        ellipsizeMode="tail"
                        style={{
                          width: '90%',
                          color: Colors.silver,
                          fontSize: Sizes.size12,
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
                            {item.title}
                          </Text>
                          <Text
                            ellipsizeMode="tail"
                            numberOfLines={2}
                            style={cardDescription}>
                            {item.description}
                          </Text>
                        </View>
                      </View>
                      <Pressable
                        onPress={() =>
                          NavigationService.navigate('EventComment', {
                            event: item,
                          })
                        }>
                        <CommentIcon
                          IconWidth={Sizes.size25}
                          IconHeight={Sizes.size25}
                          IconColor={PRIMARY_COLOR_LIGHT}
                        />
                      </Pressable>
                    </View>
                  </View>
                </TouchableOpacity>

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
                    {item.createdBy?._id !== screenData?._id ? (
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
                    ) : null}

                    <TouchableOpacity
                      activeOpacity={1}
                      disabled={true}
                      style={[removeIconContainer, disabledLink]}>
                      <Text style={greyText}>Copy Link</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      disabled={true}
                      style={[removeIconContainer, disabledLink]}>
                      <Text style={greyText}>Show similar items</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      disabled={true}
                      style={[removeIconContainer, disabledLink]}>
                      <Text style={greyText}>Hide from Feed</Text>
                    </TouchableOpacity>
                  </View>
                </RBSheet> */}
                <RBSheet
                  ref={(ref) => {
                    this[RBSheet + 'report'] = ref;
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
                        : 250,
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
                          <Translation
                            label={'spamInfo.inappropriateContent'}
                          />
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={spamRbsHeetContainer}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
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
                            style={removeIconContainer}>
                            <Text key={index} style={greyText}>
                              <Translation
                                label={`spamInfo.inappropriateSubContentTitle.${elem.label}`}
                              />
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </RBSheet>
              </View>
            </TouchableWithoutFeedback>
          </TouchableHighlight>
        </Animatable.View>
      </Modal>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.profileData.profile,
    netInfo: store.netInfo,
    event: store.eventList.event,
    eventType: store.eventList.eventTypes,
    screenLoader: store.eventScreenLoader.eventScreenLoader,
    theme: store.themes.theme,
    settings: store.profileData.settings,
  };
};

export default connect(mapStateToProps, {makeAction})(MapEventList);
