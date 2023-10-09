import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {styles} from './styles';
import {AirbnbRating} from 'react-native-ratings';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {
  DELETE_NOTIFICATION_REQUEST,
  GET_EVENT_BY_ID,
  RATE_USER_REQUEST,
  SET_EVENT_VIEW_LOADER_VISIBLE,
} from '../../actionsTypes';
import Translation from '../../Translation';
import {Avatar, LineGradientButton, ScreenLoader} from '../../components';
import {Sizes} from '../../assets/styles';
import {Cancel, Rate, Rate2, Rate3, Rate4, Rate5} from '../../components/Icons';
import * as Animatable from 'react-native-animatable';
import {TextInput} from 'react-native-gesture-handler';
import {deviceInfo} from '../../assets/deviceInfo';
import i18n from '../../assets/i18next';

class RateComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 2,
      comment: '',
      succesFull: false,
    };
  }

  componentDidMount() {
    const {id} = this.props.navigation.state.params;
    this.props.makeAction(GET_EVENT_BY_ID, {id});
  }

  handleBackButtonClick = () => {
    return true;
  };

  deleteNotification() {
    const noteId = this.props.navigation.state.params.notificationId;
    this.props.makeAction(DELETE_NOTIFICATION_REQUEST, {noteId});
    return;
  }

  ratingCompleted = (rating) => {
    this.setState({rating: rating});
  };

  changeComment = (comment) => {
    this.setState({comment: comment});
  };

  cancel = () => {
    this.props.navigation.navigate('Menu');
  };

  handleRate = () => {
    const {createdBy} = this.props.event;
    const {rating} = this.state;
    this.setState({succesFull: true});
    this.scrollRef?.scrollTo({y: 0, animated: false});
    this.props.makeAction(SET_EVENT_VIEW_LOADER_VISIBLE, true);
    this.props.makeAction(RATE_USER_REQUEST, {userId: createdBy._id, rating});
    this.deleteNotification();
  };

  render() {
    const {screenLoader, theme, event, navigation} = this.props;
    const {
      buttonContainer,
      fullContainer,
      titleContainer,
      headerTitle,
      pageTitle,
      ratingStyle,
      cancelIcon,
      commentContainer,
      headerContainer,
      inputStyle,
      eventItemHeader,
      rateButton,
      feedBackText,
      footerContainer,
      eventDetail,
      notNowContainer,
      fullHeigth,
    } = styles(theme);
    const {createdBy} = event;
    const {rating, succesFull} = this.state;

    const rateSmiles = (rating) => {
      switch (rating) {
        case 1:
          return (
            <Animatable.View
              useNativeDriver={true}
              animation="zoomIn"
              easing="ease-in-out"
              style={{
                width: Sizes.size185,
                paddingRight: Sizes.size5,
              }}>
              <Rate IconWidth={Sizes.size207} IconHeight={Sizes.size197} />
            </Animatable.View>
          );

        case 2:
          return (
            <Animatable.View
              useNativeDriver={true}
              animation="bounceInDown"
              easing="ease-in-out"
              style={{
                width: Sizes.size185,
                paddingRight: Sizes.size5,
              }}>
              <Rate2 IconWidth={Sizes.size207} IconHeight={Sizes.size197} />
            </Animatable.View>
          );
        case 3:
          return (
            <Animatable.View
              useNativeDriver={true}
              animation="fadeInUp"
              easing="ease-in-out"
              style={{
                width: Sizes.size185,
                paddingRight: Sizes.size5,
              }}>
              <Rate3 IconWidth={Sizes.size207} IconHeight={Sizes.size197} />
            </Animatable.View>
          );
        case 4:
          return (
            <Animatable.View
              useNativeDriver={true}
              animation="zoomInUp"
              easing="ease-in-out"
              style={{
                width: Sizes.size185,
                paddingRight: Sizes.size5,
              }}>
              <Rate4 IconWidth={Sizes.size207} IconHeight={Sizes.size197} />
            </Animatable.View>
          );
        case 5:
          return (
            <Animatable.View
              useNativeDriver={true}
              animation="pulse"
              easing="ease-in-out"
              style={{
                width: Sizes.size185,
                paddingRight: Sizes.size5,
              }}>
              <Rate5 IconWidth={Sizes.size207} IconHeight={Sizes.size197} />
            </Animatable.View>
          );
      }
    };
    return (
      <>
        {screenLoader ? <ScreenLoader /> : null}
        <KeyboardAvoidingView
          behavior={deviceInfo.ios ? 'padding' : null}
          style={{flex: 1}}>
          <ScrollView ref={(ref) => (this.scrollRef = ref)}>
            <View
              style={{
                flex: 1,
              }}>
              {!succesFull ? (
                <View style={fullContainer}>
                  <View style={headerContainer}>
                    <Text style={headerTitle}>
                      {i18n.t('headerTitle.event_finished')}
                    </Text>
                    <TouchableOpacity
                      style={cancelIcon}
                      activeOpacity={0.7}
                      onPress={this.cancel}>
                      <Cancel
                        iconWidth={Sizes.size15}
                        iconHeight={Sizes.size15}
                        iconColor={'#818195'}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <View style={titleContainer}>
                      <Text style={pageTitle}>
                        {i18n.t('headerTitle.passed_event')}
                      </Text>
                    </View>
                  </View>
                  <View style={eventDetail}>
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
                        active={createdBy?.status}
                      />
                    </View>
                    <View style={eventItemHeader}>
                      <Text ellipsizeMode="tail" numberOfLines={1}>
                        {createdBy?.name
                          ? createdBy?.name
                          : createdBy?.nickname}
                      </Text>
                      <AirbnbRating
                        count={5}
                        reviews={false}
                        showRating={false}
                        defaultRating={createdBy?.rating || 0}
                        size={Sizes.size10}
                        isDisabled={true}
                        selectedColor="#FFA012"
                      />
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <View style={ratingStyle}>{rateSmiles(rating)}</View>
                    <AirbnbRating
                      count={5}
                      reviews={false}
                      showRating={false}
                      defaultRating={rating}
                      size={Sizes.size40}
                      selectedColor="#FFA012"
                      onFinishRating={this.ratingCompleted}
                    />
                  </View>
                  {/* <View style={commentContainer}>
                    <TextInput
                      onFocus={this.scrollRef?.scrollToEnd}
                      multiline={true}
                      placeholder={i18n.t('inputs.placeholder.addComment')}
                      style={inputStyle}
                      onChangeText={this.changeComment}
                      placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
                    />
                  </View> */}
                  <View style={footerContainer}>
                    <View style={buttonContainer}>
                      <View style={rateButton}>
                        <LineGradientButton
                          title={<Translation label={'buttons.rate'} />}
                          onPress={() => this.handleRate()}
                        />
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={this.cancel}>
                          <Text style={notNowContainer}>
                            {i18n.t('texts.notNow')}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={[fullContainer, fullHeigth]}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={feedBackText}>
                      {i18n.t('headerTitle.feedback')}
                    </Text>
                    <Image
                      source={require('../../assets/images/rateAll.png')}
                    />
                  </View>
                  <View
                    style={[
                      footerContainer,
                      {marginTop: 'auto', paddingBottom: Sizes.size50},
                    ]}>
                    <View style={buttonContainer}>
                      <View style={rateButton}>
                        <LineGradientButton
                          title={<Translation label={'buttons.done'} />}
                          onPress={() => navigation.navigate('Menu')}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    screenLoader: store.eventScreenLoader.eventScreenLoader,
    theme: store.themes.theme,
    event: store.eventList.event,
  };
};
export default connect(mapStateToProps, {makeAction})(RateComponent);
