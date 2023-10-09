import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {SafeAreaView, View, Text} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './styles';
import {MenuLink} from '../../components';
import i18n from '../../assets/i18next';

class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation, count, theme} = this.props;
    const {fullContainer, container, underLine, smallTitle} = styles(theme);

    return (
      <SafeAreaView style={fullContainer}>
        <ScreenHeader
          title={'account'}
          leftIcon={'back'}
          leftIconPress={() => {
            navigation.goBack();
          }}
        />
        <View style={container}>
          {/* <MenuLink
              showCircle={true}
              title={'headerTitle.telephoneNumber'}
              navigate={'TelephoneNumber'}
            /> */}
          <MenuLink
            showCircle={true}
            title={'headerTitle.email'}
            navigate={'Email'}
          />
          <MenuLink
            showCircle={true}
            title={'headerTitle.password'}
            navigate={'ChangePassword'}
          />
          <View style={underLine} />
          <Text style={smallTitle}>{i18n.t('texts.accountMangement')}</Text>
          {/* <MenuLink
              showCircle={true}
              title={'headerTitle.SwitchAccount'}
              navigate={'SwitchAccount'}
            /> */}
          <MenuLink
            showCircle={true}
            title={'headerTitle.deleteAccount'}
            navigate={'DeleteAccount'}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    count: store.profileData.count,
    theme: store.themes.theme,
    profileData: store.profileData.profile,
  };
};
export default connect(mapStateToProps, {makeAction})(Account);
