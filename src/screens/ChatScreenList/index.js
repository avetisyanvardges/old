import React, {Component} from 'react';
import {View, StatusBar, RefreshControl} from 'react-native';
import {styles} from './styles';
import {makeAction} from '../../makeAction';
import {connect} from 'react-redux';
import ScreenFooter from '../../components/ScreenFooter';
import {Sizes} from '../../assets/styles';
import {
  GET_MESSAGE_LIST,
  LOADER_VISIBLE,
  GET_NOTIFICATIONS_REQUEST,
} from '../../actionsTypes';
import {ChatSearchButton, ChatScreenListContent} from '../../components';
import RBSheet from 'react-native-raw-bottom-sheet';
import SearchPage from '../../components/SearchPage';
import Tabs from '../Tabs';
import {deviceInfo} from '../../assets/deviceInfo';
import {withNavigationFocus} from 'react-navigation';

class ChatScreenList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      refreshing: false,
    };
  }

  componentDidMount() {
    const {profile} = this.props;
    this.props.makeAction(LOADER_VISIBLE, true);
    this.props.makeAction(GET_MESSAGE_LIST);
    if (profile._id) {
      this.props.makeAction(GET_NOTIFICATIONS_REQUEST);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      this.props.makeAction(LOADER_VISIBLE, true);
      this.props.makeAction(GET_MESSAGE_LIST);
    }
  }

  refreshing = async () => {
    const {refreshing} = this.state;
    if (!refreshing) {
      this.setState({refreshing: true});
    }
    this.props.makeAction(LOADER_VISIBLE, true);
    this.props.makeAction(GET_MESSAGE_LIST);
    this.setState({refreshing: false});
  };

  render() {
    const {navigation, theme, getChatList} = this.props;
    const {container} = styles(theme);
    const {refreshing} = this.state;
    const {PRIMARY_BACKGROUND_COLOR} = theme;
    const STATUS_BAR = StatusBar.statusBarHeight || Sizes.size24;
    let chatList = getChatList?.length
      ? getChatList.map((elem, index) => {
          return {...elem, key: elem.chatId};
        })
      : [];
    const _headerComponent = () => {
      return (
        <>
          <Tabs navigation={navigation} active={'chatList'} />
          <ChatSearchButton
            press={() => {
              this.RBSheet.open();
            }}
          />
        </>
      );
    };
    return (
      <>
        <View style={[container, {paddingBottom: Sizes.size55}]}>
          <ChatScreenListContent
            makeAction={this.props.makeAction}
            navigation={navigation}
            listData={chatList}
            refresh={this.refreshing}
            headerComponent={_headerComponent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this.refreshing}
                tintColor={'#A347FF'}
              />
            }
          />
        </View>
        <ScreenFooter navigation={navigation} active={'chat'} />
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={deviceInfo.deviceHeight}
          openDuration={250}
          customStyles={{
            container: {
              backgroundColor: PRIMARY_BACKGROUND_COLOR,
              marginTop: STATUS_BAR,
              paddingBottom: STATUS_BAR,
              borderTopLeftRadius: Sizes.size20,
              borderTopRightRadius: Sizes.size20,
            },
          }}>
          <SearchPage
            close={() => {
              this.RBSheet.close();
            }}
            navigation={navigation}
          />
        </RBSheet>
      </>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    theme: store.themes.theme,
    profile: store.profileData.profile,
    getChatList: store.Chat.chatList,
    Loader: store.loader,
  };
};

export default connect(mapStateToProps, {makeAction})(
  withNavigationFocus(ChatScreenList),
);
