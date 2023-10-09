import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './styles';
import {makeAction} from '../../makeAction';
import {connect} from 'react-redux';
import Translation from '../../Translation';
import {ZoomIn, Settings, Notification, History} from '../../components/Icons';
import {Sizes, IconsStyles} from '../../assets/styles';

class SwipeUpHeader extends Component {
  render() {
    const {
      createIconPress,
      notificationIconPress,
      settingsIconPress,
      HistoryIconPress,
      theme,
    } = this.props;
    const {PRIMARY_COLOR_LIGHT} = theme.color;

    const {iconContent, menuText, menuContent} = styles(theme);

    return (
      <View style={{flexDirection: 'row', marginHorizontal: Sizes.size10}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={createIconPress} style={menuContent}>
            <View style={iconContent}>
              <ZoomIn
                IconWidth={IconsStyles.small}
                IconHeight={IconsStyles.small}
                IconColor={PRIMARY_COLOR_LIGHT}
              />
            </View>
            <Text style={menuText}>
              <Translation label={'texts.create'} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={notificationIconPress} style={menuContent}>
            <View style={iconContent}>
              <Notification
                IconWidth={IconsStyles.small}
                IconHeight={IconsStyles.small}
                IconColor={PRIMARY_COLOR_LIGHT}
              />
            </View>
            <Text style={menuText}>
              <Translation label={'headerTitle.notification'} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={settingsIconPress} style={menuContent}>
            <View style={iconContent}>
              <Settings
                IconWidth={IconsStyles.small}
                IconHeight={IconsStyles.small}
                IconColor={PRIMARY_COLOR_LIGHT}
              />
            </View>
            <Text style={menuText}>
              <Translation label={'texts.settings'} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={HistoryIconPress} style={menuContent}>
            <View style={iconContent}>
              <History
                IconWidth={IconsStyles.small}
                IconHeight={IconsStyles.small}
                IconColor={PRIMARY_COLOR_LIGHT}
              />
            </View>
            <Text style={menuText}>
              <Translation label={'texts.history'} />
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
  };
};

export default connect(mapStateToProps, {makeAction})(SwipeUpHeader);
