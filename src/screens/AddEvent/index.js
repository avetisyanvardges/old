import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {makeAction} from '../../makeAction';
import {styles} from './styles';
import {
  ScreenLoader,
  ScreenFooter,
  LineGradientButton,
  EventTypes,
} from '../../components';
import FloatingTitleInput from '../../components/FloatingTitleInput';
import {
  SET_ADD_EVENTS_SCREEN_LOADER_VISIBLE,
  CREATE_NEW_EVENT,
  UPDATE_EVENT_REQUEST,
  SET_EVENT_VIEW_LOADER_VISIBLE,
  GET_EVENT_BY_ID,
  GET_TYPES_REQUEST,
  SET_TOAST_MASSAGE,
  HIDE_TOAST,
  _UPLOAD_FILE,
} from '../../actionsTypes';
import {Sizes, IconsStyles} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';
import _ from 'lodash';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  Cancel,
  Calendar,
  Clock,
  ChooseLocation,
  FileUpload,
  ImageUpload,
  CheckMark,
  Camera,
  FilterIcon,
  OutlinePlus,
} from '../../components/Icons';
import Translation from '../../Translation';
import i18n from '../../assets/i18next';
import ImagePicker from 'react-native-image-crop-picker';
import LinearGradient from 'react-native-linear-gradient';
import CustomSlider from '../../components/CustomSlider';
import RBSheet from 'react-native-raw-bottom-sheet';
import moment from 'moment';
import 'moment/locale/en-au';
import 'moment/locale/ru';
import {_uploadFile} from '../../utils/mixins';
import DocumentPicker from 'react-native-document-picker';

class AddEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_event: {},
      pictures: [],
      show: false,
      showTime: false,
      dateValue: new Date(),
      timeValue: new Date(),
      id: '',
      time: new Date(),
      date: new Date(),
      uploadedFile: {},
      dateControl: false,
      showDateControl: false,
      timeControl: false,
      locationSelected: false,
      startDate: '',
      showFilter: false,
      deletedId: [],
      otherType: '',
      activeFilterType: 'coffee_tea',
    };
  }

  componentDidMount() {
    this.props.makeAction(GET_TYPES_REQUEST, '');
    if (this.props.navigation.state.routeName === 'EditEvent') {
      this.getEventInfo();
    } else {
      this.setState({
        current_event: {criteria: {members: 0, age: 0, male: 0, female: 0}},
      });
    }
    this.handleFilterShow();
  }

  formatDate = (event) => {
    if (event) {
      const date = new Date(event.date);
      const time = moment(event.date).format('HH:mm:ss');
      this.setState({dateValue: date, timeValue: time});
    }
  };

  getEventInfo = () => {
    const {event, eventTypes} = this.props;
    const {eventId} = this.props.navigation.state.params;
    this.props.makeAction(SET_EVENT_VIEW_LOADER_VISIBLE, true);
    this.props.makeAction(GET_EVENT_BY_ID, {id: eventId});
    if (event) {
      const pictures = [];
      event?.image?.forEach((elem) => {
        if (elem?.category === 'defaultImage') {
          this.state.deletedId.push(elem.name);
        } else {
          pictures.push(elem);
        }
      });
      let type, otherType;
      if (eventTypes.some((e) => e.key === event.type)) {
        type = event.type;
        otherType = '';
      } else {
        type = 'other';
        otherType = event.type;
      }
      let current_event = _.cloneDeep(event);

      this.formatDate(event);

      this.setState({
        current_event,
        pictures: pictures,
        uploadedFile: event?.file.length ? event?.file[0] : {},
        locationSelected: true,
        showFilter: true,
        activeFilterType: type,
        otherType,
      });
    }
  };

  handleFilterShow = () => {
    const {showFilter} = this.state;
    this.setState({showFilter: !showFilter});
  };

  handelChangeInput = (keyName, text) => {
    const {current_event} = this.state;
    _.set(current_event, keyName, text);
    this.setState({current_event});
  };

  onChangeDate = (selectedDate) => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      this.setState({
        date: selectedDate,
        show: false,
        dateValue: date,
        dateControl: true,
        showDateControl: true,
        timeValue: new Date(),
      });
    }
  };

  onChangeTime = (selectedTime) => {
    if (
      moment(selectedTime).format('MMDDYYYYHHmm') >=
        moment().format('MMDDYYYYHHmm') ||
      moment(this.state.date).format('YYYYMMDD') > moment().format('YYYYMMDD')
    ) {
      const time = new Date(selectedTime);
      this.setState({
        time: selectedTime,
        showTime: false,
        timeValue: time,
        dateControl: true,
        timeControl: true,
      });
    } else {
      this.setState({showTime: false});
    }
  };

  hideDatePicker = () => {
    this.setState({showTime: false, show: false});
  };

  formatDateTime = () => {
    let {date, time} = this.state;

    const d = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const mm =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : date.getMonth() + 1;
    const start_date = date.getFullYear() + '-' + mm + '-' + d;

    const h =
      time.getUTCHours() < 10 ? `0${time.getUTCHours()}` : time.getUTCHours();
    const m =
      time.getUTCMinutes() < 10
        ? `0${time.getUTCMinutes()}`
        : time.getUTCMinutes();
    const s =
      time.getUTCSeconds() < 10
        ? `0${time.getUTCSeconds()}`
        : time.getUTCSeconds();

    const hours =
      time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
    const minutes =
      time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    const seconds =
      time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
    const start_time = h + ':' + m + ':' + s;
    const start_Local_time = hours + ':' + minutes + ':' + seconds;
    const local_time = start_date + 'T' + start_Local_time + 'Z';
    this.setState({local_time: local_time});
    return start_date + 'T' + start_time + 'Z';
  };

  save = async () => {
    this.props.makeAction(SET_ADD_EVENTS_SCREEN_LOADER_VISIBLE, true);
    const {
      title,
      description,
      location,
      date,
      criteria,
    } = this.state.current_event;
    const {
      local_time,
      dateControl,
      otherType,
      pictures,
      uploadedFile,
      deletedId,
    } = this.state;
    const type = this.state.activeFilterType;
    let startDate = '';

    const id = this.props.navigation?.state?.params?.eventId || null;
    if (dateControl || this.props.navigation.state.routeName === 'AddEvent') {
      startDate = this.formatDateTime();
    } else {
      startDate = date;
    }
    if (new Date(local_time).getTime() < new Date().getTime()) {
      this.props.makeAction(SET_TOAST_MASSAGE, {
        visible: true,
        type: 'error',
        text: i18n.t('texts.wrongTime'),
      });
      this.props.makeAction(HIDE_TOAST);
      return false;
    }
    let uploadNewImages = [];
    let uploadFile = [];
    pictures?.forEach((e) => (!e?._id ? uploadNewImages.push(e) : null));
    Object.keys(uploadedFile)?.length && !uploadedFile?._id
      ? uploadFile.push(uploadedFile)
      : null;
    const fileList = [];
    if (uploadNewImages?.length) {
      fileList.unshift(...uploadNewImages);
    }
    if (uploadFile?.length) {
      fileList.push(...uploadFile);
    }
    let formData = (await _uploadFile({fileList})) || new FormData();

    const eventData = {
      title: title?.trim(),
      description: description?.trim(),
      location: location,
      date: startDate,
      criteria,
      type: otherType ? otherType : type,
      deleteFiles: deletedId,
      imageCount: uploadNewImages.length,
    };
    formData.append('data', JSON.stringify(eventData));
    if (id) {
      this.props.makeAction(UPDATE_EVENT_REQUEST, {
        formData,
        id,
        callBack: () => {
          this.resetForm();
        },
      });
    } else {
      this.props.makeAction(CREATE_NEW_EVENT, {
        formData,
        callBack: () => {
          this.resetForm();
        },
      });
    }
  };

  resetForm = () => {
    const defaultState = {
      current_event: {},
      pictures: [],
      show: false,
      showTime: false,
      dateValue: new Date(),
      timeValue: new Date(),
      id: '',
      time: new Date(),
      date: new Date(),
      uploadedFile: {},
      dateControl: false,
      showDateControl: false,
      showFilter: true,
      timeControl: false,
      locationSelected: false,
      startDate: '',
      deletedId: [],
      otherType: '',
      activeFilterType: 'coffee_tea',
    };
    this.setState(defaultState);
    setTimeout(() => {
      this.setState({showFilter: false}, () =>
        this.setState({showFilter: true}),
      );
    }, 300);
  };

  savePhoto = (picture) => {
    const {current_event} = this.state;
    _.set(current_event, '_.set', picture);
    this.setState({pictures: picture});
  };

  deletePhoto = (index) => {
    const {pictures} = this.state;
    const {event} = this.props;
    if (pictures[index]?._id) {
      this.state.deletedId.push(pictures[index].name);
    }
    pictures.splice(index, 1);
    event?.image?.splice(index, 1);
    this.setState({pictures: pictures});
  };

  chooseImage = async () => {
    const {size, path, mime, cropRect} = await ImagePicker.openPicker({
      width: deviceInfo.deviceWidth,
      height: Sizes.size375,
      cropping: true,
    });
    const data = {
      height: cropRect.height,
      width: cropRect.width,
      type: mime,
      url: path,
      fileSize: size,
    };
    this.setState({pictures: [...this.state.pictures, data]}, () =>
      setTimeout(() =>
        this._handleCustomScrollView.scrollToEnd({animated: true}),
      ),
    );
    this.closeModal();
  };

  selectImage = async () => {
    const {size, path, mime, cropRect} = await ImagePicker.openCamera({
      width: deviceInfo.deviceWidth,
      height: Sizes.size375,
      cropping: true,
      multiple: true,
    });
    const data = {
      height: cropRect?.height,
      width: cropRect?.width,
      type: mime,
      url: path,
      fileSize: size,
    };
    this.setState({pictures: [...this.state.pictures, data]}, () =>
      setTimeout(() =>
        this._handleCustomScrollView.scrollToEnd({animated: true}),
      ),
    );
    this.closeModal();
  };

  show = (key) => {
    this.setState({[key]: true});
  };

  setData = (geoData, name) => {
    const {current_event} = this.state;
    _.set(current_event, 'location.lang', geoData.longitude);
    _.set(current_event, 'location.lat', geoData.latitude);
    _.set(current_event, 'location.name', name);
    this.setState({current_event});
  };

  choosePlace = () => {
    const {settings} = this.props;
    const {current_event} = this.state;
    this.setState({locationSelected: true});
    this.props.navigation.navigate('Place', {
      setDate: this.setData,
      location: current_event.location,
      language: settings.language,
    });
  };

  pickFile = async () => {
    try {
      if (deviceInfo.ios) {
        const {
          height,
          width,
          mime,
          path,
          size,
          filename,
        } = await ImagePicker.openPicker({
          width: deviceInfo.deviceWidth,
          height: Sizes.size375,
          mediaType: 'video',
        });
        const data = {
          height,
          width,
          type: mime,
          url: path,
          size,
          name: filename,
        };
        this.setState({uploadedFile: data});
      } else {
        const [video] = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.video],
        });
        const {name, size, type, uri} = video;
        const data = {name: name, size: size, type: type, url: uri};
        this.setState({uploadedFile: data});
      }
      this.closeModal();
    } catch (e) {
      this.closeModal();
      console.log(e.code);
    }
  };

  openModal = () => {
    this.RBSheet.open();
  };
  closeModal = () => {
    this.RBSheet.close();
  };
  render() {
    const {
      navigation,
      screenData: {screenLoaderVisible},
      theme,
      eventTypes,
    } = this.props;
    const {
      container,
      inputContainer,
      dateTimeText,
      datePickerContainer,
      dateTextStyle,
      footerContainer,
      locationContainer,
      imageContainer,
      floatingButton,
      labelText,
      placeholderStyle,
      locationTitleContainer,
      uploadImage,
      greyText,
      filterContainer,
      fullWidth,
      removeIconContainer,
    } = styles(theme);
    const {PRIMARY_BACKGROUND_COLOR, ADD_EVENT_IMAGE_GRADIENT} = theme;
    const {
      SECONDARY_COLOR_LIGHT,
      PRIMARY_COLOR,
      PRIMARY_COLOR_LIGHT,
      MAP_USER_BORDER,
    } = theme.color;
    const {
      uploadedFile,
      showDateControl,
      timeControl,
      locationSelected,
      showFilter,
      activeFilterType,
      otherType,
    } = this.state;
    const {
      title,
      description,
      date,
      location,
      criteria,
    } = this.state.current_event;

    const types = [];
    if (eventTypes) {
      eventTypes.forEach((type) =>
        types.push({
          label: this.props.settings.language === 'en' ? type.en : type.ru,
          value: type.key,
        }),
      );
    }

    const saveTitle =
      this.props.navigation.state.routeName === 'AddEvent'
        ? 'create_an_event'
        : 'update';
    let loc = this.props.settings.language === 'en' ? 'en-au' : 'ru';

    moment.locale(loc);
    return (
      <>
        {screenLoaderVisible ? <ScreenLoader /> : null}
        <KeyboardAvoidingView
          behavior={deviceInfo.ios ? 'padding' : null}
          style={{flex: 1}}>
          <View style={{flex: 1, backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
            <View style={{marginBottom: Sizes.size55}}>
              <ScrollView>
                <View style={imageContainer}>
                  {this.state.pictures.length < 5 ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: MAP_USER_BORDER,
                        borderRadius: Sizes.size9,
                        marginTop: 17,
                        position: 'absolute',
                        zIndex: 999,
                        alignSelf: 'center',
                        paddingVertical: !this.state.pictures.length
                          ? Sizes.size7
                          : null,
                        paddingHorizontal: !this.state.pictures.length
                          ? Sizes.size16
                          : null,
                      }}>
                      {this.state.pictures.length ? (
                        <TouchableOpacity
                          style={{
                            padding: Sizes.size10,
                          }}
                          onPress={this.openModal}>
                          <OutlinePlus
                            IconWidth={Sizes.size15}
                            IconHeight={Sizes.size15}
                            IconColor={PRIMARY_COLOR_LIGHT}
                          />
                        </TouchableOpacity>
                      ) : (
                        <>
                          <TouchableOpacity
                            style={{
                              paddingRight: Sizes.size13,
                            }}
                            onPress={this.openModal}>
                            <ImageUpload
                              iconWidth={Sizes.size26}
                              iconHeight={Sizes.size26}
                              iconColor={PRIMARY_COLOR_LIGHT}
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{paddingLeft: Sizes.size13}}
                            onPress={this.selectImage}>
                            <Camera
                              iconWidth={Sizes.size26}
                              iconHeight={Sizes.size26}
                              iconColor={PRIMARY_COLOR_LIGHT}
                            />
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  ) : null}

                  <LinearGradient
                    colors={ADD_EVENT_IMAGE_GRADIENT}
                    style={[
                      uploadImage,
                      {
                        borderBottomLeftRadius: Sizes.size20,
                        borderBottomRightRadius: Sizes.size20,
                      },
                    ]}
                  />
                  <LinearGradient
                    colors={ADD_EVENT_IMAGE_GRADIENT}
                    style={{
                      borderBottomLeftRadius: Sizes.size20,
                      borderBottomRightRadius: Sizes.size20,
                      position: 'absolute',
                      top: 0,
                    }}>
                    <CustomSlider
                      handleScrollView={(element) =>
                        (this._handleCustomScrollView = element)
                      }
                      deletePhotoEmit={(e) => this.deletePhoto(e)}
                      addEvent={true}
                      data={this.state.pictures}
                    />
                  </LinearGradient>
                </View>
                <View style={container}>
                  {uploadedFile?.url || uploadedFile?.size ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginTop: Sizes.size25,
                        paddingHorizontal: Sizes.size5,
                      }}>
                      <FileUpload
                        IconWidth={Sizes.size26}
                        IconHeight={Sizes.size26}
                        IconColor={PRIMARY_COLOR_LIGHT}
                      />
                      <Text
                        style={{
                          paddingHorizontal: Sizes.size5,
                          color: theme?.color?.PRIMARY_COLOR_BOLD,
                        }}>
                        {uploadedFile ? (
                          uploadedFile?.name
                        ) : (
                          <Translation label={'texts.fileUpload'} />
                        )}
                      </Text>
                      <TouchableOpacity
                        onPress={() => {
                          this.state.deletedId.push(uploadedFile?.name);
                          this.setState({uploadedFile: {}});
                        }}
                        style={{
                          padding: Sizes.size5,
                          marginLeft: 'auto',
                        }}>
                        <Cancel
                          iconWidth={IconsStyles.small}
                          iconHeight={IconsStyles.small}
                          iconColor={PRIMARY_COLOR_LIGHT}
                        />
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <View style={inputContainer}>
                    <Text style={labelText}>
                      <Translation label={'texts.eventName'} />
                      <Text
                        style={{
                          color: SECONDARY_COLOR_LIGHT,
                          marginLeft: Sizes.size2,
                        }}>
                        {' '}
                        *
                      </Text>
                    </Text>

                    <FloatingTitleInput
                      maxLength={40}
                      floatingTitleInputStyles={
                        deviceInfo.ios
                          ? {
                              paddingTop: Sizes.size15,
                              paddingBottom: Sizes.size18,
                            }
                          : null
                      }
                      onChangeText={(text) => {
                        this.handelChangeInput('title', text);
                      }}
                      value={title}
                      returnKeyType={'done'}
                      placeholder={'eventName'}
                    />
                  </View>

                  <View style={inputContainer}>
                    <Text style={labelText}>
                      <Translation label={'texts.description'} />
                      <Text
                        style={{
                          color: SECONDARY_COLOR_LIGHT,
                          marginLeft: Sizes.size2,
                        }}>
                        {' '}
                        *
                      </Text>
                      <Text
                        style={{
                          color: SECONDARY_COLOR_LIGHT,
                          marginLeft: Sizes.size3,
                        }}
                      />
                    </Text>

                    <FloatingTitleInput
                      floatingTitleInputStyles={
                        deviceInfo.ios
                          ? {
                              paddingTop: Sizes.size15,
                              paddingBottom: Sizes.size18,
                            }
                          : null
                      }
                      maxLength={240}
                      onChangeText={(text) => {
                        this.handelChangeInput('description', text);
                      }}
                      value={description}
                      returnKeyType={'done'}
                      placeholder={'description'}
                    />
                  </View>

                  <View style={{marginTop: Sizes.size28}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginLeft: Sizes.size11,
                      }}>
                      <Text
                        style={dateTimeText}
                        ellipsizeMode="tail"
                        numberOfLines={1}>
                        <Translation label={'texts.address_to_event'} />
                      </Text>
                      <Text
                        style={{
                          color: SECONDARY_COLOR_LIGHT,
                          marginLeft: Sizes.size2,
                        }}>
                        {' '}
                        *
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={locationContainer}
                      onPress={this.choosePlace}>
                      {location ? (
                        <Text
                          style={locationTitleContainer}
                          ellipsizeMode="tail"
                          numberOfLines={1}>
                          <Translation label={location.name} />
                        </Text>
                      ) : (
                        <Text
                          style={[
                            placeholderStyle,
                            {color: PRIMARY_COLOR_LIGHT},
                          ]}
                          ellipsizeMode="tail"
                          numberOfLines={1}>
                          <Translation
                            label={'inputs.placeholder.address_to_event'}
                          />
                        </Text>
                      )}
                      {locationSelected && location?.name ? (
                        <CheckMark
                          IconWidth={Sizes.size18}
                          IconHeight={Sizes.size18}
                          IconColor={PRIMARY_COLOR}
                        />
                      ) : (
                        <View style={{marginRight: -2.5}}>
                          <ChooseLocation
                            IconWidth={Sizes.size32}
                            IconHeight={Sizes.size32}
                            IconColor={PRIMARY_COLOR_LIGHT}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingLeft: Sizes.size11,
                        marginTop: Sizes.size28,
                      }}>
                      <Text
                        style={dateTimeText}
                        ellipsizeMode="tail"
                        numberOfLines={1}>
                        <Translation label={'texts.date'} />
                      </Text>
                      <Text
                        style={{
                          color: SECONDARY_COLOR_LIGHT,
                          marginLeft: Sizes.size2,
                        }}>
                        *
                      </Text>
                    </View>
                    <View>
                      <TouchableOpacity
                        style={datePickerContainer}
                        onPress={() => this.show('show')}>
                        <Text
                          style={[
                            dateTextStyle,
                            {color: theme?.color?.INPUT_DEFAULT_COLOR},
                          ]}>
                          {moment(this.state.dateValue).format('dddd DD MMM')}
                        </Text>
                        <View style={floatingButton}>
                          {date || this.state.dateValue ? (
                            <CheckMark
                              style={{marginRight: Sizes.size10}}
                              IconWidth={Sizes.size18}
                              IconHeight={Sizes.size18}
                              IconColor={'green'}
                            />
                          ) : (
                            <Calendar
                              IconWidth={Sizes.size32}
                              IconHeight={Sizes.size32}
                              IconColor={PRIMARY_COLOR_LIGHT}
                            />
                          )}
                        </View>

                        {this.state.show ? (
                          <DateTimePickerModal
                            minimumDate={new Date()}
                            isVisible={this.state.show}
                            date={date ? new Date(date) : new Date()}
                            mode="date"
                            onConfirm={this.onChangeDate}
                            onCancel={this.hideDatePicker}
                            locale
                          />
                        ) : null}
                      </TouchableOpacity>

                      <View
                        style={{
                          flexDirection: 'row',
                          paddingLeft: Sizes.size11,
                          marginTop: Sizes.size28,
                        }}>
                        <Text
                          style={dateTimeText}
                          ellipsizeMode="tail"
                          numberOfLines={1}>
                          <Translation label={'texts.time'} />
                        </Text>
                        <Text
                          style={{
                            color: SECONDARY_COLOR_LIGHT,
                            marginLeft: Sizes.size2,
                          }}>
                          *
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          this.show('showTime');
                          console.log(this.state.showTime, 77778887878877);
                        }}
                        style={datePickerContainer}>
                        <Text
                          style={[
                            dateTextStyle,
                            {
                              color: theme?.color?.INPUT_DEFAULT_COLOR,
                            },
                          ]}>
                          {moment(this.state.timeValue, 'HHmm').format('HH:mm')}
                        </Text>
                        <View style={floatingButton}>
                          {date || this.state.timeValue ? (
                            <CheckMark
                              style={{marginRight: Sizes.size10}}
                              IconWidth={Sizes.size18}
                              IconHeight={Sizes.size18}
                              IconColor={PRIMARY_COLOR}
                            />
                          ) : (
                            <Clock
                              IconWidth={Sizes.size32}
                              IconHeight={Sizes.size32}
                              IconColor={PRIMARY_COLOR_LIGHT}
                            />
                          )}
                        </View>
                        {this.state.showTime ? (
                          <DateTimePickerModal
                            isVisible={this.state.showTime}
                            date={moment(date).toDate()}
                            mode="time"
                            // minimumDate={new Date()}
                            onConfirm={this.onChangeTime}
                            onCancel={this.hideDatePicker}
                            locale
                          />
                        ) : null}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={filterContainer}>
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingLeft: Sizes.size11,
                      }}>
                      <Text
                        style={dateTimeText}
                        ellipsizeMode="tail"
                        numberOfLines={1}>
                        <Translation label={'texts.filters'} />
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={this.handleFilterShow}
                      style={{padding: Sizes.size12}}>
                      <FilterIcon
                        IconWidth={Sizes.size32}
                        IconHeight={Sizes.size32}
                        IconColor={PRIMARY_COLOR_LIGHT}
                      />
                    </TouchableOpacity>
                  </View>
                  {showFilter ? (
                    <EventTypes
                      types={types}
                      type={activeFilterType}
                      sliderInfo={criteria}
                      otherText={otherType}
                      handleSliderInfo={(sliderData) =>
                        (this.state.current_event.criteria = sliderData)
                      }
                      handleActiveType={(type) =>
                        (this.state.activeFilterType = type)
                      }
                      handleOtherText={(text) => (this.state.otherType = text)}
                    />
                  ) : null}
                  <View style={footerContainer}>
                    <View style={fullWidth}>
                      <LineGradientButton
                        onPress={this.save}
                        title={<Translation label={`buttons.${saveTitle}`} />}
                      />
                    </View>
                  </View>
                </View>
              </ScrollView>
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
              {this.state.pictures.length ? (
                <TouchableOpacity
                  style={removeIconContainer}
                  onPress={this.selectImage}>
                  <Text style={greyText}>{i18n.t('texts.takePhoto')}</Text>
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                style={removeIconContainer}
                onPress={this.chooseImage}>
                <Text style={greyText}>{i18n.t('texts.image')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={removeIconContainer}
                onPress={this.pickFile}>
                <Text style={greyText}>{i18n.t('texts.video')}</Text>
              </TouchableOpacity>
            </RBSheet>
          </View>
        </KeyboardAvoidingView>
        <ScreenFooter active={'AddEvent'} navigation={navigation} />
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.addEventsScreenData,
    netInfo: store.netInfo,
    count: store.profileData.count,
    event: store.eventList.event,
    settings: store.profileData.settings,
    theme: store.themes.theme,
    eventTypes: store.eventList.eventTypes,
  };
};

export default connect(mapStateToProps, {makeAction})(AddEvent);
