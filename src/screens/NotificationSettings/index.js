import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {Image, SafeAreaView, Text, View} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './styles';
import {Button} from '../../components/Button';
import {CHANGE_SETTINGS_REQUEST} from '../../actionsTypes';
import Translation from '../../Translation';

class NotificationSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  changeSettings = () => {
    const {settings} = this.props;
    let value;
    settings.notification === 'on' ? (value = 'off') : (value = 'on');
    this.props.makeAction(CHANGE_SETTINGS_REQUEST, {notification: value});
  };

  render() {
    const {navigation, settings, theme} = this.props;
    const {
      container,
      contentContainer,
      actionContainer,
      notificationText,
      notificationHeader,
    } = styles(theme);
    return (
      <SafeAreaView>
        <ScreenHeader
          title={'notification'}
          leftIcon={'back'}
          leftIconPress={() => {
            navigation.goBack();
          }}
        />
        <View style={container}>
          <View style={contentContainer}>
            <Image source={require('../../assets/images/notification.png')} />
          </View>
          <View style={notificationText}>
            <Text style={notificationHeader}>
              <Translation label={'texts.notificationHeader'} />
            </Text>
            <Text
              style={{paddingTop: 15, color: theme?.color?.PRIMARY_COLOR_BOLD}}>
              <Translation label={'texts.notificationText'} />
            </Text>
          </View>
          <View style={actionContainer}>
            <Button
              type={'app'}
              size={'big'}
              radius={'radius20'}
              title={settings.notification === 'on' ? 'deny' : 'allow'}
              onPress={this.changeSettings}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    settings: store.profileData.settings,
    theme: store.themes.theme,
  };
};

export default connect(mapStateToProps, {makeAction})(NotificationSettings);
