import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {SafeAreaView, View, FlatList, Text} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './style';
import {MenuLink} from '../../components';
import {MenuSwitch} from '../../components/MenuSwitch';
import {withNavigationFocus} from 'react-navigation';
import {Colors} from '../../assets/styles';
import i18n from '../../assets/i18next';
import {GET_DEVICEINFO_LIST} from '../../actionsTypes';
import AsyncStorage from '@react-native-community/async-storage';

class Security extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: true,
      saveUsernamePass: '',
      security: {
        securityAlert: '',
        yourDevice: '',
        // twoStep: '',
      },
    };
  }

  componentDidMount() {
    // this.getTwoStepLinkstate();
    const data = {
      callBack: (res) => {
        AsyncStorage.setItem(
          '@yourDevice',
          JSON.stringify(res.data.loginHistory),
        );
      },
      error: (err) => {
        console.log(err.response);
      },
    };
    this.props.makeAction(GET_DEVICEINFO_LIST, data);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      // this.getTwoStepLinkstate();
      if (this.state.value) {
        this.setState({saveUsernamePass: 'on'});
      } else {
        this.setState({saveUsernamePass: 'off'});
      }
    }
  }
  getTwoStepLinkstate = async () => {
    const data = await AsyncStorage.getItem('@twoStep');
    const parse = JSON.parse(data);
    this.setState({security: {...this.state.security, twoStep: parse}});
  };
  render() {
    const {navigation, theme} = this.props;
    const {container, descriptionText} = styles(theme);
    const {security} = this.state;

    const renderItem = ({item}) => {
      return (
        <View>
          <MenuLink
            showCircle={false}
            title={`headerTitle.${item}`}
            linkState={item === 'twoStep' ? security[item] : ''}
            navigate={'SecurityDetail'}
            query={{info: item}}
          />
          {item === 'twoStep' ? (
            <Text style={descriptionText}>
              {i18n.t('security.twoStep.desc')}
            </Text>
          ) : null}
        </View>
      );
    };

    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR}}>
        <ScreenHeader
          title={'security'}
          leftIcon={'back'}
          leftIconPress={() => {
            navigation.goBack();
          }}
        />
        <View style={container}>
          {security ? (
            <FlatList
              data={Object.keys(security)}
              renderItem={renderItem}
              // ListFooterComponent={
              //   <MenuSwitch
              //     title={`switch.saveUsernamePass`}
              //     falseColor={Colors.silver}
              //     trueColor={Colors.blueViolet}
              //     thumbColor={Colors.white}
              //     value={this.state.value}
              //     onValueChange={(res) => this.setState({ value: res })}
              //   />}
              //   ListFooterComponentStyle={{marginTop:25}}
            />
          ) : null}
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
export default connect(mapStateToProps, {makeAction})(
  withNavigationFocus(Security),
);
