import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {LineGradientButton, ScreenHeader} from '../../components';
import {styles} from './styles';
import {Sizes} from '../../assets/styles';
import Translation from '../../Translation';
import {
  Camera,
  Cancel,
  CheckedIcon,
  PhotoDocuments,
  SelfieIcon,
} from '../../components/Icons';
import ImagePicker from 'react-native-image-crop-picker';
import {VERIFICATION_REQUEST} from '../../actionsTypes';
import LinearGradient from 'react-native-linear-gradient';
import i18n from '../../assets/i18next';
import {VerificationDoneIcon} from '../../components/Icons/VerificationDone';
import {_uploadFile} from '../../utils/mixins';

class VerificationStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyImage: {},
    };
  }
  componentDidMount() {
    if (this.props.navigation.state.params?.verificationDone) {
      this.backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        () => true,
      );
    }
  }
  componentWillUnmount() {
    if (this.backHandler) {
      this.backHandler.remove();
    }
  }

  selectImage = () => {
    ImagePicker.openCamera({
      width: Sizes.size326,
      height: Sizes.size343,
      cropping: true,
    }).then((image) => {
      const data = {
        height: image.cropRect.height,
        width: image.cropRect.width,
        type: image.mime,
        url: image.path,
        fileSize: image.size,
      };
      this.setState({verifyImage: data});
    });
  };

  deleteImage = () => {
    this.setState({verifyImage: {}});
  };

  nextSteps = async () => {
    const {verifyImage, activeStep} = this.props.navigation.state.params;
    const query = {
      verifyImage: verifyImage
        ? [verifyImage, this.state.verifyImage]
        : this.state.verifyImage,
      activeStep: activeStep + 1,
      verificationDone: false,
    };
    if (activeStep >= 2) {
      const formData = await _uploadFile({
        fileList: [verifyImage, this.state.verifyImage],
      });
      this.props.makeAction(VERIFICATION_REQUEST, {formData});
      query.verificationDone = true;
      this.props.navigation.push('VerificationDone', query);
    } else {
      this.props.navigation.push('VerificationStep', query);
    }
  };
  goSetteing = () => {
    this.props.navigation.push('UserProfile', {
      userId: this.props.screenData.profile._id,
    });
  };
  render() {
    let {activeStep, verificationDone} = this.props.navigation.state.params;
    const {theme, navigation} = this.props;
    const {
      container,
      photoContainer,
      globalContent,
      verifyInfoContainer,
      verifySubTitleContainer,
      verifySubTitle,
      mb_58,
      verifyTitle,
      uploadImageContainer,
      uploadImageContent,
      uploadImageIcon,
      uploadImageTextContainer,
      uploadImageTitle,
      uploadImageSubTitle,
      ml_auto,
      mb_74,
      checkedFixedContainer,
      uploadPhotoFixed,
      deleteImageContainer,
      cancelIconDisablet,
      flex,
      border_radius_12,
      uploadImageObsaluteContainer,
    } = styles(theme);
    const {PRIMARY_COLOR_LIGHT} = theme.color;
    const {verifyImage} = this.state;
    return (
      <View style={container}>
        <ScrollView>
          {!verificationDone ? (
            <ScreenHeader
              title={activeStep === 1 ? 'photoDocuments' : 'takeSelfie'}
              leftIcon={'back'}
              leftIconPress={() => {
                navigation.goBack();
              }}
            />
          ) : null}
          <View
            style={[
              globalContent,
              {marginTop: verificationDone ? Sizes.size80 : null},
            ]}>
            <View>
              <LinearGradient
                colors={
                  !verificationDone
                    ? theme.ADD_EVENT_IMAGE_GRADIENT
                    : ['#fff', '#fff']
                }
                style={photoContainer}>
                <View style={[flex, {alignItems: 'center'}]}>
                  {!verificationDone ? (
                    <Image
                      style={[
                        flex,
                        border_radius_12,
                        {height: '100%', width: '100%'},
                      ]}
                      source={verifyImage?.url ? {uri: verifyImage?.url} : ''}
                    />
                  ) : (
                    <VerificationDoneIcon
                      IconWidth={Sizes.size326}
                      IconHeight={Sizes.size297}
                    />
                  )}
                  {!verifyImage?.url && !verificationDone ? (
                    <View style={uploadImageObsaluteContainer}>
                      <TouchableOpacity
                        onPress={this.selectImage}
                        activeOpacity={0.7}
                        style={uploadPhotoFixed}>
                        <Camera
                          iconWidth={Sizes.size21}
                          iconHeight={Sizes.size20}
                          iconColor={'#818195'}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  {verifyImage?.url && !verificationDone ? (
                    <TouchableOpacity
                      onPress={this.deleteImage}
                      activeOpacity={0.7}
                      style={deleteImageContainer}>
                      <Cancel
                        iconWidth={Sizes.size15}
                        iconHeight={Sizes.size15}
                        iconColor={'white'}
                      />
                    </TouchableOpacity>
                  ) : null}
                </View>
              </LinearGradient>

              {verifyImage?.url && !verificationDone ? (
                <View style={checkedFixedContainer}>
                  <CheckedIcon
                    IconWidth={Sizes.size40}
                    IconHeight={Sizes.size40}
                    IconColor={'#A347FF'}
                  />
                </View>
              ) : null}
            </View>
            <View style={[verifyInfoContainer, {marginTop: Sizes.size46}]}>
              <Text style={verifyTitle}>
                {' '}
                <Translation
                  label={
                    activeStep === 1 && !verificationDone
                      ? 'verificationSteps.photoDocuments'
                      : activeStep === 2 && !verificationDone
                      ? 'verificationSteps.takeSelfie'
                      : 'verificationSteps.verificationDoneTitle'
                  }
                />
              </Text>
            </View>
            {verificationDone ? (
              <View style={[verifySubTitleContainer]}>
                <Text style={verifySubTitle}>
                  <Translation
                    label={'verificationSteps.verificationDoneSubtitle'}
                  />
                </Text>
              </View>
            ) : null}
            {!verificationDone ? (
              <TouchableOpacity
                onPress={this.selectImage}
                activeOpacity={0.7}
                style={uploadImageContainer}>
                <View style={uploadImageContent}>
                  <View style={uploadImageIcon}>
                    {activeStep === 1 ? (
                      <PhotoDocuments
                        IconWidth={Sizes.size36}
                        IconHeight={Sizes.size42}
                        IconColor={'#818195'}
                      />
                    ) : (
                      <SelfieIcon
                        IconWidth={Sizes.size36}
                        IconHeight={Sizes.size42}
                        IconColor={'#818195'}
                      />
                    )}
                  </View>
                  <View style={uploadImageTextContainer}>
                    <Text style={uploadImageTitle}>{`${i18n.t(
                      'verificationSteps.step',
                    )} ${activeStep}`}</Text>
                  </View>
                  <View>
                    {!verifyImage?.url ? (
                      <View style={cancelIconDisablet}>
                        <Cancel
                          iconWidth={Sizes.size9}
                          iconHeight={Sizes.size9}
                          iconColor={'white'}
                        />
                      </View>
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
            ) : null}
            <View style={[mb_74, {width: '100%', alignSelf: 'center'}]}>
              <LineGradientButton
                title={
                  !verificationDone
                    ? i18n.t('verificationSteps.nextStep')
                    : i18n.t('verificationSteps.letsGo')
                }
                onPress={!verificationDone ? this.nextSteps : this.goSetteing}
                disabled={!verifyImage?.url && !verificationDone}
              />
            </View>
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, {makeAction})(VerificationStep);
