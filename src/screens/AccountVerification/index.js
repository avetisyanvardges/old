import React, {Component} from 'react';
import {View, TouchableOpacity, ScrollView, Text} from 'react-native';
import {LineGradientButton, ScreenHeader} from '../../components';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {styles} from './styles';
import {
  CheckedIcon,
  PhotoDocuments,
  SelfieIcon,
  UploadPhoto,
} from '../../components/Icons';
import {Sizes} from '../../assets/styles';
import Translation from '../../Translation';
import i18n from '../../assets/i18next';
class AccountVerification extends Component {
  goToStep = () => {
    const query = {
      activeStep: 1,
    };
    this.props.navigation.navigate('VerificationStep', query);
  };
  render() {
    const {navigation, profileData, theme} = this.props;
    const {
      container,
      verifyInfo,
      verifyInfoContainer,
      verifyTitle,
      verifySubTitle,
      verifySubTitleContainer,
      mb_58,
      uploadImageContainer,
      uploadImageContent,
      uploadImageIcon,
      uploadImageTextContainer,
      uploadImageTitle,
      uploadImageSubTitle,
      mt_74,
      ml_auto,
    } = styles(theme);
    const status = profileData.verificationDetails?.verified;
    return (
      <ScrollView>
        <ScreenHeader
          title={'accountVerification'}
          leftIcon={'back'}
          leftIconPress={() => {
            navigation.goBack();
          }}
        />
        {status === 'not_verified' ? (
          <View style={container}>
            <View style={[verifyInfoContainer, {marginTop: Sizes.size46}]}>
              <Text style={verifyTitle}>
                <Translation label={'verificationSteps.submitDocument'} />
              </Text>
            </View>
            <View style={[verifySubTitleContainer, mb_58]}>
              <Text style={verifySubTitle}>
                <Translation label={'verificationSteps.submitDesc'} />
              </Text>
            </View>

            <TouchableOpacity
              onPress={this.goToStep}
              activeOpacity={0.7}
              style={uploadImageContainer}>
              <View style={uploadImageContent}>
                <View style={uploadImageIcon}>
                  <PhotoDocuments
                    IconWidth={Sizes.size36}
                    IconHeight={Sizes.size42}
                    IconColor={'#818195'}
                  />
                </View>
                <View style={uploadImageTextContainer}>
                  <Text style={uploadImageTitle}>{`${i18n.t(
                    'verificationSteps.step',
                  )} 1`}</Text>
                  <Text
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    style={uploadImageSubTitle}>
                    <Translation label={'headerTitle.photoDocuments'} />
                  </Text>
                </View>
                <View style={ml_auto}>
                  {true ? (
                    <UploadPhoto
                      IconWidth={Sizes.size21}
                      IconHeight={Sizes.size20}
                      IconColor={'#818195'}
                    />
                  ) : (
                    <CheckedIcon
                      IconWidth={Sizes.size21}
                      IconHeight={Sizes.size20}
                      IconColor={'#A347FF'}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.goToStep}
              activeOpacity={0.7}
              style={uploadImageContainer}>
              <View style={uploadImageContent}>
                <View style={uploadImageIcon}>
                  <SelfieIcon
                    IconWidth={Sizes.size36}
                    IconHeight={Sizes.size42}
                    IconColor={'#818195'}
                  />
                </View>
                <View style={uploadImageTextContainer}>
                  <Text style={uploadImageTitle}>{`${i18n.t(
                    'verificationSteps.step',
                  )} 2`}</Text>
                  <Text style={uploadImageSubTitle}>
                    <Translation label={'verificationSteps.takeSelfie'} />
                  </Text>
                </View>
                <View style={ml_auto}>
                  {true ? (
                    <UploadPhoto
                      IconWidth={Sizes.size21}
                      IconHeight={Sizes.size20}
                      IconColor={'#818195'}
                    />
                  ) : (
                    <CheckedIcon
                      IconWidth={Sizes.size21}
                      IconHeight={Sizes.size20}
                      IconColor={'#A347FF'}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>

            <View style={mt_74}>
              <LineGradientButton
                title={i18n.t('verificationSteps.nextStep')}
                onPress={this.goToStep}
              />
            </View>

            {/* <TouchableOpacity>
              <Text style={informationLink}>{i18n.t('verificationSteps.whyIsnedded')}</Text>
            </TouchableOpacity> */}
          </View>
        ) : (
          <View style={[container, {paddingTop: Sizes.size45}]}>
            <View style={verifyInfoContainer}>
              {status === 'pending' ? (
                <Text style={verifyInfo}>
                  {' '}
                  <Translation label={'texts.statusPending'} />{' '}
                </Text>
              ) : (
                <Text style={verifyInfo}>
                  {' '}
                  <Translation label={'texts.statusVerified'} />{' '}
                </Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    netInfo: store.netInfo,
    profileData: store.profileData.profile,
    theme: store.themes.theme,
  };
};
export default connect(mapStateToProps, {makeAction})(AccountVerification);
