import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {
  ScreenLoader,
  ScreenHeader,
  LineGradientButton,
  Avatar,
  CustomRadioButton,
} from '../../components';
import ImagePicker from 'react-native-image-crop-picker';
import {connect} from 'react-redux';
import {
  SET_TOAST_MASSAGE,
  SET_UPDATE_DELETE_PROFILE_SCREEN_LOADER,
  HIDE_TOAST,
  EDIT_PROFILE,
} from '../../actionsTypes';
import {makeAction} from '../../makeAction';
import {styles} from './styles';
import i18n from '../../assets/i18next';
import {Instagram, Vk} from '../../components/Icons';
import {Sizes} from '../../assets/styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Facebook} from '../../components/Icons/facebook';
import {deviceInfo} from '../../assets/deviceInfo';
import {_} from 'lodash';
import {_uploadFile} from '../../utils/mixins';

class EditProfile extends Component {
  state = {
    newProfile: {},
    newImage: {},
  };

  componentDidMount() {
    const {profile} = this.props.screenData;
    let newProfile = _.cloneDeep(profile);
    this.setState({newProfile});
    if (profile.loginType === 'social') {
      this.setState({isSocial: true});
    }
  }

  handelChange = (text, key) => {
    const {newProfile} = this.state;
    if (key === 'age') {
      if (/[^0-9]/gi.test(text)) {
        return;
      }
    }
    if (key === 'nickname') {
      if (!/^[A-Za-z0-9\-_@]*$/gi.test(text)) {
        return;
      }
    }
    newProfile[key] = text;
    this.setState({newProfile});
  };

  handelChangeLinks = (text, key) => {
    const {newProfile} = this.state;
    if (!newProfile?.links) {
      newProfile.links = {};
    }
    newProfile.links[key] = text;
    this.setState({newProfile});
  };

  pickImage = () => {
    this.RBSheet.open();
  };

  update = async () => {
    const {profile} = this.props.screenData;
    const {newImage, newProfile} = this.state;
    if (!newProfile?.links) {
      newProfile.links = {};
    }

    switch ('') {
      case newProfile.name:
        this.props.makeAction(HIDE_TOAST);
        this.props.makeAction(SET_TOAST_MASSAGE, {
          visible: true,
          type: 'error',
          text: i18n.t('alerts.name'),
        });
        return;
      case newProfile.nickname:
        this.props.makeAction(HIDE_TOAST);
        this.props.makeAction(SET_TOAST_MASSAGE, {
          visible: true,
          type: 'error',
          text: i18n.t('alerts.nickName'),
        });
        return;
      default:
        break;
    }

    const userData = {
      name: newProfile.name?.trim(),
      nickname: newProfile.nickname?.trim(),
      gender: newProfile.gender,
      links: newProfile.links,
      age: newProfile.age,
      aboutMe: newProfile?.aboutMe?.trim(),
      deletePictures:
        newImage?.url && profile?.picture[0]?.name
          ? [profile.picture[0].name]
          : [],
    };

    const formData = newImage.type
      ? await _uploadFile({fileList: [newImage], imageCount: 1})
      : new FormData();
    formData.append('data', JSON.stringify(userData));
    this.props.makeAction(SET_UPDATE_DELETE_PROFILE_SCREEN_LOADER, true);
    this.props.makeAction(EDIT_PROFILE, {formData});
  };

  chooseImage = () => {
    ImagePicker.openPicker({
      width: Sizes.size150,
      height: Sizes.size150,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then((image) => {
        const data = {
          height: image.cropRect.height,
          width: image.cropRect.width,
          type: image.mime,
          url: image.path,
          fileSize: image.size,
        };
        this.RBSheet.close();
        this.savePhoto(data);
      })
      .catch((e) => {
        this.RBSheet.close();
      });
  };

  selectImage = () => {
    ImagePicker.openCamera({
      width: Sizes.size150,
      height: Sizes.size150,
      cropping: true,
      cropperCircleOverlay: true,
    })
      .then((image) => {
        const data = {
          height: image.cropRect.height,
          width: image.cropRect.width,
          type: image.mime,
          url: image.path,
          fileSize: image.size,
        };
        this.RBSheet.close();
        this.savePhoto(data);
      })
      .catch((e) => {
        this.RBSheet.close();
      });
  };

  savePhoto = (picture) => {
    this.setState({newImage: picture});
  };

  selectBoxHandleChange = (key, value) => {
    const {newProfile} = this.state;
    newProfile[key] = value;
    this.setState({newProfile});
  };

  render() {
    const {navigation, theme} = this.props;
    const {
      container,
      contentContainer,
      buttonContainer,
      imageContainerStyle,
      uploadPhotoButtonStyle,
      greyText,
      changePhoto,
      inputContent,
      textInputStyle,
      textInputLabel,
      linksContainer,
      linksIconContainer,
      linksInput,
      textArea,
      img,
      radiobuttonContainer,
      removeIconContainer,
    } = styles(theme);
    const {screenLoaderVisible} = this.props.screenData;
    const {profile} = this.props.screenData;
    const {newProfile, newImage} = this.state;
    const {PRIMARY_BACKGROUND_COLOR} = theme;
    return (
      <>
        {screenLoaderVisible ? <ScreenLoader /> : null}
        <KeyboardAvoidingView
          behavior={deviceInfo.ios ? 'padding' : null}
          style={{flex: 1}}>
          <ScrollView>
            <ScreenHeader
              title={'edit_profile'}
              leftIcon={'back'}
              leftIconPress={() => {
                navigation.goBack();
              }}
            />
            <View style={container}>
              <View style={contentContainer}>
                <View style={imageContainerStyle}>
                  <View style={img}>
                    <Avatar
                      margin={3.5}
                      borderWidth={Sizes.size3}
                      radius={Sizes.size30}
                      width={Sizes.size100}
                      height={Sizes.size100}
                      data={!newImage?.url ? profile : {picture: [newImage]}}
                      verified={profile?.verificationDetails?.verified}
                    />
                  </View>
                  <TouchableOpacity
                    style={uploadPhotoButtonStyle}
                    onPress={this.pickImage}>
                    <Text style={changePhoto}>
                      {i18n.t('headerTitle.change_photo')}
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={inputContent}>
                  <Text style={textInputLabel}>
                    {i18n.t('inputs.placeholder.firstName')}
                  </Text>
                  <TextInput
                    maxLength={30}
                    value={newProfile.name}
                    style={textInputStyle}
                    placeholder={i18n.t('inputs.placeholder.firstName')}
                    onChangeText={(text) => {
                      this.handelChange(text, 'name');
                    }}
                    placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
                  />
                </View>

                <View style={inputContent}>
                  <Text style={textInputLabel}>
                    {i18n.t('inputs.placeholder.lastName')}
                  </Text>
                  <TextInput
                    maxLength={30}
                    value={newProfile.nickname}
                    style={textInputStyle}
                    placeholder={i18n.t('inputs.placeholder.lastName')}
                    onChangeText={(text) => {
                      this.handelChange(text, 'nickname');
                    }}
                    placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
                  />
                </View>

                <View style={inputContent}>
                  <Text style={textInputLabel}>
                    {i18n.t('inputs.placeholder.age')}
                  </Text>
                  <TextInput
                    maxLength={2}
                    style={textInputStyle}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                      this.handelChange(text, 'age');
                    }}
                    value={`${newProfile?.age}`}
                    placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
                  />
                </View>

                <View style={inputContent}>
                  <Text style={textInputLabel}>{i18n.t('label.gender')}</Text>
                  <View style={radiobuttonContainer}>
                    <CustomRadioButton
                      change={() => {
                        this.selectBoxHandleChange('gender', 'Male');
                      }}
                      width={Sizes.size25}
                      height={Sizes.size25}
                      tintColors={theme.color.SECONDARY_COLOR_LIGHT}
                      value={newProfile?.gender === 'Male'}
                    />
                    <Text
                      onPress={() => {
                        this.selectBoxHandleChange('gender', 'Male');
                      }}
                      style={[
                        {
                          fontSize: Sizes.size12,
                          marginLeft: Sizes.size8,
                          color: theme?.color?.PRIMARY_COLOR_BOLD,
                        },
                      ]}>
                      {i18n.t('label.male')}
                    </Text>
                  </View>

                  <View style={radiobuttonContainer}>
                    <CustomRadioButton
                      change={() => {
                        this.selectBoxHandleChange('gender', 'Female');
                      }}
                      width={Sizes.size25}
                      height={Sizes.size25}
                      tintColors={theme.color.SECONDARY_COLOR_LIGHT}
                      value={newProfile?.gender === 'Female'}
                    />
                    <Text
                      onPress={() => {
                        this.selectBoxHandleChange('gender', 'Female');
                      }}
                      style={[
                        {
                          fontSize: Sizes.size12,
                          marginLeft: Sizes.size8,
                          color: theme?.color?.PRIMARY_COLOR_BOLD,
                        },
                      ]}>
                      {i18n.t('label.female')}
                    </Text>
                  </View>
                </View>

                <View style={[inputContent, {alignItems: 'flex-start'}]}>
                  <Text style={textInputLabel}>{i18n.t('label.about_me')}</Text>
                  <TextInput
                    style={[textInputStyle, textArea]}
                    maxLength={150}
                    multiline={true}
                    placeholder={i18n.t('label.about_me')}
                    onChangeText={(text) => {
                      this.handelChange(text, 'aboutMe');
                    }}
                    value={newProfile.aboutMe}
                    placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
                  />
                </View>

                <View style={linksContainer}>
                  <View style={linksIconContainer}>
                    <Facebook
                      IconWidth={Sizes.size23}
                      IconHeight={Sizes.size23}
                      IconColor={'black'}
                    />
                  </View>

                  <TextInput
                    maxLength={30}
                    style={linksInput}
                    onChangeText={(text) => {
                      this.handelChangeLinks(text, 'facebook');
                    }}
                    value={newProfile?.links?.facebook}
                    placeholder={i18n.t('texts.accAccountName')}
                    placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
                  />
                </View>

                <View style={linksContainer}>
                  <View style={linksIconContainer}>
                    <Vk
                      IconWidth={Sizes.size23}
                      IconHeight={Sizes.size23}
                      IconColor={'black'}
                    />
                  </View>

                  <TextInput
                    maxLength={30}
                    style={linksInput}
                    onChangeText={(text) => {
                      this.handelChangeLinks(text, 'vkontakte');
                    }}
                    value={newProfile?.links?.vkontakte}
                    placeholder={i18n.t('texts.accAccountName')}
                    placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
                  />
                </View>

                <View style={linksContainer}>
                  <View style={linksIconContainer}>
                    <Instagram
                      IconWidth={Sizes.size23}
                      IconHeight={Sizes.size23}
                      IconColor={'black'}
                    />
                  </View>
                  <TextInput
                    maxLength={30}
                    style={linksInput}
                    onChangeText={(text) => {
                      this.handelChangeLinks(text, 'instagram');
                    }}
                    value={newProfile?.links?.instagram}
                    placeholder={i18n.t('texts.accAccountName')}
                    placeholderTextColor={theme?.color?.PRIMARY_COLOR_LIGHT}
                  />
                </View>

                <View style={buttonContainer}>
                  <LineGradientButton
                    title={i18n.t('buttons.update')}
                    onPress={() => this.update()}
                  />
                </View>
              </View>

              <RBSheet
                ref={(ref) => {
                  this.RBSheet = ref;
                }}
                height={Sizes.size200}
                openDuration={250}
                closeOnDragDown={true}
                customStyles={{
                  container: {
                    backgroundColor: PRIMARY_BACKGROUND_COLOR,
                    borderTopLeftRadius: Sizes.size20,
                    borderTopRightRadius: Sizes.size20,
                  },
                }}>
                <View style={{flexDirection: 'column'}}>
                  <TouchableOpacity
                    style={removeIconContainer}
                    onPress={this.chooseImage}>
                    <Text style={greyText}>{i18n.t('texts.image')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={removeIconContainer}
                    onPress={this.selectImage}>
                    <Text style={greyText}>{i18n.t('texts.takePhoto')}</Text>
                  </TouchableOpacity>
                </View>
              </RBSheet>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    theme: store.themes.theme,
  };
};
export default connect(mapStateToProps, {makeAction})(EditProfile);
