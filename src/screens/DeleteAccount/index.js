import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './styles';
import {LineGradientButton} from '../../components';
import moment from 'moment';
import {Cancel, CheckConfirm, CheckedIcon} from '../../components/Icons';
import {Sizes} from '../../assets/styles';
import {deviceInfo} from '../../assets/deviceInfo';
import {DELETE_ACCOUNT} from '../../actionsTypes';
import i18n from '../../assets/i18next';

class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: '02:00',
      email: '',
      scrollX: new Animated.Value(-deviceInfo.deviceWidth),
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  onChangeText = (text, keyName) => {
    this.setState({[keyName]: text});
  };

  startTimer = () => {
    let countDownDate = moment().add(120, 'seconds');
    this.timer = setInterval(() => {
      let diff = countDownDate.diff(moment());
      if (diff <= 0) {
        clearInterval(this.timer);
      } else {
        this.setState({timer: moment.utc(diff).format('mm:ss')});
      }
    }, 1000);
  };

  confirmDelete = () => {
    const {scrollX} = this.state;
    Animated.timing(scrollX, {
      toValue: -deviceInfo.deviceWidth,
      duration: 300,
    }).start();
    this.props.makeAction(DELETE_ACCOUNT, {
      userId: this.props.screenData.profile._id,
    });
  };
  cancelDelete = () => {
    const {scrollX} = this.state;
    Animated.timing(scrollX, {
      toValue: -deviceInfo.deviceWidth,
      duration: 300,
    }).start();
  };
  render() {
    const {navigation, count, theme} = this.props;
    const {
      container,
      underLine,
      topTitle,
      mb_28,
      circle,
      row,
      mb_11,
      confirmContainer,
      horizontalLine,
      confirmButton,
      confirmButtonText,
    } = styles(theme);
    const {scrollX} = this.state;
    return (
      <ScrollView>
        <View style={{flex: 1}}>
          <ScreenHeader
            title={'deleteAccount'}
            leftIcon={'back'}
            leftIconPress={() => {
              navigation.goBack();
            }}
          />
          <View style={container}>
            <Text style={[topTitle, {paddingVertical: Sizes.size20}]}>
              {i18n.t('links.deleteAccount.delete_your_account')}
            </Text>

            <Text style={[topTitle, mb_28]}>
              {i18n.t('links.deleteAccount.if_you_decide')}
            </Text>

            <View style={[row, mb_11]}>
              <View style={circle} />
              <Text style={[topTitle]}>
                {i18n.t('links.deleteAccount.longer')}
              </Text>
            </View>

            <View style={[row, mb_11]}>
              <View style={circle} />
              <Text style={[topTitle]}>
                {i18n.t('links.deleteAccount.lose_access')}
              </Text>
            </View>

            <View style={[row, mb_11]}>
              <View style={circle} />
              <Text style={[topTitle]}>
                {i18n.t('links.deleteAccount.refund_for_completed')}
              </Text>
            </View>

            <View style={[row, mb_11]}>
              <View style={circle} />
              <Text style={[topTitle]}>
                {i18n.t('links.deleteAccount.information')}
              </Text>
            </View>

            <View style={[row, mb_11]}>
              <View style={circle} />
              <Text style={[topTitle]}>
                {i18n.t('links.deleteAccount.deactivated')}
              </Text>
            </View>

            <View style={[row, mb_11]}>
              <View style={circle} />
              <Text style={[topTitle]}>
                {i18n.t('links.deleteAccount.during_deactivation')}
              </Text>
            </View>

            <View style={[row, mb_11]}>
              <View style={circle} />
              <Text style={[topTitle]}>
                {i18n.t('links.deleteAccount.after')}
              </Text>
            </View>

            <View style={underLine} />

            <LineGradientButton
              title={i18n.t('buttons.confirm')}
              onPress={() => {
                Animated.timing(scrollX, {
                  toValue: 0,
                  duration: 300,
                }).start();
              }}
            />
            <View>
              <Animated.View style={[confirmContainer, {right: scrollX}]}>
                <TouchableOpacity
                  onPress={this.confirmDelete}
                  style={confirmButton}>
                  <Text style={confirmButtonText}>{i18n.t('buttons.yes')}</Text>
                  <CheckConfirm
                    IconWidth={Sizes.size13}
                    IconHeight={Sizes.size13}
                    IconColor={'#A347FF'}
                  />
                </TouchableOpacity>

                <View style={horizontalLine} />

                <TouchableOpacity
                  onPress={this.cancelDelete}
                  style={confirmButton}>
                  <Text style={confirmButtonText}>{i18n.t('buttons.no')}</Text>
                  <Cancel
                    iconHeight={Sizes.size13}
                    iconWidth={Sizes.size13}
                    iconColor={'#F3267D'}
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </View>
      </ScrollView>
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
export default connect(mapStateToProps, {makeAction})(DeleteAccount);
