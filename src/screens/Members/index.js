import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {Avatar, LineGradientButton} from '../../components';
import {styles} from './styles';
import {makeAction} from '../../makeAction';
import {Cancel} from '../../components/Icons';
import {Sizes} from '../../assets/styles';
import {connect} from 'react-redux';
import {AirbnbRating} from 'react-native-ratings';
import Translation from '../../Translation';
import {
  GET_MEMBERS_LIST_BY_ID,
  GET_ALL_JOIN_REQUESTS,
  ACCEPT_EVENT,
  REJECT_EVENT,
  CANCEL_EVENT,
  SET_MEMBER_LIST_LOADER,
} from '../../actionsTypes';
import NavigationService from '../../NavigationService';
import {deviceInfo} from '../../assets/deviceInfo';
import i18n from '../../assets/i18next';
import GestureRecognizer from 'react-native-swipe-gestures';
import {isEmpty} from 'lodash';

class Members extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      title: '',
      membersInformation: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.props.makeAction(SET_MEMBER_LIST_LOADER, true);
    setTimeout(() => {
      this.getListInformation();
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.eventId !== prevProps.eventId) {
      this.setState({membersInformation: []}, () => {
        this.props.makeAction(SET_MEMBER_LIST_LOADER, true);
        this.getListInformation();
      });
    }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    this.setState({
      membersInformation: [],
    });
  }

  mutationResponse = (data) => {
    return data.map((elem) => {
      if (!isEmpty(elem.userId)) {
        return {
          user: {
            image: elem?.userId?.picture,
            name: elem?.userId?.name,
            nickname: elem?.userId?.nickname,
            rating: elem.userId.rating,
            email: elem?.userId?.email,
            verified: elem?.userId?.verificationDetails?.verified,
            userId: elem?.userId._id,
          },
          status: elem.status,
          id: elem._id,
        };
      }
    });
  };

  getListInformation = () => {
    const {eventId, createdById, screenData} = this.props;
    const data = {
      error: () => {},
      eventId,
    };
    if (createdById === screenData.profile._id) {
      data.callBack = (res) => {
        this.setState({
          membersInformation: this.mutationResponse(res?.data?.requests),
          title: 'requests',
        });
      };
      this.props.makeAction(GET_ALL_JOIN_REQUESTS, data);
    } else {
      data.callBack = (res) => {
        this.setState({
          membersInformation: this.mutationResponse(res?.data?.members),
          title: 'participants',
        });
      };
      this.props.makeAction(GET_MEMBERS_LIST_BY_ID, data);
    }
  };

  back = () => {
    this.props.navigation.goBack();
    this.props.refreshEvents();
  };

  closeModal = () => {
    this.props.closeMembersModal();
    this.props?.refreshEvents ? this.props.refreshEvents() : null;
  };

  handleBackButtonClick() {
    this.props.refreshEvents();
    this.props.navigation.goBack(null);

    return true;
  }
  refresh = async () => {
    const {refreshing} = this.state;
    if (!refreshing) {
      this.setState({refreshing: true});
    }
    await this.getListInformation();
    this.setState({refreshing: false});
  };

  emptyComponent = () => {
    const {theme} = this.props;
    const {title} = this.state;
    const {emptyComponentText, absoluteCenter} = styles(theme);

    return (
      <View
        style={[
          absoluteCenter,
          {
            zIndex: -1,
          },
        ]}>
        {title ? (
          <Text style={emptyComponentText}>
            {i18n.t(`texts.empty_text_${title}`)}
          </Text>
        ) : null}
      </View>
    );
  };

  render() {
    const {theme, screenData, createdById, memberListLoader} = this.props;
    const {title, membersInformation, refreshing} = this.state;
    const {GRADIENT_COLOR} = theme;
    const {
      absoluteCenter,
      container,
      memberContainer,
      mainInfo,
      viewProfile,
      viewProfileText,
      headerText,
      modalContainer,
      headerContent,
      acceptContainer,
      asseptContainerTextStyle,
    } = styles(theme);

    const renderItem = ({item}) => {
      return (
        <View>
          <View style={memberContainer}>
            <View>
              <Avatar
                userId={item?.user?.userId}
                width={Sizes.size43}
                height={Sizes.size43}
                data={{
                  picture: item?.user?.image,
                }}
                onPressAvatar={this.closeModal}
                verified={item?.user?.verified}
              />
            </View>
            <View style={mainInfo}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  color: '#2C2C2C',
                  fontSize: 14,
                  marginLeft: Sizes.size3,
                }}>
                {item?.user?.name ? item?.user?.name : item?.user?.nickname}
              </Text>
              <AirbnbRating
                count={5}
                reviews={false}
                showRating={false}
                defaultRating={Math.round(item?.user?.rating) || 0}
                size={Sizes.size15}
                isDisabled={true}
                selectedColor="#FFA012"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                NavigationService.navigate('UserProfile', {
                  userId: item?.user?.userId,
                });
                this.closeModal();
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

    const renderItemAccept = ({item}) => {
      const acceptRequest = (id) => {
        const data = {
          callBack: (res) => {
            this.getListInformation();
          },
          error: () => {},
          id,
        };
        this.props.makeAction(ACCEPT_EVENT, data);
      };

      const rejectEvent = (id) => {
        const data = {
          callBack: () => {
            this.getListInformation();
          },
          error: () => {},
          id,
          type: 'reject',
        };
        this.props.makeAction(REJECT_EVENT, data);
      };

      const cancelEvent = (id) => {
        const data = {
          callBack: () => {
            this.getListInformation();
          },
          error: () => {},
          id,
        };
        this.props.makeAction(CANCEL_EVENT, data);
      };

      const handleStatus = (status) => {
        const defaultElem = () => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                flexDirection: 'row',
                paddingRight: Sizes.size20,
              }}>
              <LineGradientButton
                onPress={() => acceptRequest(item.id)}
                title={i18n.t('texts.accept').toUpperCase()}
                paddingHorizontal={0.01}
                paddingVertical={0.01}
                marginTop={0.01}
                customStyle={acceptContainer}
                testStyle={asseptContainerTextStyle}
              />

              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: -Sizes.size5,
                  padding: Sizes.size6,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  rejectEvent(item.id);
                }}>
                <Cancel
                  iconColor={'#C6C6D0'}
                  iconHeight={Sizes.size10}
                  iconWidth={Sizes.size10}
                />
              </TouchableOpacity>
            </View>
          );
        };

        switch (status) {
          case '':
            return defaultElem();
          case 'approved':
            return (
              <>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    flexDirection: 'row',
                    paddingRight: Sizes.size20,
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      cancelEvent(item.id);
                    }}
                    style={[{backgroundColor: '#F3F3F3'}, acceptContainer]}>
                    <Text
                      style={{
                        color: '#818195',
                        fontWeight: deviceInfo.ios ? '600' : 'bold',
                        fontSize: Sizes.size12,
                        lineHeight: 15,
                      }}>
                      <Translation label={'texts.remove'} />
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      right: -Sizes.size5,
                      padding: Sizes.size6,
                      alignSelf: 'center',
                    }}
                    onPress={() => {
                      rejectEvent(item.id);
                    }}>
                    <Cancel
                      iconColor={'#C6C6D0'}
                      iconHeight={Sizes.size10}
                      iconWidth={Sizes.size10}
                    />
                  </TouchableOpacity>
                </View>
              </>
            );

          default:
            return defaultElem();
        }
      };

      return (
        <View style={memberContainer}>
          <View>
            <Avatar
              onPressAvatar={this.closeModal}
              userId={item?.user?.userId}
              width={Sizes.size43}
              height={Sizes.size43}
              data={{
                picture: item.user.image,
              }}
              verified={item?.user?.verified} ///waiting from backend
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
              {item?.user?.name ? item?.user?.name : item?.user?.nickname}
            </Text>
            <AirbnbRating
              count={5}
              reviews={false}
              showRating={false}
              defaultRating={Math.round(item?.user?.rating) || 0}
              size={Sizes.size10}
              isDisabled={true}
              selectedColor="#FFA012"
            />
          </View>
          {handleStatus(item?.status)}
        </View>
      );
    };

    const myEvents = createdById === screenData.profile._id;

    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    return (
      <GestureRecognizer
        onSwipeRight={this.closeModal}
        config={config}
        style={{
          flex: 1,
        }}>
        <Modal
          statusBarTranslucent={true}
          transparent={true}
          visible={true}
          animationType="slide"
          onRequestClose={this.closeModal}>
          <TouchableHighlight
            activeOpacity={0.7}
            underlayColor={'rgba(0,0,0,0.3)'}
            onPress={this.closeModal}
            style={modalContainer}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={container}>
                {memberListLoader ? (
                  <ActivityIndicator
                    style={absoluteCenter}
                    size={30}
                    color={'#A347FF'}
                  />
                ) : null}
                <View style={headerContent}>
                  <Text style={headerText}>
                    {title ? <Translation label={`texts.${title}`} /> : null}
                  </Text>
                  <TouchableOpacity
                    style={{
                      padding: Sizes.size10,
                      position: 'absolute',
                      right: Sizes.size10,
                      top: Sizes.size10,
                    }}
                    onPress={this.closeModal}>
                    <Cancel
                      iconColor={'#C6C6D0'}
                      iconHeight={14}
                      iconWidth={14}
                    />
                  </TouchableOpacity>
                </View>
                {membersInformation?.length ? (
                  <FlatList
                    data={membersInformation}
                    keyExtractor={(data) => data.id.toString()}
                    renderItem={myEvents ? renderItemAccept : renderItem}
                    style={{
                      marginBottom: Sizes.size15,
                      height: '100%',
                    }}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={this.refresh}
                        tintColor={'#A347FF'}
                      />
                    }
                  />
                ) : !membersInformation?.length && !memberListLoader ? (
                  this.emptyComponent()
                ) : null}
              </View>
            </TouchableWithoutFeedback>
          </TouchableHighlight>
        </Modal>
      </GestureRecognizer>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    members: store.eventList.members,
    count: store.profileData.count,
    profile: store.profileData.profile,
    theme: store.themes.theme,
    screenData: store.profileData,
    memberListLoader: store.eventList.memberListLoader,
  };
};
export default connect(mapStateToProps, {makeAction})(Members);
