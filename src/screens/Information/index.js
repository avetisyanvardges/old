import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {Linking, SafeAreaView, View} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './styles';
import {MenuLink} from '../../components';
import {GET_PRIVACY_FILES, GET_TERMS_FILES} from '../../actionsTypes';

class Information extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.makeAction(GET_PRIVACY_FILES);
    this.props.makeAction(GET_TERMS_FILES);
  }
  pickPrivacyFile = () => {
    const {privacyFile} = this.props.privacyFile;
    Linking.openURL(privacyFile);
  };

  pickTermsFile = () => {
    const {terms} = this.props.terms;
    Linking.openURL(terms);
  };

  render() {
    const {navigation, theme} = this.props;
    const {container} = styles(theme);
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR}}>
        <ScreenHeader
          title={'information'}
          leftIcon={'back'}
          leftIconPress={() => {
            navigation.goBack();
          }}
        />
        <View style={container}>
          <MenuLink
            showCircle={false}
            title={'headerTitle.dataUsagePolicy'}
            navigate={''}
            onPress={this.pickPrivacyFile}
          />

          <MenuLink
            showCircle={false}
            title={'headerTitle.termsUse'}
            navigate={''}
            onPress={this.pickTermsFile}
          />

          {/* <MenuLink
              showCircle={false}
              title={'headerTitle.opensourceLibrary'}
              navigate={''}
            /> */}
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
    privacyFile: store.registerScreenData,
    terms: store.registerScreenData,
  };
};
export default connect(mapStateToProps, {makeAction})(Information);
