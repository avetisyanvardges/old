import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {
  Image,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
  ScrollView,
  RefreshControl,
  Pressable,
} from 'react-native';
import {styles} from './styles';
import {AirbnbRating} from 'react-native-ratings';
import {Colors, IconsStyles, Sizes} from '../../assets/styles';
import {
  ACTIVE_CHAT_USER_ID,
  BLOCK_USER,
  CONTENT_MESSAGE,
  GET_CHAT_BY_USER_ID,
  GET_TOTAL_COUNT,
  GET_USER_BY_ID,
  SET_ACTIVE_CHAT_ID,
  UNBLOCK_USER,
  SET_USER_DATA,
} from '../../actionsTypes';
import Translation from '../../Translation';
import {Facebook} from '../../components/Icons/facebook';
import {
  ActiveHome,
  ArrowLeft,
  CheckedIcon,
  Favorites,
  Instagram,
  Lock,
  More,
  Settings,
  UsersAllEvent,
  Vk,
} from '../../components/Icons';
import {Avatar, LineGradientButton, ScreenLoader} from '../../components';
import {deviceInfo} from '../../assets/deviceInfo';
import RBSheet from 'react-native-raw-bottom-sheet';
import ScreenFooter from '../../components/ScreenFooter';
import i18n from '../../assets/i18next';
import * as Animatable from 'react-native-animatable';
import {withNavigationFocus} from 'react-navigation';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      userEvents: {},
      activeFilterType: '',
      profileImage: [],
      getCounts: null,
      refreshing: false,
    };
  }
  componentDidMount() {
    this.getUserEvents();
    this.getTotalCount();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.getUserEvents();
      this.getTotalCount();
    }
  }

  getTotalCount = () => {
    const {userId} = this.props.navigation?.state?.params;
    const data = {
      callBack: (res) => {
        this.setState({getCounts: res.data});
      },
      error: (err) => {
        console.log(err);
      },
      id: userId,
    };
    this.props.makeAction(GET_TOTAL_COUNT, data);
  };
  getUserEvents = () => {
    const {userId} = this.props.navigation?.state?.params;
    const {activeFilterType} = this.state;
    const data = {
      id: userId,
      queryType: activeFilterType,
      callBack: (res) => {
        let mutatuinPayload = [
          ...res.data.user.user_events.map((element) => {
            element.location.lang = element.location.lang
              ? element.location.lang
              : element?.location?.coordinates?.length &&
                element?.location?.coordinates[0]
              ? element?.location?.coordinates[0]
              : 0;
            element.location.lat = element.location.lat
              ? element.location.lat
              : element?.location?.coordinates?.length &&
                element?.location?.coordinates[1]
              ? element?.location?.coordinates[1]
              : 0;
            if (element.location.coordinates) {
              delete element.location.coordinates;
            }
            return element;
          }),
        ];
        this.setState({
          userInfo: {
            user_data: res.data.user.user_data,
            user_events: mutatuinPayload,
          },
          profileImage: res.data.user.user_data.picture,
        });
      },
    };
    this.props.makeAction(GET_USER_BY_ID, data);
  };

  navigateToChatScreen = (userId, information) => {
    const {name, picture, rating, verificationDetails, _id} = information;
    const mutationData = {name, picture, rating, verificationDetails, _id};
    const data = {
      callBack: (res) => {
        this.props.makeAction(SET_ACTIVE_CHAT_ID, res.data.chatId);
        this.props.makeAction(SET_USER_DATA, mutationData);
        this.props.makeAction(ACTIVE_CHAT_USER_ID, userId);
        let data = {
          chatId: res.data.chatId,
          callBack: () => {},
        };
        this.props.makeAction(CONTENT_MESSAGE, data);
        this.props.navigation.navigate('ChatScreen');
      },
      error: (err) => {
        console.log(err);
      },
      userId,
    };
    this.props.makeAction(GET_CHAT_BY_USER_ID, data);
  };

  loadInBrowser = (userID, link) => {
    if (userID) {
      let url = `https://www.${link}.com/${userID}`;
      Linking.openURL(url);
    }
  };

  isFinished = (status) => {
    return status === 'finished';
  };
  changeFilterType = (type) => {
    this.setState({activeFilterType: type}, () => {
      this.getUserEvents();
    });
  };
  renderItem = ({item, index}) => {
    const {userDataInformation, screenData, theme} = this.props;
    const imageSize = deviceInfo.deviceWidth / 3 - Sizes.size9;
    const {activeBajeContainer, activeBajeText, finishedEvent} = styles(theme);
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          this.props.navigation.navigate('EventView', {
            id: item._id,
          });
        }}
        style={{
          margin: Sizes.size1,
          height: imageSize,
          width: imageSize,
          borderColor: '#818195',
          marginBottom:
            index === this.state.userInfo.user_events.length - 1 &&
            userDataInformation?._id !== screenData._id
              ? Sizes.size60
              : null,
        }}>
        <>
          {this.isFinished(item?.status) ? (
            <View style={finishedEvent}>
              <CheckedIcon
                IconWidth={Sizes.size16}
                IconHeight={Sizes.size16}
                IconColor={'#FFA012'}
              />
            </View>
          ) : null}

          {item?.status === 'in_progress' ? (
            <View style={activeBajeContainer}>
              <Text style={activeBajeText}>LIVE</Text>
            </View>
          ) : null}
          <Image
            style={{height: '100%', width: '100%'}}
            source={item?.image[0]?.url ? {uri: item?.image[0]?.url} : ''}
          />
        </>
      </TouchableOpacity>
    );
  };

  openModal = () => {
    this.RBSheet.open();
  };

  blockUser = (blockedId) => {
    this.RBSheet.close();
    const data = {
      callBack: async (res) => {
        await this.getUserEvents();
        await this.props.navigation.navigate('Menu');
      },
      error: () => {
        this.RBSheet.close();
      },
      blockedId,
    };
    this.props.makeAction(BLOCK_USER, data);
  };

  unBlockUser = (blockedId) => {
    const data = {
      callBack: (res) => {
        this.RBSheet.close();
        this.getUserEvents();
      },
      error: () => {
        this.RBSheet.close();
      },
      blockedId,
    };
    this.props.makeAction(UNBLOCK_USER, data);
  };

  refreshing = async () => {
    const {refreshing} = this.state;
    if (!refreshing) {
      this.setState({refreshing: true});
    }
    await this.getUserEvents();
    await this.getTotalCount();
    this.setState({refreshing: false});
  };
  render() {
    const {user_data, user_events} = this.state.userInfo;
    const {navigation, theme, screenData} = this.props;
    const {
      activeFilterType,
      profileImage,
      getCounts,
      userInfo,
      refreshing,
    } = this.state;
    const {
      container,
      imageContainer,
      contentContainer,
      filtersContainer,
      editProfileButton,
      editProfileButtonText,
      filtersItem,
      flatListStyle,
      greyText,
      headerContainer,
      nickNameStyle,
      eventInfoContainer,
      eventInfoTitle,
      eventInfoSubtitle,
      aboutMe,
      flex_1,
      closedAccountContainer,
      closedAccountText,
      underline,
      removeIconContainer,
    } = styles(theme);

    const userDataInformation = this.state.userInfo.user_data;
    const filtersType = [];
    if (userDataInformation?._id === screenData._id) {
      filtersType.push(
        {
          icon: (IconColor) => (
            <UsersAllEvent
              IconWidth={Sizes.size24}
              IconHeight={Sizes.size24}
              IconColor={IconColor}
            />
          ),
          type: 'my_joined',
        },
        {
          icon: (IconColor) => (
            <ActiveHome
              IconWidth={Sizes.size27}
              IconHeight={Sizes.size24}
              IconColor={IconColor !== '#A347FF' ? IconColor : null}
            />
          ),
          type: '',
        },
        {
          icon: (IconColor) => (
            <Favorites
              IconWidth={Sizes.size24}
              IconHeight={Sizes.size24}
              IconColor={IconColor}
            />
          ),
          type: 'saved',
        },
      );
    } else {
      filtersType.push(
        {
          icon: (IconColor) => (
            <UsersAllEvent
              IconWidth={Sizes.size21}
              IconHeight={Sizes.size21}
              IconColor={IconColor}
            />
          ),
          type: 'my_joined',
        },
        {
          icon: (IconColor) => (
            <ActiveHome
              IconWidth={Sizes.size27}
              IconHeight={Sizes.size24}
              IconColor={IconColor !== '#A347FF' ? IconColor : null}
            />
          ),
          type: '',
        },
      );
    }

    const closedAccountLock = () => {
      if (
        userDataInformation?._id !== screenData?._id &&
        userInfo.user_data.closedAccount === 'on'
      ) {
        return (
          <View style={closedAccountContainer}>
            <Lock
              IconWidth={Sizes.size34}
              IconHeight={Sizes.size40}
              IconColor={Colors.blueViolet}
            />
            <Text style={closedAccountText}>
              {' '}
              {i18n.t('texts.closedAccaunt')}{' '}
            </Text>
          </View>
        );
      } else if (user_events) {
        return (
          <FlatList
            numColumns={3}
            columnWrapperStyle={{justifyContent: 'flex-start'}}
            style={flatListStyle}
            data={user_events}
            renderItem={(item) => {
              return this.renderItem(item);
            }}
            keyExtractor={(item) => item._id}
          />
        );
      }
    };

    return (
      <>
        {!userDataInformation || !screenData ? (
          <ScreenLoader splashScreen={true} />
        ) : (
          <View style={{flex: 1}}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={this.refreshing}
                  tintColor={'#A347FF'}
                />
              }>
              <View style={headerContainer}>
                <View style={flex_1}>
                  {userDataInformation?._id !== screenData?._id ? (
                    <Animatable.View
                      useNativeDriver={true}
                      animation="fadeInUp"
                      easing="ease-out-cubic">
                      <TouchableOpacity
                        onPress={() => this.props.navigation.goBack()}
                        activeOpacity={0.7}>
                        <ArrowLeft
                          IconWidth={Sizes.size20}
                          IconHeight={Sizes.size20}
                          IconColor={'#818195'}
                        />
                      </TouchableOpacity>
                    </Animatable.View>
                  ) : null}
                </View>
                {userDataInformation?._id === screenData._id ? (
                  <Animatable.View
                    useNativeDriver={true}
                    animation="fadeIn"
                    easing="ease-out-cubic">
                    <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('EditProfile');
                        }}
                        style={editProfileButton}>
                      <Text style={editProfileButtonText}>
                        {i18n.t('headerTitle.edit_profile')}
                      </Text>
                    </TouchableOpacity>


                  </Animatable.View>
                ) : (
                  <Text style={nickNameStyle}>
                    {userDataInformation?.nickname
                      ? userDataInformation?.nickname
                      : userDataInformation?.name}
                  </Text>
                )}

                <View
                  style={[
                    flex_1,
                    {flexDirection: 'row', justifyContent: 'flex-end'},
                  ]}>
                  {userDataInformation?._id !== screenData?._id ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.openModal();
                      }}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: [{rotate: '90deg'}],
                        paddingVertical: Sizes.size11,
                      }}>
                      <More
                        IconWidth={IconsStyles.medium}
                        IconHeight={IconsStyles.medium}
                        IconColor={'#818195'}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Settings');
                      }}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: [{rotate: '90deg'}],
                        paddingVertical: Sizes.size11,
                      }}>
                      <Settings
                        IconWidth={Sizes.size24}
                        IconHeight={Sizes.size24}
                        IconColor={Colors.gray}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              <View style={container}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'space-around',
                  }}>
                  <View style={eventInfoContainer}>
                    <Text style={eventInfoTitle}>
                      {getCounts?.memberTotalCount}
                    </Text>
                    <Text style={eventInfoSubtitle}>
                      {i18n.t('texts.meets_with')}
                    </Text>
                  </View>
                  <View>
                    <Avatar
                      CheckMarkWidth={Sizes.size27}
                      margin={3.5}
                      borderWidth={Sizes.size3}
                      radius={Sizes.size35}
                      width={Sizes.size100}
                      height={Sizes.size100}
                      data={{picture: profileImage}}
                      verified={
                        userDataInformation?.verificationDetails?.verified
                      }
                    />
                  </View>
                  <View style={eventInfoContainer}>
                    <Text style={eventInfoTitle}>
                      {getCounts?.eventTotalCount}
                    </Text>
                    <Text style={eventInfoSubtitle}>
                      {i18n.t('texts.events')}
                    </Text>
                  </View>
                </View>
                <View style={contentContainer}>
                  <View style={{marginBottom: Sizes.size6}}>
                    <Text style={nickNameStyle}>
                      {userDataInformation?.name
                        ? userDataInformation?.name
                        : userDataInformation?.nickname}
                    </Text>
                  </View>
                  <AirbnbRating
                    count={5}
                    reviews={false}
                    showRating={false}
                    defaultRating={Math.round(userDataInformation?.rating) || 0}
                    size={Sizes.size15}
                    isDisabled={true}
                    selectedColor="#FFA012"
                  />
                  <View
                    style={{
                      borderColor: '#E3E3E3',
                      borderWidth: 0.5,
                      width: Sizes.size50,
                      marginTop: Sizes.size20,
                    }}
                  />

                  {userDataInformation?.aboutMe ? (
                    <Text style={aboutMe}>{userDataInformation?.aboutMe}</Text>
                  ) : null}
                  {userDataInformation?._id !== screenData?._id &&
                  userInfo.user_data.closedAccount === 'on' ? (
                    <Text> </Text>
                  ) : (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: Sizes.size20,
                      }}>
                      {userDataInformation?._id !== screenData?._id ? (
                        <LineGradientButton
                          customStyle={{
                            marginRight: Sizes.size16,
                          }}
                          paddingVertical={Sizes.size6}
                          paddingHorizontal={Sizes.size35}
                          onPress={() =>
                            this.navigateToChatScreen(
                              userDataInformation?._id,
                              userDataInformation,
                            )
                          }
                          title={i18n.t('buttons.write_me')}
                          marginTop={0.01}
                        />
                      ) : null}
                      <TouchableOpacity
                        disabled={!userDataInformation?.links?.facebook}
                        style={{
                          opacity: !userDataInformation?.links?.facebook
                            ? 0.3
                            : 1,
                        }}
                        onPress={() =>
                          this.loadInBrowser(
                            userDataInformation?.links?.facebook,
                            'facebook',
                          )
                        }>
                        <View
                          style={{
                            padding: Sizes.size15,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Facebook
                            IconWidth={Sizes.size24}
                            IconHeight={Sizes.size24}
                            IconColor={'black'}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        disabled={!userDataInformation?.links?.vkontakte}
                        style={{
                          opacity: !userDataInformation?.links?.vkontakte
                            ? 0.3
                            : 1,
                        }}
                        onPress={() =>
                          this.loadInBrowser(
                            userDataInformation?.links?.vkontakte,
                            'vk',
                          )
                        }>
                        <View
                          style={{
                            padding: Sizes.size15,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Vk
                            IconWidth={Sizes.size24}
                            IconHeight={Sizes.size24}
                            IconColor={'black'}
                          />
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        disabled={!userDataInformation?.links?.instagram}
                        style={{
                          opacity: !userDataInformation?.links?.instagram
                            ? 0.3
                            : 1,
                        }}
                        onPress={() =>
                          this.loadInBrowser(
                            userDataInformation?.links?.instagram,
                            'instagram',
                          )
                        }>
                        <View
                          style={{
                            padding: Sizes.size15,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Instagram
                            IconWidth={Sizes.size24}
                            IconHeight={Sizes.size24}
                            IconColor={'black'}
                          />
                        </View>
                      </TouchableOpacity>
                      {/* <TouchableOpacity

                      style={{
                        padding: Sizes.size15,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Messages
                        IconWidth={Sizes.size23}
                        IconHeight={Sizes.size23}
                        IconColor={'black'}
                      />
                    </TouchableOpacity> */}
                    </View>
                  )}
                </View>
              </View>
              {userDataInformation?._id !== screenData?._id &&
              userInfo.user_data.closedAccount === 'on' ? (
                <View style={underline} />
              ) : filtersType?.length ? (
                <Animatable.View
                  style={filtersContainer}
                  useNativeDriver={true}
                  duration={300}
                  animation="fadeInUp"
                  easing="ease-out-cubic">
                  {filtersType.map((elem, index) => {
                    return (
                      <TouchableOpacity
                        key={index.toString()}
                        onPress={() => {
                          this.changeFilterType(elem.type);
                        }}
                        style={filtersItem}>
                        {elem.icon(
                          activeFilterType === elem.type
                            ? '#A347FF'
                            : '#D0D0D0',
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </Animatable.View>
              ) : null}
              {closedAccountLock()}

              <RBSheet
                ref={(ref) => {
                  this.RBSheet = ref;
                }}
                height={Sizes.size100}
                closeOnDragDown={true}
                customStyles={{
                  container: {
                    backgroundColor: theme.PRIMARY_BACKGROUND_COLOR,
                    borderTopLeftRadius: Sizes.size20,
                    borderTopRightRadius: Sizes.size20,
                  },
                }}>
                <View style={{paddingHorizontal: Sizes.size6}}>
                  {/* <TouchableOpacity
                    activeOpacity={1}
                    disabled={true}
                    style={[linkStyle, disabledLink]}>
                    <Text style={greyText}>{i18n.t('texts.share')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={1}
                    disabled={true}
                    style={[linkStyle, disabledLink]}>
                    <Text style={greyText}>{i18n.t('texts.copy_link')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    disabled={true}
                    style={[linkStyle, disabledLink]}>
                    <Text style={greyText}>{i18n.t('texts.complain')}</Text>
                  </TouchableOpacity> */}
                  {!userDataInformation?.blocked ? (
                    <TouchableOpacity
                      style={removeIconContainer}
                      onPress={() => this.blockUser(userDataInformation?._id)}>
                      <Text style={greyText}>
                        <Translation label={'texts.blockThisUser'} />
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={removeIconContainer}
                      onPress={() =>
                        this.unBlockUser(userDataInformation?._id)
                      }>
                      <Text style={greyText}>
                        <Translation label={'texts.unBlockThisUser'} />
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </RBSheet>
            </ScrollView>
            {userDataInformation?._id === screenData?._id ? (
              <ScreenFooter active={'Settings'} navigation={navigation} />
            ) : null}
          </View>
        )}
      </>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
    screenData: store.profileData.profile,
    event: store.eventList.event,
    settings: store.profileData.settings,
  };
};
export default connect(mapStateToProps, {makeAction})(
  withNavigationFocus(UserProfile),
);
