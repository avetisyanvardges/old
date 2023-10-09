import React, {Component} from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {styles} from './styles';
import {
  Home,
  Plus,
  ActiveHome,
  ActivePlus,
  ActiveChat,
  ActiveEvents,
  Chat,
  EventsDefaultIcon,
} from '../Icons';
import {IconsStyles, Sizes} from '../../assets/styles';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';

class ScreenFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      footerItem: [
        {
          navigateTo: 'Menu',
          links: ['Menu'],
          defaultIcon: (iconColor) => (
            <Home
              IconWidth={Sizes.size40}
              IconHeight={Sizes.size40}
              IconColor={iconColor}
            />
          ),
          activeIcon: () => (
            <ActiveHome IconWidth={Sizes.size37} IconHeight={Sizes.size32} />
          ),
        },
        {
          navigateTo: 'EventsList',
          links: ['EventsList'],
          defaultIcon: (iconColor) => (
            <EventsDefaultIcon
              IconWidth={Sizes.size32}
              IconHeight={Sizes.size32}
              IconColor={iconColor}
            />
          ),
          activeIcon: (iconColor) => (
            <ActiveEvents
              IconWidth={Sizes.size32}
              IconHeight={Sizes.size32}
              IconColor={iconColor}
            />
          ),
        },
        {
          navigateTo: 'AddEvent',
          links: ['AddEvent'],
          defaultIcon: (iconColor) => (
            <Plus
              IconWidth={Sizes.size32}
              IconHeight={Sizes.size32}
              IconColor={iconColor}
            />
          ),
          activeIcon: (iconColor) => (
            <ActivePlus
              IconWidth={Sizes.size32}
              IconHeight={Sizes.size32}
              IconColor={iconColor}
            />
          ),
        },
        {
          navigateTo: 'ChatListScreen',
          links: ['chat', 'Notifications'],
          defaultIcon: (iconColor, activeIndicator) => (
            <Chat
              IconWidth={Sizes.size32}
              IconHeight={Sizes.size32}
              IconColor={iconColor}
              activeIndicator={activeIndicator}
            />
          ),
          activeIcon: (iconColor, activeIndicator) => (
            <Chat
              IconWidth={Sizes.size32}
              IconHeight={Sizes.size32}
              IconColor={iconColor}
              activeIndicator={activeIndicator}
            />
          ),
        },
      ],
      imageUrl: require('../../assets/images/profilePic.png'),
      loaded: false,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {profile} = this.props.screenData;
    if (
      prevState.loaded !== this.state.loaded ||
      prevProps.screenData.profile !== profile
    ) {
      if (
        profile?.picture?.length &&
        profile?.picture[0]?.url &&
        this.state.loaded
      ) {
        this.setState({imageUrl: {uri: profile.picture[0]?.url}});
      }
    }
  }

  navigateTo = (item) => {
    const {unreadNotifications, navigation, onPress} = this.props;
    navigation.navigate(item, {unreadNotifications});
    if (onPress) {
      onPress();
    }
  };
  goUserProfile = () => {
    const {navigation, onPress} = this.props;
    navigation.navigate('UserProfile', {
      userId: this.props.screenData.profile._id,
    });
    if (onPress) {
      onPress();
    }
  };
  render() {
    const {active, unreadNotifications, theme} = this.props;
    const {PRIMARY_COLOR_LIGHT, SECONDARY_COLOR_LIGHT} = theme.color;
    const {
      menuItem,
      activeProfile,
      profileImageContainer,
      footerContainer,
    } = styles(theme);
    const {profile} = this.props.screenData;
    const {footerItem} = this.state;
    const activeIndicator = unreadNotifications > 0;
    console.log(profile, 'PROFILE');
    return (
      <View style={footerContainer}>
        {footerItem.map((elem, index) => {
          return (
            <TouchableOpacity
              key={index.toString()}
              style={menuItem}
              onPress={() => {
                this.navigateTo(elem.navigateTo);
              }}>
              {elem.links.includes(active)
                ? elem.activeIcon(SECONDARY_COLOR_LIGHT, activeIndicator)
                : elem.defaultIcon(PRIMARY_COLOR_LIGHT, activeIndicator)}
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity style={menuItem} onPress={this.goUserProfile}>
          <Image
            source={this.state.imageUrl}
            defaultImage={require('../../assets/images/profilePic.png')}
            errorImage={require('../../assets/images/profilePic.png')}
            style={[
              profileImageContainer,
              active === 'Settings' ? activeProfile : {},
            ]}
            onError={() =>
              this.setState({
                imageUrl: require('../../assets/images/profilePic.png'),
                loaded: false,
              })
            }
            onLoad={() => this.setState({loaded: true})}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    theme: store.themes.theme,
    unreadNotifications: store.profileData.count,
  };
};

export default connect(mapStateToProps, {makeAction})(ScreenFooter);
