import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {SafeAreaView, View} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './styles';
import i18n from '../../assets/i18next';
import RadioForm from 'react-native-simple-radio-button';
import {CHANGE_SETTINGS_REQUEST} from '../../actionsTypes';
import AsyncStorage from '@react-native-community/async-storage';
import {Sizes} from '../../assets/styles';
import {MenuRadio} from '../../components/MenuRadio';
import {Colors} from '../../assets/styles';

const radio_props = [
  {label: 'Русский (Russia)', value: 'ru'},
  {label: 'English (United Kingdom)', value: 'en'},
];

class ChangeLanguage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeValue: this.props.settings.language,
    };
  }

  changeLanguage = (value) => {
    i18n.changeLanguage(value);
    this.props.makeAction(CHANGE_SETTINGS_REQUEST, {language: value});
    AsyncStorage.setItem('language', value);
    this.setState({activeValue: value});
  };

  render() {
    const {navigation, theme} = this.props;
    const {activeValue} = this.state;
    const {container, contentContainer} = styles(theme);
    return (
      <SafeAreaView>
        <ScreenHeader
          title={'appLanguage'}
          leftIcon={'back'}
          leftIconPress={() => {
            navigation.goBack();
          }}
        />
        <View style={container}>
          <View style={contentContainer}>
            {radio_props.map((elem) => {
              let value = elem.value === activeValue;
              return (
                <MenuRadio
                  titleText={elem.label}
                  showActiveText={value}
                  value={value}
                  onPress={() => {
                    this.changeLanguage(elem.value);
                  }}
                  change={() => {
                    this.changeLanguage(elem.value);
                  }}
                  tintColors={Colors.blueViolet}
                />
              );
            })}
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
    profileData: store.profileData.profile,
  };
};

export default connect(mapStateToProps, {makeAction})(ChangeLanguage);
