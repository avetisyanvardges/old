import React, {Component} from 'react';
import {View, Text} from 'react-native';
import i18n from '../../assets/i18next';
import {Sizes} from '../../assets/styles';
import {UserComp} from '../UserComp';
import {styles} from './style';
import {FlatList} from 'react-native-gesture-handler';
import {makeAction} from '../../makeAction';
import {connect} from 'react-redux';
import {GET_BLOCKED_USERS, UNBLOCK_USER} from '../../actionsTypes';

class BlockedAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.makeAction(GET_BLOCKED_USERS);
  }
  unBlockUser = (blockedId) => {
    const data = {
      callBack: (res) => {
        this.props.makeAction(GET_BLOCKED_USERS);
      },
      error: () => {},
      blockedId,
    };
    this.props.makeAction(UNBLOCK_USER, data);
  };
  render() {
    const {blockedUsers} = this.props;
    const renderItem = ({item}) => {
      return (
        <UserComp
          unBlockUser={(id) => {
            this.unBlockUser(id);
          }}
          data={item}
          name={item.name}
        />
      );
    };
    return (
      <View style={{flex: 1}}>
        {blockedUsers?.length ? (
          <FlatList data={blockedUsers} renderItem={renderItem} />
        ) : (
          <Text
            style={{
              fontSize: Sizes.size14,
              color: '#2C2C2C',
              marginBottom: Sizes.size6,
              marginTop: Sizes.size38,
            }}>
            {i18n.t('texts.notBlockedUsers')}
          </Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    screenData: store.profileData,
    theme: store.themes.theme,
    blockedUsers: store.profileData.blockedUsers,
  };
};

export default connect(mapStateToProps, {makeAction})(BlockedAccount);
