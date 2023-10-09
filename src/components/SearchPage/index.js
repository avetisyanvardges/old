import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import {ArrowLeft} from '../Icons';
import {IconsStyles, Sizes} from '../../assets/styles';
import {connect} from 'react-redux';
import {makeAction} from '../../makeAction';
import {SearchInput} from '../searchInput';
import {FoundUser} from '../FoundUser';
import {
  ACTIVE_CHAT_USER_ID,
  CONTENT_MESSAGE,
  GET_CHAT_BY_USER_ID,
  SEARCH_USER,
  SET_ACTIVE_CHAT_ID,
  SET_USER_DATA,
} from '../../actionsTypes';
import {deviceInfo} from '../../assets/deviceInfo';
import GestureRecognizer from 'react-native-swipe-gestures';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInputText: '',
      userList: [],
    };
  }

  navigateToChatScreen = (userId, item) => {
    const {name, picture, rating, verificationDetails, _id} = item;
    const mutationData = {name, picture, rating, verificationDetails, _id};
    const data = {
      callBack: (res) => {
        this.props.makeAction(SET_ACTIVE_CHAT_ID, res.data.chatId);
        this.props.makeAction(ACTIVE_CHAT_USER_ID, userId);
        this.props.makeAction(SET_USER_DATA, mutationData);
        let data = {
          chatId: res.data.chatId,
          callBack: () => {},
        };
        this.props.makeAction(CONTENT_MESSAGE, data);
        this.props.navigation.navigate('ChatScreen');
      },
      error: () => {},
      userId,
    };
    this.props.makeAction(GET_CHAT_BY_USER_ID, data);
  };

  handelChange = (text, keyName) => {
    this.state[keyName] = text;
    if (this.debounce) {
      clearTimeout(this.debounce);
    }
    this.debounce = setTimeout(() => {
      const data = {
        callBack: (response) => {
          this.setState({
            userList: response.data.list,
          });
        },
        error: (error) => {},
        query: this.state.searchInputText,
      };
      this.props.makeAction(SEARCH_USER, data);
    }, 500);
  };

  _renderItem = ({item}) => {
    return (
      <FoundUser
        onPress={() => {
          this.navigateToChatScreen(item._id, item);
          this.props.close();
        }}
        closeModal={this.props.close}
        user={item}
      />
    );
  };

  _headerComponent = () => {
    const {theme} = this.props;
    const {searchInputText} = this.state;
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            this.props.close();
          }}
          style={{paddingTop: 23, paddingBottom: 18}}>
          <ArrowLeft
            IconWidth={IconsStyles.medium}
            IconHeight={IconsStyles.medium}
            IconColor={theme?.color?.PRIMARY_COLOR_LIGHT}
          />
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme?.PRIMARY_BACKGROUND_COLOR,
          }}>
          <View style={{flex: 1}}>
            <SearchInput
              resetInput={() => {
                this.setState({searchInputText: ''});
              }}
              handelChange={(text) => {
                this.handelChange(text, 'searchInputText');
              }}
              value={searchInputText}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            borderBottomColor: '#E3E3E3',
            borderBottomWidth: 0.5,
            marginVertical: Sizes.size20,
          }}
        />
      </>
    );
  };

  render() {
    const {userList} = this.state;
    return (
      <KeyboardAvoidingView
        behavior={deviceInfo.ios ? 'padding' : null}
        style={{flex: 1}}>
        <View style={{flex: 1, paddingHorizontal: Sizes.size16}}>
          <FlatList
            data={userList}
            ListHeaderComponent={this._headerComponent}
            renderItem={this._renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item?._id?.toString()}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    theme: store.themes.theme,
  };
};

export default connect(mapStateToProps, {makeAction})(SearchPage);
