import React, {Component} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {IconsSizes} from '../../assets/styles';
import {HIDE_TOAST, SET_TOAST_MASSAGE} from '../../actionsTypes';
import {SelectBox, SliderSelect, Button, ScreenHeader} from '../../components';
import {Calendar} from '../../components/Icons';
import FloatingTitleInput from '../../components/FloatingTitleInput';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import i18n from '../../assets/i18next';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import Translation from '../../Translation';

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      title: '',
      location: '',
      type: '',
      limit: 0,
      showStart: false,
      showEnd: false,
      startDate: '',
      endDate: '',
    };
  }

  componentDidMount() {
    const data = this.props.navigation?.state?.params?.filtredData;
    if (Object.keys(data)?.length) {
      this.setState({
        location: data?.location ? data?.location : '',
        type: data?.type ? data?.type : '',
        limit: data?.limit ? data?.limit : 0,
        startDate: data?.startDate ? data?.startDate : '',
        endDate: data?.endDate ? data?.endDate : '',
      });
    }
  }

  handelChange = (key, value) => {
    this.setState({[key]: value});
  };

  handleFilter = async () => {
    const {location, type, limit, startDate, endDate} = this.state;
    const {sendInformation} = this.props.navigation?.state?.params;
    if ((startDate && !endDate) || (!startDate && endDate)) {
      this.props.makeAction(HIDE_TOAST);
      this.props.makeAction(SET_TOAST_MASSAGE, {
        visible: true,
        type: 'error',
        text: i18n.t('alerts.insertDate'),
      });
      return;
    }
    sendInformation({
      filterParams: {
        location: location,
        type: type,
        limit: limit,
        startDate: startDate,
        endDate: endDate,
      },
    });
    this.props.navigation.goBack();
  };

  resetFilter = async () => {
    this.setState(this.initialState);
    this.props.navigation.goBack();
  };

  onChangeDate = (selectedDate) => {
    const dateFormatted = selectedDate ? new Date(selectedDate) : null;
    this.setState({startDate: dateFormatted, showStart: false});
  };

  onChangeEndDate = (selectedDate) => {
    const dateFormatted = selectedDate ? new Date(selectedDate) : null;
    this.setState({endDate: dateFormatted, showEnd: false});
  };

  show = (key) => {
    this.setState({[key]: true});
  };
  hideDatePicker = () => {
    this.setState({showStart: false, showEnd: false});
  };

  render() {
    const {navigation, eventTypes, theme} = this.props;
    let {
      limit,
      type,
      location,
      startDate,
      endDate,
      showStart,
      showEnd,
    } = this.state;
    const {
      contentContainer,
      inputContainer,
      sliderSelectContainer,
      selectBoxContainer,
      footerContainer,
      floatingButton,
      dateTimeText,
      pickerContainer,
      dateTextStyle,
      datePickerContainer,
    } = styles(theme);
    const {SECONDARY_COLOR_LIGHT} = theme.color;
    const {
      PRIMARY_BACKGROUND_COLOR_LIGHT,
      PRIMARY_TEXT_BACKGROUND_COLOR,
      PRIMARY_BACKGROUND_COLOR,
    } = theme;
    let types = [];
    if (eventTypes) {
      console.log(88888888888);
      eventTypes.forEach((type) => {
        types.push({label: type.en ? type.en : type.ru, value: type.key});
      });
    }
    return (
      <ScrollView style={{backgroundColor: PRIMARY_BACKGROUND_COLOR}}>
        <ScreenHeader
          title={'filter'}
          leftIcon={'back'}
          leftIconPress={() => {
            navigation.goBack();
          }}
        />

        <View style={contentContainer}>
          <View style={inputContainer}>
            <FloatingTitleInput
              maxLength={40}
              onChangeText={(text) => {
                this.handelChange('location', text);
              }}
              value={location}
              returnKeyType={'done'}
              placeholder={'selectLocation'}
            />
          </View>

          <View style={selectBoxContainer}>
            <SelectBox
              label={'event_type'}
              selectedValue={type}
              onValueChange={(value) => {
                this.handelChange('type', value);
              }}
              items={types}
            />
          </View>

          <View style={sliderSelectContainer}>
            <SliderSelect
              step={1}
              maximumValue={30}
              sliderValue={limit}
              sliderText={'membersLimit'}
              onValueChange={(limit) => this.handelChange('limit', limit)}
              thumbTintColor={PRIMARY_BACKGROUND_COLOR_LIGHT}
              minimumTrackTintColor={PRIMARY_BACKGROUND_COLOR_LIGHT}
              maximumTrackTintColor={PRIMARY_TEXT_BACKGROUND_COLOR}
            />
          </View>
          <View>
            <View style={pickerContainer}>
              <View>
                <Text
                  style={dateTimeText}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  <Translation label={'texts.from'} />
                </Text>

                <View style={datePickerContainer}>
                  <TouchableOpacity
                    style={floatingButton}
                    onPress={() => this.show('showStart')}>
                    <Calendar
                      IconWidth={IconsSizes.normal}
                      IconHeight={IconsSizes.normal}
                      IconColor={PRIMARY_BACKGROUND_COLOR_LIGHT}
                    />
                    {startDate ? (
                      <Text style={dateTextStyle}>
                        {new Date(startDate).toLocaleDateString()}
                      </Text>
                    ) : null}
                  </TouchableOpacity>

                  {showStart ? (
                    <DateTimePickerModal
                      isVisible={showStart}
                      date={startDate ? new Date(startDate) : new Date()}
                      mode="date"
                      onConfirm={this.onChangeDate}
                      onCancel={this.hideDatePicker}
                    />
                  ) : null}
                </View>
              </View>

              <View>
                <Text
                  style={dateTimeText}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  <Translation label={'texts.to'} />
                </Text>

                <View style={datePickerContainer}>
                  <TouchableOpacity
                    style={floatingButton}
                    onPress={() => this.show('showEnd')}>
                    <Calendar
                      IconWidth={IconsSizes.normal}
                      IconHeight={IconsSizes.normal}
                      IconColor={PRIMARY_BACKGROUND_COLOR_LIGHT}
                    />
                    {endDate ? (
                      <Text style={dateTextStyle}>
                        {new Date(endDate).toLocaleDateString()}
                      </Text>
                    ) : null}
                  </TouchableOpacity>

                  {showEnd ? (
                    <DateTimePickerModal
                      minimumDate={startDate ? new Date(startDate) : new Date()}
                      isVisible={showEnd}
                      date={endDate ? new Date(endDate) : new Date()}
                      mode="date"
                      onConfirm={this.onChangeEndDate}
                      onCancel={this.hideDatePicker}
                    />
                  ) : null}
                </View>
              </View>
            </View>
          </View>

          <View style={footerContainer}>
            <Button
              title={'applyFilter'}
              size={'normal'}
              type={'app'}
              radius={'radius5'}
              onPress={this.handleFilter}
            />
            <Button
              title={'resetFilter'}
              size={'normal'}
              type={'outLine'}
              radius={'radius5'}
              onPress={this.resetFilter}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    eventTypes: store.eventList.eventTypes,
    filtersData: store.filtersData,
    theme: store.themes.theme,
  };
};

export default connect(mapStateToProps, {makeAction})(Filters);
