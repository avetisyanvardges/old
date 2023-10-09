import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {SafeAreaView, ScrollView, View, Text} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './styles';
import i18n from '../../assets/i18next';
import {AddUser, Work} from '../../components/Icons';
import {Sizes} from '../../assets/styles';
import {LineGradientButton} from '../../components';

class SwitchAccount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {navigation, theme} = this.props;
    const {
      container,
      topTitle,
      accountTypeContainer,
      accountTypeTitle,
      typeImageContainer,
      accountTypeDesc,
      mb_27,
    } = styles(theme);

    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR}}>
        <ScrollView>
          <ScreenHeader
            title={'SwitchAccount'}
            leftIcon={'back'}
            leftIconPress={() => {
              navigation.goBack();
            }}
          />
          <View style={container}>
            <Text style={[topTitle, mb_27]}>
              {i18n.t('texts.switchAccount')}
            </Text>

            <View style={accountTypeContainer}>
              <View>
                <Text style={accountTypeTitle}>
                  {i18n.t('links.switchAccount.pro')}
                </Text>
                <View style={typeImageContainer}>
                  <AddUser
                    IconWidth={Sizes.size40}
                    IconHeight={Sizes.size40}
                    IconColor={'#818195'}
                  />
                </View>

                <Text style={accountTypeDesc}>
                  {i18n.t('links.switchAccount.pro_brand')}
                </Text>

                <LineGradientButton
                  title={`$ 5 / ${i18n.t('links.switchAccount.month')}`}
                />
              </View>
            </View>

            <View style={accountTypeContainer}>
              <View>
                <Text style={accountTypeTitle}>
                  {i18n.t('links.switchAccount.business')}
                </Text>
                <View style={typeImageContainer}>
                  <Work
                    IconWidth={Sizes.size40}
                    IconHeight={Sizes.size40}
                    IconColor={'#818195'}
                  />
                </View>

                <Text style={accountTypeDesc}>
                  {i18n.t('links.switchAccount.business_brand')}
                </Text>

                <LineGradientButton
                  title={`$ 30 / ${i18n.t('links.switchAccount.month')}`}
                />
              </View>
            </View>
          </View>
        </ScrollView>
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
export default connect(mapStateToProps, {makeAction})(SwitchAccount);
