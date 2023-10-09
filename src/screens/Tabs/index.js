import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import i18n from '../../assets/i18next';

class Tabs extends Component {
  navigateTo = (path) => {
    this.props.navigation.navigate(path);
  };
  handleActiveTab = (active, tabName) => {
    return active === tabName;
  };
  render() {
    const {active, theme, unreadNotifications} = this.props;
    const {
      footerContainer,
      line,
      touchable,
      colorBlueViolet,
      colorSilver,
      linkStyle,
      menuItem,
    } = styles(theme);
    const activeIndicator = unreadNotifications > 0;

    return (
      <View style={footerContainer}>
        <TouchableOpacity
          style={menuItem}
          onPress={() => this.navigateTo('ChatListScreen')}>
          <Text
            style={[
              this.handleActiveTab(active, 'chatList')
                ? colorBlueViolet
                : colorSilver,
              linkStyle,
            ]}>
            {i18n.t('texts.messages')}
          </Text>
        </TouchableOpacity>

        <View style={line} />

        <TouchableOpacity
          style={menuItem}
          onPress={() => this.navigateTo('Notifications')}>
          <Text
            style={[
              this.handleActiveTab(active, 'notification')
                ? colorBlueViolet
                : colorSilver,
              linkStyle,
            ]}>
            {i18n.t('texts.notifications')}
          </Text>
          {activeIndicator ? <View style={touchable} /> : null}
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

export default connect(mapStateToProps, {makeAction})(Tabs);
