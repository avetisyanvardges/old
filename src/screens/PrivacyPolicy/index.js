import React, {Component} from 'react';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {SafeAreaView, View, FlatList} from 'react-native';
import {ScreenHeader} from '../../components/ScreenHeader';
import {styles} from './styles';
import {MenuLink} from '../../components';
import {MenuSwitch} from '../../components/MenuSwitch';
import {Colors} from '../../assets/styles';
import {withNavigationFocus} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import {GET_PRIVACY_REQUEST, SET_UPDATE_REQUEST} from '../../actionsTypes';
class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      privacy: {},
    };
  }
  componentDidMount() {
    this.getPrivacyData();
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.setPrivacyPolicy();
    }
  }
  getPrivacyData = () => {
    const data = {
      callBack: (res) => {
        const {
          closedAccount,
          comments,
          inviteYouEvents,
          sendYouMessages,
          mentioned,
          networkStatus,
          findContacts,
        } = res.data.list;
        // Здесь для того чтобы появилилсь Упомниание нужно в mutationsData добавить mentioned
        const mutationsData = {
          closedAccount,
          comments,
          inviteYouEvents,
          sendYouMessages,
          networkStatus,
          findContacts,
          blockedAccount: '',
        };
        this.setState({privacy: mutationsData});
        AsyncStorage.setItem('@privacy', JSON.stringify(mutationsData));
      },
      error: () => {},
    };
    this.props.makeAction(GET_PRIVACY_REQUEST, data);
  };
  setPrivacyPolicy = async () => {
    const data = await AsyncStorage.getItem('@privacy');
    const jsonParseData = JSON.parse(data);
    const ListData = {
      callBack: () => {
        this.setState({privacy: jsonParseData});
      },
      list: {...jsonParseData, mentioned: 'all'},
    };
    this.props.makeAction(SET_UPDATE_REQUEST, ListData);
  };
  handleSwich = (value) => {
    return value === 'on';
  };
  render() {
    const {navigation, theme} = this.props;
    const {container, underLine} = styles(theme);
    const {privacy} = this.state;
    const flatListData = Object.keys(privacy)?.filter(
      (e) =>
        e !== 'comments' &&
        e !== 'inviteYouEvents' &&
        e !== 'findContacts' &&
        e !== 'networkStatus',
    );
    const SaveState = (event, item) => {
      let switchHandler = event ? 'on' : 'off';
      privacy[item] = switchHandler;
      this.setState({value: switchHandler});
      AsyncStorage.setItem('@privacy', JSON.stringify(privacy));
      this.setPrivacyPolicy();
    };
    const renderItem = ({item}) => {
      if (item === 'closedAccount') {
        return (
          <View>
            <MenuSwitch
              title={`switch.${item}`}
              falseColor={Colors.silver}
              trueColor={Colors.blueViolet}
              thumbColor={Colors.white}
              value={this.handleSwich(privacy[item])}
              onValueChange={(res) => {
                SaveState(res, item);
              }}
            />
            <View style={underLine} />
          </View>
        );
      } else {
        return (
          <MenuLink
            showCircle={false}
            title={`privacy.${item}.title`}
            linkState={privacy[item] ? `privacy.${item}.${privacy[item]}` : ''}
            navigate={'PrivacyDetail'}
            query={{info: item}}
          />
        );
      }
    };
    return (
      <SafeAreaView
        style={{flex: 1, backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR}}>
        <ScreenHeader
          title={'privacyPolicy'}
          leftIcon={'back'}
          leftIconPress={() => {
            navigation.goBack();
          }}
        />
        <View style={container}>
          {privacy ? (
            <FlatList data={flatListData} renderItem={renderItem} />
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
    privacy: store.privacy.list,
  };
};
export default connect(mapStateToProps, {makeAction})(
  withNavigationFocus(PrivacyPolicy),
);
