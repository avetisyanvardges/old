import React, {Component} from 'react';
import {Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import {styles} from './styles';
import {Settings, History, Verification} from '../Icons';
import {Sizes, IconsStyles} from '../../assets/styles';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {LOGOUT} from '../../actionsTypes';
import Translation from '../../Translation';
import {LoginManager} from 'react-native-fbsdk';
import {AirbnbRating} from 'react-native-ratings';

class DrawerMenu extends Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    LoginManager.logOut();
    this.props.makeAction(LOGOUT);
  };

  itemPress = async (item) => {
    this.props.navigation.navigate(item);
  };

  render() {
    const {theme} = this.props;
    const {PRIMARY_COLOR_LIGHT, PRIMARY_COLOR_BOLD} = theme.color;
    const {
      menuContainer,
      menuFooter,
      buttonLogout,
      menuContent,
      logoutTextStyle,
      menuHeader,
      iconContainer,
      menuItemsContainer,
      menuItemTextStyle,
      subMenuItemText,
      imageContainer,
      userNameTextStyle,
      profileImageContainer,
      rateStyle,
      starStyle,
    } = styles(theme);
    const {profile} = this.props.screenData;
    return (
      <View style={menuContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={menuHeader}>
            <View style={imageContainer}>
              <Image
                source={
                  profile.picture
                    ? {uri: profile.picture}
                    : require('../../assets/images/profilePic.png')
                }
                style={profileImageContainer}
              />
              <View style={rateStyle}>
                <Text
                  style={userNameTextStyle}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                  {profile.firstName
                    ? `${profile.firstName} ${profile.lastName}`
                    : `${profile.username}`}
                </Text>

                <View style={starStyle}>
                  <AirbnbRating
                    count={5}
                    reviews={false}
                    showRating={false}
                    defaultRating={Math.round(profile?.rating) || 0}
                    size={Sizes.size20}
                    isDisabled={true}
                    selectedColor="#FFA012"
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={menuItemsContainer}>
            <Text style={menuItemTextStyle}>
              <Translation label={'texts.account'} />
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.itemPress('Settings');
              }}>
              <View style={menuContent}>
                <View style={iconContainer}>
                  <Settings
                    IconWidth={IconsStyles.medium}
                    IconHeight={IconsStyles.medium}
                    IconColor={PRIMARY_COLOR_LIGHT}
                  />
                </View>
                <Text style={subMenuItemText}>
                  <Translation label={'texts.settings'} />
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.itemPress('AccountVerification');
              }}>
              <View style={menuContent}>
                <View style={iconContainer}>
                  <Verification
                    IconWidth={IconsStyles.medium}
                    IconHeight={IconsStyles.medium}
                    IconColor={PRIMARY_COLOR_BOLD}
                  />
                </View>
                <Text style={subMenuItemText}>
                  <Translation label={'texts.accountVerification'} />
                </Text>
              </View>
            </TouchableOpacity>
            <Text style={menuItemTextStyle}>
              <Translation label={'texts.more'} />
            </Text>

            <TouchableOpacity
              onPress={() => {
                this.itemPress('History');
              }}>
              <View style={menuContent}>
                <View style={iconContainer}>
                  <History
                    IconWidth={IconsStyles.medium}
                    IconHeight={IconsStyles.medium}
                    IconColor={PRIMARY_COLOR_LIGHT}
                  />
                </View>
                <Text style={subMenuItemText}>
                  <Translation label={'texts.history'} />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={menuFooter}>
          <TouchableOpacity style={buttonLogout} onPress={this.logout}>
            <Text style={logoutTextStyle}>
              <Translation label={'texts.sign_out'} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    theme: store.themes.theme,
  };
};

export default connect(mapStateToProps, {makeAction})(DrawerMenu);
