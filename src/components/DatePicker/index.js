import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Translation from '../../Translation';
import {IconsStyles} from '../../assets/styles';
import {styles} from './styles';
import {Cancel} from '../Icons';
import {makeAction} from '../../makeAction';
import {connect} from 'react-redux';

class DatePicker extends Component {
  state = {
    mode: 'date',
    show: false,
  };

  setNewDate = (event, date) => {
    this.setState({show: false});
    this.props.setDate(date);
  };

  show = () => {
    this.setState({show: true});
  };

  render() {
    const {title, date, theme} = this.props;
    const {PRIMARY_FOREGROUND_COLOR} = theme.color;
    const {
      pickerContainer,
      contentContainer,
      titleStyle,
      dateTextStyle,
      cancelEndDateIconContainer,
    } = styles(theme);
    const {show} = this.state;
    return (
      <View>
        <Text style={titleStyle}>
          <Translation label={`buttons.${title}`} />
        </Text>
        <View style={contentContainer}>
          <TouchableOpacity style={pickerContainer} onPress={this.show}>
            <Text style={dateTextStyle}>
              {date
                ? date.getDate() < 10
                  ? `0${date.getDate()}`
                  : date.getDate()
                : 'dd'}
            </Text>
            <Text style={dateTextStyle}>
              {date
                ? date.getMonth() < 10
                  ? `0${date.getMonth()}`
                  : date.getMonth()
                : 'mm'}
            </Text>
            <Text style={dateTextStyle}>
              {date ? date.getFullYear() : 'yyyy'}
            </Text>
          </TouchableOpacity>
          {show ? (
            <DateTimePicker
              minimumDate={
                this.props.minimumDate ? this.props.minimumDate : null
              }
              value={this.props.date ? this.props.date : new Date()}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={this.setNewDate}
            />
          ) : null}
          {date ? (
            <TouchableOpacity
              style={cancelEndDateIconContainer}
              onPress={this.props.cancelPress}>
              <Cancel
                iconHeight={IconsStyles.small}
                iconWidth={IconsStyles.small}
                iconColor={PRIMARY_FOREGROUND_COLOR}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
  };
};
export default connect(mapStateToProps, {makeAction})(DatePicker);
